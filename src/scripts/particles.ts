// /work — thousands of dots that reshape into each section's headline glyph.
import { BufferAttribute, BufferGeometry, Color, OrthographicCamera, Points, PointsMaterial, Scene, WebGLRenderer } from 'three';
import { chapterAt, smooth } from './chapter';

const sections = [...document.querySelectorAll<HTMLElement>('section[data-glyph]')];
const index = [...document.querySelectorAll<HTMLElement>('.index a')];
const canvas = document.getElementById('gl') as HTMLCanvasElement;
const N = innerWidth < 760 ? 3800 : 6500;
const dpr = Math.min(devicePixelRatio, 2);

const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(dpr);
const scene = new Scene();
const camera = new OrthographicCamera(-1, 1, 1, -1, -10, 10);

// Sample N points from text drawn on an offscreen canvas, into a box x:-1..1, y scaled by aspect.
function sample(lines: string[]) {
  const W = 700, H = 420;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d', { willReadFrequently: true })!;
  const font = (s: number) => `900 ${s}px "Arial Black", Impact, Helvetica, sans-serif`;
  let size = 300;
  g.font = font(size);
  const widest = Math.max(...lines.map(l => g.measureText(l).width));
  size = Math.min(size * (W * 0.94) / widest, H * 0.98 / lines.length / 0.86);
  g.font = font(size); g.textAlign = 'center'; g.textBaseline = 'middle';
  lines.forEach((l, i) => g.fillText(l, W / 2, H / 2 + (i - (lines.length - 1) / 2) * size * 0.86));
  const d = g.getImageData(0, 0, W, H).data, pts: number[] = [];
  for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) if (d[(y * W + x) * 4 + 3] > 128) pts.push(x, y);
  const out = new Float32Array(N * 2);
  for (let i = 0; i < N; i++) {
    const k = ((Math.random() * pts.length / 2) | 0) * 2;
    out[i * 2] = (pts[k] + Math.random() * 2) / W * 2 - 1;
    out[i * 2 + 1] = -((pts[k + 1] + Math.random() * 2) / H * 2 - 1) * (H / W);
  }
  return out;
}
const targets = sections.map(s => sample(s.dataset.glyph!.split('|')));

const pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
const seed = new Float32Array(N * 2), off = new Float32Array(N * 2);
const ink = new Color(0x17150f), red = new Color(0xe2401c);
for (let i = 0; i < N; i++) {
  (Math.random() < 0.13 ? red : ink).toArray(col, i * 3);
  seed[i * 2] = Math.random() * 6.28;
  seed[i * 2 + 1] = 0.4 + Math.random();
}
const geo = new BufferGeometry();
geo.setAttribute('position', new BufferAttribute(pos, 3));
geo.setAttribute('color', new BufferAttribute(col, 3));
scene.add(new Points(geo, new PointsMaterial({ size: 2.4 * dpr, sizeAttenuation: false, vertexColors: true })));

let scale = 1, cy = 0, aspect = 1;
function resize() {
  renderer.setSize(innerWidth, innerHeight, false);
  aspect = innerWidth / innerHeight;
  camera.left = -aspect; camera.right = aspect; camera.updateProjectionMatrix();
  // The glyph lives between the header and the point where the copy begins
  // (the section's top padding in work.css). World y runs from 1 (top) to -1.
  const copyStarts = innerWidth <= 760 ? 0.46 : 0.52;
  const top = 1 - 2 * (56 / innerHeight), bottom = 1 - 2 * copyStarts + 0.05;
  scale = Math.min(aspect * 0.9, 0.78, (top - bottom) / 1.2 * 0.94);   // glyph half-width; its height is 1.2 × this
  cy = (top + bottom) / 2;
}
addEventListener('resize', resize); resize();

let mx = 9, my = 9;
addEventListener('pointermove', e => { mx = (e.clientX / innerWidth * 2 - 1) * aspect; my = -(e.clientY / innerHeight * 2 - 1); });
document.addEventListener('pointerleave', () => { mx = my = 9; });

const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
let active = -1;
function activate(i: number) {
  if (i === active) return;
  active = i;
  sections[i].classList.add('in');
  index.forEach((el, j) => el.classList.toggle('on', i === j));
  document.body.classList.toggle('scrolled', i > 0);   // the cursor hint only belongs on the first screen
}

function frame(t: number) {
  const c = chapterAt(sections);
  activate(Math.round(c));
  const a = Math.floor(c), b = Math.min(sections.length - 1, a + 1);
  const f = smooth(0.18, 0.82, c - a);
  const burst = calm ? 0 : Math.sin(f * Math.PI);   // dots scatter mid-transition
  const A = targets[a], B = targets[b], time = t / 1000;
  for (let i = 0; i < N; i++) {
    const s = seed[i * 2], r = seed[i * 2 + 1];
    const x = (A[i * 2] + (B[i * 2] - A[i * 2]) * f) * scale + Math.cos(s + f * 4) * burst * r * 0.55 + Math.sin(time * r + s) * 0.004;
    const y = (A[i * 2 + 1] + (B[i * 2 + 1] - A[i * 2 + 1]) * f) * scale + cy + Math.sin(s * 1.7 + f * 3) * burst * r * 0.4 + Math.cos(time * r + s) * 0.004;
    // the cursor pushes dots away; they ease back
    const dx = x + off[i * 2] - mx, dy = y + off[i * 2 + 1] - my, d2 = dx * dx + dy * dy;
    if (d2 < 0.03) { const k = (0.03 - d2) * 1.6 / Math.sqrt(d2 + 1e-4); off[i * 2] += dx * k; off[i * 2 + 1] += dy * k; }
    off[i * 2] *= 0.93; off[i * 2 + 1] *= 0.93;
    pos[i * 3] = x + off[i * 2]; pos[i * 3 + 1] = y + off[i * 2 + 1];
  }
  geo.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
