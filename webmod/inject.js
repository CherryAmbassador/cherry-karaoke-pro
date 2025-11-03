(()=>{
  const inject = () => {
    if (document.getElementById('ck-media-clarity-filters')) return;
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.id = 'ck-media-clarity-filters';
    svg.style = 'position:fixed;left:-9999px;top:-9999px;width:0;height:0;pointer-events:none;';
    const defs = document.createElementNS(NS, 'defs');

    const mk = (id, blur, amt) => {
      const f = document.createElementNS(NS, 'filter');
      f.id = id;
      f.setAttribute('color-interpolation-filters', 'sRGB');

      const g = document.createElementNS(NS, 'feGaussianBlur');
      g.setAttribute('in', 'SourceGraphic');
      g.setAttribute('stdDeviation', String(blur));
      g.setAttribute('result', 'blur');
      f.appendChild(g);

      const c = document.createElementNS(NS, 'feComposite');
      c.setAttribute('in', 'SourceGraphic');
      c.setAttribute('in2', 'blur');
      c.setAttribute('operator', 'arithmetic');
      c.setAttribute('k1', '0');
      c.setAttribute('k2', String(1 + amt));
      c.setAttribute('k3', String(-amt));
      c.setAttribute('k4', '0');
      c.setAttribute('result', 'sharp');
      f.appendChild(c);

      defs.appendChild(f);
    };

    mk('ck-unsharp-1', 0.5, 0.25);
    mk('ck-unsharp-2', 0.8, 0.40);
    mk('ck-unsharp-3', 1.2, 0.60);

    svg.appendChild(defs);
    document.documentElement.appendChild(svg);
  };

  const setDefault = () => {
    const h = document.documentElement;
    if (!h.classList.contains('ck-sharp-0') &&
        !h.classList.contains('ck-sharp-1') &&
        !h.classList.contains('ck-sharp-2') &&
        !h.classList.contains('ck-sharp-3')) {
      h.classList.add('ck-sharp-1');
    }
  };

  const hotkeys = () => {
    window.addEventListener('keydown', (e) => {
      if (!e.ctrlKey || !e.altKey) return;
      const h = document.documentElement;

      if (e.key === '1') { h.classList.remove('ck-sharp-0','ck-sharp-2','ck-sharp-3'); h.classList.add('ck-sharp-1'); }
      else if (e.key === '2'){ h.classList.remove('ck-sharp-0','ck-sharp-1','ck-sharp-3'); h.classList.add('ck-sharp-2'); }
      else if (e.key === '3'){ h.classList.remove('ck-sharp-0','ck-sharp-1','ck-sharp-2'); h.classList.add('ck-sharp-3'); }
      else if (e.key === '0'){ h.classList.remove('ck-sharp-1','ck-sharp-2','ck-sharp-3'); h.classList.add('ck-sharp-0'); }
      else { return; }

      console.log('[CK Media Clarity] mode =', Array.from(h.classList).find(c => c.startsWith('ck-sharp-')));
    }, true);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { inject(); setDefault(); hotkeys(); });
  } else {
    inject(); setDefault(); hotkeys();
  }
})();