const PLAYERS = [
  { src: 'img/Adit.png', name: 'Adit', pos: 'GELANDANG • CM', ovr: '88', tb: '170 cm', bb: '68 kg', age: '21', bg: '#2c3e50' },
  { src: 'img/Ashraf.png', name: 'Ashraf', pos: 'GELANDANG • AM', ovr: '90', tb: '167 cm', bb: '60 kg', age: '22', bg: '#870000' },
  { src: 'img/Fajar.png', name: 'Fajar', pos: 'PENYERANG • ST', ovr: '86', tb: '172 cm', bb: '66 kg', age: '23', bg: '#16a085' },
  { src: 'img/Ilham.png', name: 'Ilham', pos: 'BERTAHAN • CB', ovr: '87', tb: '178 cm', bb: '75 kg', age: '24', bg: '#d35400' },
  { src: 'img/Robi.png', name: 'Robi', pos: 'Goal Kick • RM', ovr: '85', tb: '165 cm', bb: '70 kg', age: '20', bg: '#1a2a6c' },
  { src: 'img/Usup.png', name: 'Usup', pos: 'Goal Kick • ST', ovr: '92', tb: '174 cm', bb: '65 kg', age: '27', bg: '#003366' },
];

PLAYERS.forEach(d => { const img = new Image(); img.src = d.src; });

const grainSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='200' height='200' filter='url(#n)' opacity='0.08'/></svg>`;
document.getElementById('grain').style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(grainSvg)}")`;

let activeIndex = 0;
let isAnimating = false;
let isMobile = window.innerWidth < 640;

window.addEventListener('resize', () => { isMobile = window.innerWidth < 640; applyRoles(); });

const carousel = document.getElementById('carousel');
const items = PLAYERS.map((d, i) => {
  const el = document.createElement('div');
  el.className = 'carousel-item';
  const img = document.createElement('img');
  img.src = d.src;
  img.draggable = false;
  img.alt = `Pemain ${i + 1}`;
  el.appendChild(img);
  carousel.appendChild(el);
  return el;
});

function getRoles() {
  const len = PLAYERS.length;
  return {
    center: activeIndex,
    left: (activeIndex - 1 + len) % len,
    right: (activeIndex + 1) % len,
  };
}

function applyRoles() {
  const { center, left, right } = getRoles();
  items.forEach((el, i) => {
    let style = {};
    if (i === center) {
      style = {
        transform: `translateX(-50%) scale(${isMobile ? 1.4 : 1.7})`,
        filter: 'none',
        opacity: '1',
        zIndex: '20',
        left: '50%',
        height: isMobile ? '60%' : '70%',
        bottom: isMobile ? '10%' : '2%',
      };
    } else if (i === left) {
      style = {
        transform: 'translateX(-50%) scale(0.85)',
        filter: 'blur(3px)',
        opacity: '0.6',
        zIndex: '10',
        left: isMobile ? '12%' : '25%',
        height: isMobile ? '25%' : '28%',
        bottom: isMobile ? '28%' : '15%',
      };
    } else if (i === right) {
      style = {
        transform: 'translateX(-50%) scale(0.85)',
        filter: 'blur(3px)',
        opacity: '0.6',
        zIndex: '10',
        left: isMobile ? '88%' : '75%',
        height: isMobile ? '25%' : '28%',
        bottom: isMobile ? '28%' : '15%',
      };
    } else {
      style = {
        transform: 'translateX(-50%) scale(0.7)',
        filter: 'blur(5px)',
        opacity: '0',
        zIndex: '1',
        left: '50%',
        height: isMobile ? '20%' : '22%',
        bottom: isMobile ? '30%' : '15%',
      };
    }
    Object.assign(el.style, style);
  });

  const current = PLAYERS[activeIndex];
  document.getElementById('app').style.backgroundColor = current.bg;
  
  const titleEl = document.getElementById('product-title');
  titleEl.style.animation = 'none';
  titleEl.offsetHeight; 
  titleEl.style.animation = 'textAppear 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both';

  titleEl.textContent = current.name;
  document.getElementById('playerPos').textContent = current.pos;
  document.getElementById('playerOvr').textContent = `OVR ${current.ovr}`;
  document.getElementById('playerTb').textContent = current.tb;
  document.getElementById('playerBb').textContent = current.bb;
  document.getElementById('playerAge').textContent = current.age;
}

function navigate(dir) {
  if (isAnimating) return;
  isAnimating = true;
  const len = PLAYERS.length;
  if (dir === 'next') {
    activeIndex = (activeIndex + 1) % len;
  } else {
    activeIndex = (activeIndex - 1 + len) % len;
  }
  applyRoles();
  setTimeout(() => { isAnimating = false; }, 650);
}

document.getElementById('btn-prev').addEventListener('click', () => navigate('prev'));
document.getElementById('btn-next').addEventListener('click', () => navigate('next'));

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') navigate('prev');
  if (e.key === 'ArrowRight') navigate('next');
});

applyRoles();
