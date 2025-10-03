(() => {
  // ====== CONFIG: your Azure App Service API base (must include https and /api) ======
  const API_BASE = "https://node-js-on-azure-gc-cnbwb7e9fcgxd0e0.centralus-01.azurewebsites.net/api";

  // Sprite positions for 1..20
  const POS = [
    {x: 14,  y: 3}, {x: 228, y: 3}, {x: 442, y: 3}, {x: 657, y: 3}, {x: 874, y: 5},
    {x: 14,  y: 223}, {x: 228, y: 223}, {x: 442, y: 223}, {x: 657, y: 223}, {x: 874, y: 223},
    {x: 14,  y: 426}, {x: 228, y: 426}, {x: 442, y: 426}, {x: 657, y: 426}, {x: 874, y: 426},
    {x: 14,  y: 645}, {x: 228, y: 645}, {x: 442, y: 645}, {x: 657, y: 645}, {x: 874, y: 645}
  ];

  const dieEl    = document.getElementById('die');
  const spriteEl = document.getElementById('dieSprite');
  const result   = document.getElementById('result');
  const countEl  = document.getElementById('count');
  const rollBtn  = document.getElementById('rollBtn');
  const corsBtn  = document.getElementById('corsBtn');

  let count = 0;

  function setDieFace(n) {
    const p = POS[n - 1];
    if (!p) return; // safety
    spriteEl.style.transform = `translate(${-p.x}px, ${-p.y}px)`;
    dieEl.setAttribute('aria-label', `D20 shows ${n}`);
  }

  async function apiRandom(min, max) {
    const url = `${API_BASE}/random?min=${min}&max=${max}`;
    const r = await fetch(url, { mode: "cors" });
    if (!r.ok) throw new Error(`API error ${r.status}`);
    const j = await r.json();
    return j.n;
  }

  async function roll() {
    try {
      const n = await apiRandom(1, 20);
      setDieFace(n);
      result.value = n;
      count += 1;
      countEl.value = count;
    } catch (e) {
      console.error("Random API failed:", e);
      result.value = "ERR";
    } finally {
      rollBtn?.focus();
    }
  }

  // Wake the Node server without blocking UI
  function wakeServer() {
    try { fetch(`${API_BASE}/ping`, { mode: "cors" }); } catch { /* ignore */ }
  }

  // CORS failure demo: this endpoint has NO CORS headers on the server
  async function demoCorsFailure() {
    try {
      console.log("CORS demo: calling /nocors (should fail)...");
      const r = await fetch(`${API_BASE}/nocors`, { mode: "cors" });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      console.warn("Unexpected: /nocors succeeded (CORS likely open).");
    } catch (e) {
      console.error("CORS failed as expected:", e);
      alert("CORS failed as expected. Check the console for details.");
    }
  }

  rollBtn?.addEventListener('click', roll);
  corsBtn?.addEventListener('click', demoCorsFailure);

  window.addEventListener('DOMContentLoaded', () => {
    wakeServer();   // async “wake up”
    roll();         // auto-roll on page load
  });
})();
