(() => {
  // Pixel coordinates for each face (x,y) found via gimp. 
  const POS = [
    {x: 14,  y: 3},   // 1
    {x: 228, y: 3},   // 2
    {x: 442, y: 3},   // 3
    {x: 657, y: 3},   // 4
    {x: 874, y: 5},   // 5
    {x: 14,  y: 223}, // 6
    {x: 228, y: 223}, // 7
    {x: 442, y: 223}, // 8
    {x: 657, y: 223}, // 9
    {x: 874, y: 223}, // 10
    {x: 14,  y: 426}, // 11
    {x: 228, y: 426}, // 12
    {x: 442, y: 426}, // 13
    {x: 657, y: 426}, // 14
    {x: 874, y: 426}, // 15
    {x: 14,  y: 645}, // 16
    {x: 228, y: 645}, // 17
    {x: 442, y: 645}, // 18
    {x: 657, y: 645}, // 19
    {x: 874, y: 645}  // 20
  ];

  const dieEl    = document.getElementById('die');          // for aria-label only
  const spriteEl = document.getElementById('dieSprite');    // the <img> we shift
  const result   = document.getElementById('result');
  const countEl  = document.getElementById('count');
  const rollBtn  = document.getElementById('rollBtn');

  let count = 0;

  function randomD20() {
    return Math.floor(Math.random() * 20) + 1;
  }

  function setDieFace(n) {
    const p = POS[n - 1];
    // Move the big image so that (x,y) ends up at the top-left of the window
    spriteEl.style.transform = `translate(${-p.x}px, ${-p.y}px)`;
    dieEl.setAttribute('aria-label', `D20 shows ${n}`);
  }

  function roll() {
    const n = randomD20();
    setDieFace(n);
    result.value = n;
    count += 1;
    countEl.value = count;
    rollBtn.focus(); // keep Enter re-rolling
  }

  // Only the button rolls the die
  rollBtn.addEventListener('click', roll);

  // Auto-roll once on page load
  window.addEventListener('DOMContentLoaded', () => {
    roll();
  });
})();
