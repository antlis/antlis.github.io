// Generates blog terminal-style thumbnails/heroes (1200x760 PNG masters).
// Run from the repo root:  node blog-thumbnails/generate.mjs
// Output goes straight into public/blog/<slug>.png — the same files referenced by each
// post's `imgSrc: "/blog/<slug>.png"`. The card crops to a square via CSS object-fit and
// the hero shows the full window, so the terminal is kept narrow + centered to read in both.
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "blog");
mkdirSync(OUT, { recursive: true });

const W = 1200,
  H = 760;
const FONT = "DejaVu Sans Mono";

// palette presets per theme
const P = {
  shellGreen: { a: "#39d353", a2: "#26a641", bg0: "#0a1410", bg1: "#04140c", glow: "#1f6f3f" },
  shellTeal: { a: "#2dd4bf", a2: "#14b8a6", bg0: "#08161a", bg1: "#02110f", glow: "#0f766e" },
  security: { a: "#f87171", a2: "#ef4444", bg0: "#1a0c0c", bg1: "#140404", glow: "#7f1d1d" },
  dockerBlue: { a: "#38bdf8", a2: "#0ea5e9", bg0: "#0a1320", bg1: "#040a14", glow: "#0c4a6e" },
  hermes: { a: "#a78bfa", a2: "#8b5cf6", bg0: "#120e22", bg1: "#080414", glow: "#4c1d95" },
  mpv: { a: "#f472b6", a2: "#ec4899", bg0: "#1a0c18", bg1: "#120410", glow: "#831843" },
  media: { a: "#60a5fa", a2: "#3b82f6", bg0: "#0b1020", bg1: "#040814", glow: "#1e3a8a" },
  nvim: { a: "#57a143", a2: "#2d8fdd", bg0: "#07160f", bg1: "#050b14", glow: "#1f6feb" },
  nuxt: { a: "#00dc82", a2: "#00a86b", bg0: "#07140f", bg1: "#050b14", glow: "#00dc82" },
  rust: { a: "#ffa657", a2: "#f74c00", bg0: "#1a0f08", bg1: "#120804", glow: "#9a3412" },
};

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// line: {t: text, c?: color, size?, dim?, bold?, indent?}
function term({ pal, path, lines, focus }) {
  const p = P[pal];
  // narrow, centered window so it survives the square (list) crop AND the wide (hero) crop
  const winW = 760,
    winX = (W - winW) / 2,
    winY = 96,
    winH = H - 200,
    r = 20;
  const barH = 60;
  const bodyX = winX + 48;
  // vertically center the body block, biased so focus line sits near canvas center
  const lh = 56;
  const total = lines.length * lh;
  let startY = winY + barH + (winH - barH - total) / 2 + 40;

  const dots = ["#ff5f57", "#febc2e", "#28c840"]
    .map((c, i) => `<circle cx="${winX + 34 + i * 32}" cy="${winY + barH / 2}" r="9" fill="${c}"/>`)
    .join("");

  const body = lines
    .map((ln, i) => {
      const y = startY + i * lh;
      const size = ln.size || 32;
      const color = ln.c || (ln.dim ? "#7d8590" : "#c9d1d9");
      const weight = ln.bold ? 700 : 400;
      const x = bodyX + (ln.indent || 0);
      return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${color}" xml:space="preserve">${esc(ln.t)}</text>`;
    })
    .join("");

  // big focus glyph/number centered (optional)
  const focusEl = focus
    ? `<text x="${W / 2}" y="${H / 2 + (focus.dy || 0)}" text-anchor="middle" font-family="${FONT}" font-size="${focus.size || 120}" font-weight="700" fill="${p.a}" opacity="${focus.op ?? 1}">${esc(focus.t)}</text>`
    : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${p.bg0}"/>
      <stop offset="1" stop-color="${p.bg1}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.42" r="0.6">
      <stop offset="0" stop-color="${p.glow}" stop-opacity="0.45"/>
      <stop offset="1" stop-color="${p.glow}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse">
      <path d="M34 0H0V34" fill="none" stroke="${p.a}" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <!-- shadow -->
  <rect x="${winX}" y="${winY + 14}" width="${winW}" height="${winH}" rx="${r}" fill="#000" opacity="0.35"/>
  <!-- window -->
  <rect x="${winX}" y="${winY}" width="${winW}" height="${winH}" rx="${r}" fill="#0d1117" stroke="${p.a}" stroke-opacity="0.25" stroke-width="1.5"/>
  <!-- title bar -->
  <path d="M${winX} ${winY + r} a${r} ${r} 0 0 1 ${r} ${-r} h${winW - 2 * r} a${r} ${r} 0 0 1 ${r} ${r} v${barH - r} h${-winW} z" fill="#161b22"/>
  ${dots}
  <text x="${winX + winW / 2}" y="${winY + barH / 2 + 1}" text-anchor="middle" dominant-baseline="middle" font-family="${FONT}" font-size="24" fill="#7d8590">${esc(path)}</text>
  <line x1="${winX}" y1="${winY + barH}" x2="${winX + winW}" y2="${winY + barH}" stroke="${p.a}" stroke-opacity="0.15" stroke-width="1"/>
  ${focusEl}
  ${body}
</svg>`;
}

const ARTICLES = [
  {
    slug: "brave-fzf-history",
    pal: "shellTeal",
    path: "brave-history — fzf",
    lines: [
      { t: "> github", c: "#2dd4bf", size: 38, bold: true },
      { t: "  301/3801", dim: true, size: 26 },
      { t: "▌ github.com/junegunn/fzf", c: "#e6edf3", size: 30 },
      { t: "  github.com/cli/cli", dim: true, size: 30 },
      { t: "  news.ycombinator.com", dim: true, size: 30 },
    ],
  },
  {
    slug: "fzf-tmuxinator-projects",
    pal: "shellGreen",
    path: "tmuxinator — fzf",
    lines: [
      { t: "> proj", c: "#39d353", size: 38, bold: true },
      { t: "  3/12", dim: true, size: 26 },
      { t: "  dotfiles", dim: true, size: 30 },
      { t: "▌ homelab", c: "#e6edf3", size: 30 },
      { t: "  blog", dim: true, size: 30 },
    ],
  },
  {
    slug: "linkedin-defi-scammers",
    pal: "security",
    path: "inbox — recruiter",
    lines: [
      { t: '◆ "Senior role, great pay"', dim: true, size: 28 },
      { t: '◆ "just run our DeFi app"', dim: true, size: 28 },
      { t: "> connect wallet?", c: "#e6edf3", size: 32 },
      { t: "⚠ drains funds", c: "#f87171", size: 40, bold: true },
      { t: "✗ BLOCKED", c: "#39d353", size: 34, bold: true },
    ],
  },
  {
    slug: "docker-btrfs-disk-recovery",
    pal: "dockerBlue",
    path: "~ — thinkpad",
    lines: [
      { t: "$ docker system df", dim: true, size: 30 },
      { t: "  RECLAIMABLE", dim: true, size: 28 },
      { t: "  105.4 GB", c: "#38bdf8", size: 64, bold: true },
      { t: "$ btrfs fi usage /", dim: true, size: 30 },
      { t: "  reclaiming…_", c: "#e6edf3", size: 30 },
    ],
  },
  {
    slug: "hermes-status-bar-token-tweaks",
    pal: "hermes",
    path: "hermes — status",
    lines: [
      { t: "◆ hermes-agent", c: "#a78bfa", size: 34, bold: true },
      { t: "  ctx  ████████░░  42%", c: "#e6edf3", size: 30 },
      { t: "  tok  18.2k / session", dim: true, size: 30 },
      { t: "  cost $0.03", dim: true, size: 30 },
      { t: "_", c: "#a78bfa", size: 30 },
    ],
  },
  {
    slug: "tg-mpv-bot",
    pal: "mpv",
    path: "tg-mpv-bot — telegram",
    lines: [
      { t: "> /play <url>", c: "#e6edf3", size: 32 },
      { t: "▶ now playing", c: "#f472b6", size: 40, bold: true },
      { t: "  ◀◀   ▶   ▶▶", dim: true, size: 30 },
      { t: "  vol ──●─────", dim: true, size: 30 },
      { t: "  telegram → mpv → TV", dim: true, size: 28 },
    ],
  },
  {
    slug: "tg-media-bot",
    pal: "media",
    path: "tg-media-bot — telegram",
    lines: [
      { t: "> https://…/reel", c: "#e6edf3", size: 30 },
      { t: "↓ yt-dlp", c: "#60a5fa", size: 36, bold: true },
      { t: "  video.mp4  8.4 MB", dim: true, size: 30 },
      { t: "✓ sent back", c: "#39d353", size: 38, bold: true },
    ],
  },
  {
    slug: "telescope-gist",
    pal: "nvim",
    path: "nvim — telescope gist",
    lines: [
      { t: "> Telescope gist list", c: "#e6edf3", size: 30 },
      { t: "S  init.lua       1 file", dim: true, size: 28 },
      { t: "P  notes.md       3 files", c: "#e6edf3", size: 28 },
      { t: ":w  PATCH /gists/<id>", c: "#57a143", size: 34, bold: true },
      { t: "cache: mem + disk TTL", dim: true, size: 28 },
    ],
  },
  {
    slug: "nuxt-bun-create-open-source",
    pal: "nuxt",
    path: "nuxt + bun — oss",
    lines: [
      { t: "$ bun create nuxt -- -t v3", dim: true, size: 26 },
      { t: "Nuxt 4 prompt only", c: "#f87171", size: 32, bold: true },
      { t: "$ npm create … -- -t v3", dim: true, size: 26 },
      { t: "args: ['-t', 'v3']", c: "#00dc82", size: 34, bold: true },
      { t: "PR merged → upstream bug", dim: true, size: 28 },
    ],
  },
  {
    slug: "contributing-to-bun-after-the-rust-rewrite",
    pal: "rust",
    path: "bun — rust rewrite",
    lines: [
      { t: "✗ PR #29089 closed", c: "#f87171", size: 32, bold: true },
      { t: '"predates rust rewrite"', dim: true, size: 24 },
      { t: "src/cli.zig → runtime/cli", c: "#e6edf3", size: 28 },
      { t: "rewritten in Rust", c: "#ffa657", size: 34, bold: true },
      { t: "✓ PR #32954 open", c: "#39d353", size: 30, bold: true },
    ],
  },
  {
    slug: "x2x-sharing-keyboard-mouse",
    pal: "shellTeal",
    path: "~ — ssh x2x",
    lines: [
      { t: "$ ssh -YC archcraft-lan \\", c: "#2dd4bf", size: 28, bold: true },
      { t: '    "/usr/bin/x2x -east -to :0"', c: "#e6edf3", size: 28 },
      { t: "", size: 16 },
      { t: "  laptop  ──▶  TV", c: "#2dd4bf", size: 40, bold: true },
      { t: "  ◀── cursor slides east", dim: true, size: 26 },
    ],
  },
  {
    slug: "ai-harness-setup",
    pal: "hermes",
    path: "~/vault/ai — opencode",
    lines: [
      { t: "$ opencode", c: "#a78bfa", size: 32, bold: true },
      { t: "  reading AI_CONTEXT.md…", dim: true, size: 26 },
      { t: "  → skills/", c: "#e6edf3", size: 28 },
      { t: "  → devices/", c: "#e6edf3", size: 28 },
      { t: "  → playbooks/", c: "#e6edf3", size: 28 },
      { t: "✓ context loaded", c: "#39d353", size: 34, bold: true },
    ],
  },
];

for (const a of ARTICLES) {
  const svg = term(a);
  await sharp(Buffer.from(svg), { density: 144 })
    .resize(W, H)
    .png()
    .toFile(join(OUT, `${a.slug}.png`));
}
console.log("generated", ARTICLES.length, "thumbnails ->", OUT);
