(function(){
    // Memory Diagnostics Tool
    // Usage: include this script in your page (near end of <body>) or paste its contents in DevTools console.
    // It instruments setInterval/setTimeout/requestAnimationFrame, add/removeEventListener,
    // document.createElement and node removals to collect statistics and shows an overlay.

    if (window.__MEM_DIAG_STARTED) {
        console.warn('Memory diagnostics already started.');
        return;
    }
    window.__MEM_DIAG_STARTED = true;

    const DIAG = {
        intervals: new Map(), // id -> info
        timeouts: new Map(),
        rAFs: new Map(),
        createdElements: 0,
        removedElements: 0,
        createdByTag: Object.create(null),
        listenerAdds: 0,
        listenerRemoves: 0,
        listenerEstimate: 0, // approximate adds - removes
        lastReport: 0,
        samples: [],
        maxStackSample: 25,
        startedAt: Date.now(),
    }

    // Try to load previous snapshot saved before last unload (to detect memory persisting across reloads)
    let PREV_SNAP = null;
    try {
        const raw = localStorage.getItem('__memDiag_prev');
        if (raw) PREV_SNAP = JSON.parse(raw);
    } catch (e) { PREV_SNAP = null }

    // Helpers
    function now() { return Date.now(); }

    // Patch timers
    const _setInterval = window.setInterval;
    const _clearInterval = window.clearInterval;
    window.setInterval = function(fn, ms, ...args) {
        const id = _setInterval(fn, ms, ...args);
        try { DIAG.intervals.set(id, {created: now(), ms, stack: (new Error()).stack}); } catch(e){}
        return id;
    }
    window.clearInterval = function(id) {
        try { DIAG.intervals.delete(id); } catch(e){}
        return _clearInterval(id);
    }

    const _setTimeout = window.setTimeout;
    const _clearTimeout = window.clearTimeout;
    window.setTimeout = function(fn, ms, ...args) {
        const id = _setTimeout(fn, ms, ...args);
        try { DIAG.timeouts.set(id, {created: now(), ms, stack: (new Error()).stack}); } catch(e){}
        return id;
    }
    window.clearTimeout = function(id) {
        try { DIAG.timeouts.delete(id); } catch(e){}
        return _clearTimeout(id);
    }

    const _rAF = window.requestAnimationFrame;
    const _cAF = window.cancelAnimationFrame;
    if (_rAF) {
        window.requestAnimationFrame = function(cb) {
            const wrap = function(ts){ try { DIAG.rAFs.delete(handle); } catch(e){}; return cb(ts); };
            const handle = _rAF(wrap);
            try { DIAG.rAFs.set(handle, {created: now(), stack: (new Error()).stack}); } catch(e){}
            return handle;
        }
    }
    if (_cAF) {
        window.cancelAnimationFrame = function(id) { try { DIAG.rAFs.delete(id); } catch(e){}; return _cAF(id); }
    }

    // Patch EventTarget.addEventListener/removeEventListener to approximate listeners
    const ET = EventTarget.prototype;
    const _addEv = ET.addEventListener;
    const _remEv = ET.removeEventListener;
    ET.addEventListener = function(type, listener, options) {
        try { DIAG.listenerAdds++; DIAG.listenerEstimate++; } catch(e){}
        return _addEv.call(this, type, listener, options);
    }
    ET.removeEventListener = function(type, listener, options) {
        try { DIAG.listenerRemoves++; DIAG.listenerEstimate = Math.max(0, DIAG.listenerEstimate-1); } catch(e){}
        return _remEv.call(this, type, listener, options);
    }

    // Patch createElement and removals
    const _createElement = Document.prototype.createElement;
    Document.prototype.createElement = function(tagName, options) {
        const el = _createElement.call(this, tagName, options);
        try {
            DIAG.createdElements++;
            const t = (tagName || 'unknown').toUpperCase();
            DIAG.createdByTag[t] = (DIAG.createdByTag[t] || 0) + 1;
            // optional small marker to help identify (non-invasive)
            try { el.__memDiagCreated = true; } catch(e){}
        } catch (e) {}
        return el;
    }

    // Patch removals
    const _removeChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function(child) {
        try { DIAG.removedElements++; } catch(e){}
        return _removeChild.call(this, child);
    }
    if (Element.prototype.remove) {
        const _elRemove = Element.prototype.remove;
        Element.prototype.remove = function() {
            try { DIAG.removedElements++; } catch(e){}
            return _elRemove.call(this);
        }
    }

    // Build overlay
    const overlay = document.createElement('div');
    overlay.id = '__mem_diag_overlay';
    overlay.style.position = 'fixed';
    overlay.style.right = '8px';
    overlay.style.top = '8px';
    overlay.style.zIndex = 999999;
    overlay.style.background = 'rgba(0,0,0,0.85)';
    overlay.style.color = '#bfe';
    overlay.style.fontSize = '12px';
    overlay.style.fontFamily = 'monospace';
    overlay.style.maxWidth = '420px';
    overlay.style.padding = '8px';
    overlay.style.borderRadius = '6px';
    overlay.style.boxShadow = '0 2px 10px rgba(0,0,0,0.6)';
    overlay.style.pointerEvents = 'auto';

    overlay.innerHTML = `
        <div style="display:flex;gap:6px;align-items:center;">
            <strong style="color:#9ff">Memory Diagnostics</strong>
            <button id="__memDiag_toggle" style="margin-left:auto">Stop</button>
        </div>
        <pre id="__memDiag_text" style="white-space:pre-wrap;max-height:360px;overflow:auto;margin:6px 0 0 0;padding:0"></pre>
        <div style="display:flex;gap:6px;margin-top:6px;">
            <button id="__memDiag_export">Export JSON</button>
            <button id="__memDiag_forceGC">Force GC (if enabled)</button>
        </div>
    `;
    document.body.appendChild(overlay);

    const textEl = document.getElementById('__memDiag_text');
    const toggleBtn = document.getElementById('__memDiag_toggle');
    const exportBtn = document.getElementById('__memDiag_export');
    const gcBtn = document.getElementById('__memDiag_forceGC');

    toggleBtn.addEventListener('click', () => { stop(); overlay.remove(); });

    exportBtn.addEventListener('click', () => {
        try {
            const snap = snapshot();
            const data = JSON.stringify(snap, null, 2);
            // copy to clipboard if available
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(data).then(()=> alert('Diagnostics copied to clipboard')); 
            } else {
                // fallback: open in new tab
                const w = window.open('', '_blank');
                if (w) { w.document.write('<pre>' + escapeHtml(data) + '</pre>'); }
            }
        } catch(e){ console.error(e); }
    });

    gcBtn.addEventListener('click', () => {
        if (window.gc) { window.gc(); alert('window.gc() called'); }
        else alert('window.gc() not available. Enable "Collect garbage" in DevTools or run Chrome with --js-flags="--expose-gc"');
    });

    function escapeHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    function getHeap() {
        const mem = performance && performance.memory ? performance.memory : null;
        if (!mem) return null;
        return {
            jsHeapSizeLimit: mem.jsHeapSizeLimit,
            totalJSHeapSize: mem.totalJSHeapSize,
            usedJSHeapSize: mem.usedJSHeapSize
        }
    }

    function snapshot() {
        const intervals = Array.from(DIAG.intervals.entries()).slice(0, DIAG.maxStackSample).map(([id, info])=> ({id, created: info.created, ms: info.ms, stack: info.stack}));
        const timeouts = Array.from(DIAG.timeouts.entries()).slice(0, DIAG.maxStackSample).map(([id, info])=> ({id, created: info.created, ms: info.ms, stack: info.stack}));
        const rAFs = Array.from(DIAG.rAFs.entries()).slice(0, DIAG.maxStackSample).map(([id, info])=> ({id, created: info.created, stack: info.stack}));
        const heap = getHeap();
        const domNodes = document.getElementsByTagName('*').length;
        return {
            timestamp: now(),
            uptime_ms: now() - DIAG.startedAt,
            heap,
            domNodes,
            createdElements: DIAG.createdElements,
            removedElements: DIAG.removedElements,
            createdByTag: DIAG.createdByTag,
            intervalsCount: DIAG.intervals.size,
            timeoutsCount: DIAG.timeouts.size,
            rAFsCount: DIAG.rAFs.size,
            listenerAdds: DIAG.listenerAdds,
            listenerRemoves: DIAG.listenerRemoves,
            listenerEstimate: DIAG.listenerEstimate,
            recentIntervals: intervals,
            recentTimeouts: timeouts,
            recentRAFs: rAFs
        }
    }

    function formatBytes(n) {
        if (!n && n !== 0) return 'n/a';
        const units = ['B','KB','MB','GB'];
        let i = 0;
        let val = n;
        while (val >= 1024 && i < units.length-1) { val/=1024; i++; }
        return val.toFixed(2) + ' ' + units[i];
    }

    function updateOverlay() {
        const snap = snapshot();
        let s = '';
        s += 'Time running: ' + Math.round(snap.uptime_ms/1000) + 's\n';
        const heap = snap.heap;
        if (heap) {
            s += 'Heap used: ' + formatBytes(heap.usedJSHeapSize) + '\n';
            s += 'Heap total: ' + formatBytes(heap.totalJSHeapSize) + '\n';
        } else {
            s += 'Heap: performance.memory not available (use Chrome).\n';
        }
        s += 'DOM nodes: ' + snap.domNodes + '\n';
        s += 'Created elements (createElement): ' + snap.createdElements + '\n';
        s += 'Removed elements (remove): ' + snap.removedElements + '\n';
        s += 'Active intervals: ' + snap.intervalsCount + '\n';
        s += 'Active timeouts: ' + snap.timeoutsCount + '\n';
        s += 'Active rAFs: ' + snap.rAFsCount + '\n';
        s += 'Listener adds: ' + snap.listenerAdds + ' removes: ' + snap.listenerRemoves + ' estimate cur: ' + snap.listenerEstimate + '\n';
        s += '\nTop recent intervals (up to ' + DIAG.maxStackSample + '):\n';
        snap.recentIntervals.forEach(it => { s += ' id:' + it.id + ' age:' + Math.round((now()-it.created)/1000) + 's\n'; });
        s += '\nTop recent timeouts (up to ' + DIAG.maxStackSample + '):\n';
        snap.recentTimeouts.forEach(it => { s += ' id:' + it.id + ' age:' + Math.round((now()-it.created)/1000) + 's\n'; });
        s += '\nCreated elements by tag (top 12):\n';
        const tags = Object.keys(DIAG.createdByTag).sort((a,b)=>DIAG.createdByTag[b]-DIAG.createdByTag[a]).slice(0,12);
        tags.forEach(t => s += ' ' + t + ': ' + DIAG.createdByTag[t] + '\n');

        // If we have a previous snapshot from before a reload, show a small comparison
        if (PREV_SNAP) {
            s += '\n--- Previous snapshot (from last unload) ---\n';
            if (PREV_SNAP.heap) {
                const prevUsed = PREV_SNAP.heap.usedJSHeapSize || 0;
                const prevTotal = PREV_SNAP.heap.totalJSHeapSize || 0;
                const curUsed = (snap.heap && snap.heap.usedJSHeapSize) || 0;
                const curTotal = (snap.heap && snap.heap.totalJSHeapSize) || 0;
                const diffUsed = curUsed - prevUsed;
                const diffTotal = curTotal - prevTotal;
                s += 'Prev heap used: ' + formatBytes(prevUsed) + '  (Δ ' + (diffUsed>=0?'+':'') + formatBytes(diffUsed) + ')\n';
                s += 'Prev heap total: ' + formatBytes(prevTotal) + '  (Δ ' + (diffTotal>=0?'+':'') + formatBytes(diffTotal) + ')\n';
            }
            s += 'Prev DOM nodes: ' + (PREV_SNAP.domNodes||0) + '  (Δ ' + (snap.domNodes - (PREV_SNAP.domNodes||0)) + ')\n';
            s += 'Prev createdElements: ' + (PREV_SNAP.createdElements||0) + '  (Δ ' + (snap.createdElements - (PREV_SNAP.createdElements||0)) + ')\n';
            s += 'Prev removedElements: ' + (PREV_SNAP.removedElements||0) + '  (Δ ' + (snap.removedElements - (PREV_SNAP.removedElements||0)) + ')\n';
            s += 'Prev active intervals: ' + (PREV_SNAP.intervalsCount||0) + '  (Δ ' + (snap.intervalsCount - (PREV_SNAP.intervalsCount||0)) + ')\n';
            s += 'Prev active timeouts: ' + (PREV_SNAP.timeoutsCount||0) + '  (Δ ' + (snap.timeoutsCount - (PREV_SNAP.timeoutsCount||0)) + ')\n';
            s += 'Prev listenerEstimate: ' + (PREV_SNAP.listenerEstimate||0) + '  (Δ ' + (snap.listenerEstimate - (PREV_SNAP.listenerEstimate||0)) + ')\n';
        }

        textEl.textContent = s;
    }

    // periodic sampling for console history
    const intervalId = setInterval(()=>{
        DIAG.samples.push({t: now(), heap: getHeap(), dom: document.getElementsByTagName('*').length, intervals: DIAG.intervals.size, timeouts: DIAG.timeouts.size, rAFs: DIAG.rAFs.size});
        if (DIAG.samples.length > 600) DIAG.samples.shift(); // keep last 600 samples
    }, 1000);

    const overlayUpdater = setInterval(()=>{ try { updateOverlay(); } catch(e){} }, 1000);

    function stop(){
        try { clearInterval(intervalId); clearInterval(overlayUpdater); } catch(e){}
        // do not restore patched functions — dev-only tool
        console.info('Memory diagnostics stopped (overlay removed).');
    }

    // Save a snapshot before the page unloads so we can compare after reload
    try {
        window.addEventListener('beforeunload', () => {
            try { localStorage.setItem('__memDiag_prev', JSON.stringify(snapshot())); } catch(e){}
        });
    } catch(e) {}

    // expose for console
    window.__memDiag = {
        diag: DIAG,
        snapshot,
        stop(){ stop(); },
        samples(){ return DIAG.samples.slice(); },
        stats(){ return snapshot(); }
    };

    console.info('Memory diagnostics started. Use `__memDiag.stats()` and `__memDiag.samples()` to inspect.');
})();
