// Renders index.html frame by frame in headless Chromium and pipes the frames to ffmpeg.
// usage: node render.mjs --w 1080 --h 1080 --fps 30 --out out/promo-1080x1080.mp4
//        node render.mjs --w 1080 --h 1080 --stills 0.3,2.1 --out out/stills   (PNG stills, no video)
import { createRequire } from 'module';
import { spawn, execFileSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require('/opt/node22/lib/node_modules/playwright'); }

const here = path.dirname(fileURLToPath(import.meta.url));
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d; };
const W = +arg('w', 1080), H = +arg('h', 1080), FPS = +arg('fps', 30);
const out = path.resolve(arg('out', `out/promo-${W}x${H}.mp4`));
const stills = arg('stills', null);
const ffmpeg = process.env.FFMPEG || execFileSync('python3', ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim();
const audio = path.join(here, 'assets/theme-clip.m4a');

const browser = await playwright.chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
page.on('console', m => console.log('[page]', m.text()));
page.on('pageerror', e => { console.error('[page error]', e); process.exit(1); });
await page.goto(`file://${path.join(here, 'index.html')}?w=${W}&h=${H}`);
const info = await page.evaluate(() => window.ready);
console.log('ready', info);
const stage = await page.$('#stage');

if (stills) {
  fs.mkdirSync(out, { recursive: true });
  for (const t of stills.split(',').map(Number)) {
    await page.evaluate(t => render(t), t);
    await stage.screenshot({ path: path.join(out, `t${t.toFixed(3).padStart(7, '0')}.png`) });
  }
  await browser.close();
  process.exit(0);
}

const N = Math.round(info.DUR * FPS);
fs.mkdirSync(path.dirname(out), { recursive: true });
const ff = spawn(ffmpeg, ['-y', '-loglevel', 'error',
  '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-',
  '-i', audio,
  '-map', '0:v', '-map', '1:a',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '19', '-maxrate', '12M', '-bufsize', '24M', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
  '-r', String(FPS), '-c:a', 'aac', '-b:a', '256k', '-shortest', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });

const t0 = Date.now();
for (let f = 0; f < N; f++) {
  await page.evaluate(t => render(t), f / FPS);
  const buf = await stage.screenshot({ type: 'png' });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  if (f % 60 === 0) console.log(`frame ${f}/${N}  ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}
ff.stdin.end();
await new Promise(r => ff.on('close', r));
await browser.close();
console.log('wrote', out, `${N} frames in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
