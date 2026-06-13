/* ============================================================
   site-enhance.js — 阅读进度条 + 代码块一键复制 + 站内搜索
   全站 11 页共用；自包含（自行注入 CSS）。
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 注入样式 ---------- */
  var css =
    '.rp-bar{position:fixed;top:0;left:0;height:3px;width:0;z-index:200;' +
      'background:linear-gradient(90deg,#5b8def,#a78bfa 50%,#4fd1c5);box-shadow:0 0 8px rgba(91,141,239,.5);transition:width .1s ease-out;}' +
    'pre{position:relative;}' +
    '.copy-btn{position:absolute;top:8px;right:8px;z-index:5;cursor:pointer;font:inherit;font-size:12px;' +
      'padding:4px 10px;border-radius:7px;border:1px solid rgba(255,255,255,.18);background:rgba(20,27,45,.9);' +
      'color:#b9c4d4;opacity:0;transition:opacity .15s,color .15s,border-color .15s;font-family:Inter,"Noto Sans SC",sans-serif;}' +
    'pre:hover .copy-btn{opacity:1;}' +
    '.copy-btn:hover{color:#e6edf7;border-color:#5b8def;}' +
    '.copy-btn.done{color:#7be39a;border-color:#7be39a;}' +
    '.se-trigger{position:fixed;top:12px;right:16px;z-index:96;cursor:pointer;display:inline-flex;align-items:center;gap:8px;' +
      'font:inherit;font-size:13px;font-family:Inter,"Noto Sans SC",sans-serif;color:#b9c4d4;padding:8px 14px;border-radius:999px;' +
      'background:rgba(15,21,37,.82);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);' +
      'border:1px solid rgba(255,255,255,.14);box-shadow:0 4px 16px rgba(0,0,0,.3);transition:color .15s,border-color .15s;}' +
    '.se-trigger:hover{color:#e6edf7;border-color:#5b8def;}' +
    '.se-trigger kbd{font-family:"JetBrains Mono",monospace;font-size:11px;color:#5b6a82;border:1px solid rgba(255,255,255,.14);border-radius:5px;padding:1px 6px;}' +
    '@media(max-width:680px){.se-trigger kbd{display:none;}.se-trigger{padding:8px 11px;}}' +
    '.se-overlay{position:fixed;inset:0;z-index:300;display:none;align-items:flex-start;justify-content:center;' +
      'background:rgba(4,7,16,.62);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);padding:14vh 16px 16px;}' +
    '.se-overlay.open{display:flex;}' +
    '.se-panel{width:100%;max-width:640px;max-height:72vh;display:flex;flex-direction:column;overflow:hidden;' +
      'background:#0f1525;border:1px solid rgba(255,255,255,.12);border-radius:16px;box-shadow:0 30px 80px rgba(0,0,0,.55);' +
      'font-family:Inter,"Noto Sans SC",sans-serif;}' +
    '.se-input{width:100%;border:none;outline:none;background:transparent;color:#e6edf7;font:inherit;font-size:17px;' +
      'padding:18px 20px;border-bottom:1px solid rgba(255,255,255,.08);}' +
    '.se-input::placeholder{color:#5b6a82;}' +
    '.se-results{overflow-y:auto;padding:6px;}' +
    '.se-item{display:block;text-decoration:none;padding:9px 14px;border-radius:10px;cursor:pointer;}' +
    '.se-item .se-t{color:#e6edf7;font-size:14px;line-height:1.4;}' +
    '.se-item .se-d{color:#5b6a82;font-size:11.5px;font-family:"JetBrains Mono",monospace;margin-top:2px;}' +
    '.se-item.lvl3 .se-t,.se-item.lvl4 .se-t{color:#b9c4d4;font-size:13.5px;}' +
    '.se-item mark{background:rgba(255,209,102,.22);color:#ffd98a;border-radius:3px;padding:0 1px;}' +
    '.se-item.active,.se-item:hover{background:rgba(91,141,239,.14);}' +
    '.se-empty{padding:26px 20px;text-align:center;color:#5b6a82;font-size:14px;}' +
    '.se-foot{display:flex;gap:16px;padding:9px 16px;border-top:1px solid rgba(255,255,255,.07);color:#5b6a82;font-size:11.5px;}' +
    '.se-foot kbd{font-family:"JetBrains Mono",monospace;border:1px solid rgba(255,255,255,.14);border-radius:4px;padding:0 5px;}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- 1. 阅读进度条 ---------- */
  var bar = document.createElement('div'); bar.className = 'rp-bar'; document.body.appendChild(bar);
  function updBar() {
    var el = document.documentElement, max = el.scrollHeight - el.clientHeight;
    bar.style.width = (max > 0 ? (el.scrollTop / max) * 100 : 0) + '%';
  }
  addEventListener('scroll', updBar, { passive: true });
  addEventListener('resize', updBar); updBar();

  /* ---------- 2. 代码块一键复制 ---------- */
  function copyText(text, btn) {
    function ok() { btn.textContent = '已复制 ✓'; btn.classList.add('done'); setTimeout(function () { btn.textContent = '复制'; btn.classList.remove('done'); }, 1500); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok, fallback);
    } else { fallback(); }
    function fallback() {
      try { var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); ok(); }
      catch (e) { btn.textContent = '复制失败'; }
    }
  }
  document.querySelectorAll('pre').forEach(function (pre) {
    if (pre.querySelector('.copy-btn')) return;
    var btn = document.createElement('button'); btn.className = 'copy-btn'; btn.type = 'button'; btn.textContent = '复制';
    pre.appendChild(btn);
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var clone = pre.cloneNode(true); var b = clone.querySelector('.copy-btn'); if (b) b.remove();
      copyText(clone.textContent.replace(/\n+$/, '') + '\n', btn);
    });
  });

  /* ---------- 3. 站内搜索 ---------- */
  var trigger = document.createElement('button');
  trigger.className = 'se-trigger'; trigger.type = 'button'; trigger.setAttribute('aria-label', '站内搜索');
  trigger.innerHTML = '<span>🔍 搜索</span><kbd>⌘K</kbd>';
  document.body.appendChild(trigger);

  var overlay = document.createElement('div'); overlay.className = 'se-overlay';
  overlay.innerHTML =
    '<div class="se-panel" role="dialog" aria-label="站内搜索">' +
      '<input class="se-input" type="text" placeholder="搜索 10 篇文档的标题与小节…" autocomplete="off" spellcheck="false" />' +
      '<div class="se-results"></div>' +
      '<div class="se-foot"><span><kbd>↑</kbd><kbd>↓</kbd> 选择</span><span><kbd>↵</kbd> 跳转</span><span><kbd>esc</kbd> 关闭</span></div>' +
    '</div>';
  document.body.appendChild(overlay);

  var input = overlay.querySelector('.se-input');
  var resultsEl = overlay.querySelector('.se-results');
  var INDEX = null, loading = false, rows = [], active = -1;

  function loadIndex(cb) {
    if (INDEX) { cb(); return; }
    if (loading) return;
    loading = true;
    fetch('search-index.json').then(function (r) { return r.json(); }).then(function (j) {
      INDEX = j; loading = false; cb();
    }).catch(function () { loading = false; resultsEl.innerHTML = '<div class="se-empty">搜索索引加载失败</div>'; });
  }
  function esc(s) { return s.replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  function hl(text, terms) {
    var out = esc(text);
    terms.forEach(function (t) {
      if (!t) return;
      var re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      out = out.replace(re, '<mark>$1</mark>');
    });
    return out;
  }
  function search(q) {
    q = q.trim().toLowerCase();
    if (!q) { rows = []; render(''); return; }
    var terms = q.split(/\s+/);
    var scored = [];
    for (var i = 0; i < INDEX.length; i++) {
      var e = INDEX[i], hay = (e.t + ' ' + e.d).toLowerCase(), ok = true, score = 0;
      for (var k = 0; k < terms.length; k++) { if (hay.indexOf(terms[k]) < 0) { ok = false; break; } }
      if (!ok) continue;
      var tl = e.t.toLowerCase();
      if (tl === q) score += 100; else if (tl.indexOf(q) === 0) score += 50; else if (tl.indexOf(q) >= 0) score += 20;
      score += Math.max(0, 6 - (e.lvl || 0));
      scored.push({ e: e, score: score });
    }
    scored.sort(function (a, b) { return b.score - a.score; });
    rows = scored.slice(0, 50).map(function (x) { return x.e; });
    render(q);
  }
  function render(q) {
    var terms = q ? q.split(/\s+/) : [];
    if (!q) { resultsEl.innerHTML = '<div class="se-empty">输入关键词，跨 10 篇文档检索标题与小节</div>'; active = -1; return; }
    if (!rows.length) { resultsEl.innerHTML = '<div class="se-empty">没有匹配「' + esc(q) + '」的结果</div>'; active = -1; return; }
    resultsEl.innerHTML = rows.map(function (e, i) {
      var href = e.f + (e.a ? '#' + e.a : '');
      return '<a class="se-item lvl' + (e.lvl || 0) + '" href="' + href + '" data-i="' + i + '">' +
        '<div class="se-t">' + hl(e.t, terms) + '</div><div class="se-d">' + esc(e.d) + (e.lvl >= 2 ? ' · §' : '') + '</div></a>';
    }).join('');
    active = 0; mark();
  }
  function mark() {
    var items = resultsEl.querySelectorAll('.se-item');
    items.forEach(function (el, i) { el.classList.toggle('active', i === active); });
    if (items[active]) items[active].scrollIntoView({ block: 'nearest' });
  }
  function go(i) { if (rows[i]) { var e = rows[i]; location.href = e.f + (e.a ? '#' + e.a : ''); } }

  function open() {
    overlay.classList.add('open');
    loadIndex(function () { search(input.value); });
    setTimeout(function () { input.focus(); input.select(); }, 30);
  }
  function close() { overlay.classList.remove('open'); }

  trigger.addEventListener('click', open);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
  input.addEventListener('input', function () { if (INDEX) search(input.value); else loadIndex(function () { search(input.value); }); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (rows.length) { active = (active + 1) % rows.length; mark(); } }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (rows.length) { active = (active - 1 + rows.length) % rows.length; mark(); } }
    else if (e.key === 'Enter') { e.preventDefault(); go(active); }
    else if (e.key === 'Escape') { close(); }
  });
  resultsEl.addEventListener('click', function (e) {
    var a = e.target.closest('.se-item'); if (a) { e.preventDefault(); go(+a.getAttribute('data-i')); }
  });
  addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); overlay.classList.contains('open') ? close() : open(); }
    else if (e.key === '/' && !overlay.classList.contains('open')) {
      var t = e.target, tag = t && t.tagName;
      if (tag !== 'INPUT' && tag !== 'TEXTAREA' && !(t && t.isContentEditable)) { e.preventDefault(); open(); }
    }
  });
})();
