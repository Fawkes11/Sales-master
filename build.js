/**
 * Production build script.
 * Reads the source files (index.html, css/, js/, src/img, build/) and
 * writes a self-contained, minified + obfuscated copy into dist/.
 * Nothing in dist/ depends on files outside dist/ — it's what gets deployed.
 */

const fs = require("fs");
const path = require("path");
const CleanCSS = require("clean-css");
const { minify: minifyHtml } = require("html-minifier-terser");
const JavaScriptObfuscator = require("javascript-obfuscator");

const ROOT = __dirname;
const DIST = path.join(ROOT, "dist");

function rmrf(p) {
  fs.rmSync(p, { recursive: true, force: true });
}
function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}
function copy(src, dest) {
  fs.cpSync(src, dest, { recursive: true });
}

async function build() {
  console.log("Cleaning dist/ ...");
  rmrf(DIST);
  ensureDir(DIST);

  // ---- 1. Static assets that stay under ./build/ ------------------------
  copy(path.join(ROOT, "build/img/favicon"), path.join(DIST, "build/img/favicon"));
  copy(path.join(ROOT, "build/videos"), path.join(DIST, "build/videos"));

  ensureDir(path.join(DIST, "build/fonts/noto-sans"));
  ensureDir(path.join(DIST, "build/fonts/sancoale"));
  // NotoSans-Regular.ttf is never referenced by any @font-face rule — dropped.
  fs.copyFileSync(
    path.join(ROOT, "build/fonts/noto-sans/NotoSans-Medium.ttf"),
    path.join(DIST, "build/fonts/noto-sans/NotoSans-Medium.ttf")
  );
  for (const f of [
    "SancoaleSoftenedRegular.otf",
    "SancoaleSoftenedMedium.otf",
    "SancoaleSoftenedThin.otf",
  ]) {
    fs.copyFileSync(
      path.join(ROOT, "build/fonts/sancoale", f),
      path.join(DIST, "build/fonts/sancoale", f)
    );
  }
  // build/audios, build/gifs, build/lotties are empty and unreferenced — skipped.

  // ---- 2. Images: src/img/** -> dist/img/** (the "src" name disappears) -
  copy(path.join(ROOT, "src/img"), path.join(DIST, "img"));

  // ---- 3. CSS: inline global.css into main.css, rewrite paths, minify ---
  const globalCss = fs.readFileSync(path.join(ROOT, "css/global.css"), "utf8");
  let mainCss = fs.readFileSync(path.join(ROOT, "css/main.css"), "utf8");
  mainCss = mainCss.replace(/@import\s+['"]\.\/global\.css['"];?/, globalCss);
  mainCss = mainCss.replace(/\.\.\/src\/img\//g, "../img/");

  const cssResult = new CleanCSS({ level: 2 }).minify(mainCss);
  if (cssResult.errors.length) throw new Error(cssResult.errors.join("\n"));
  ensureDir(path.join(DIST, "css"));
  fs.writeFileSync(path.join(DIST, "css/main.min.css"), cssResult.styles);

  // ---- 4. JS: copy vendor libs as-is, obfuscate our own code ------------
  ensureDir(path.join(DIST, "js"));
  fs.copyFileSync(
    path.join(ROOT, "js/jquery-3.6.0.min.js"),
    path.join(DIST, "js/jquery-3.6.0.min.js")
  );
  fs.copyFileSync(
    path.join(ROOT, "js/jquery-ui.min.js"),
    path.join(DIST, "js/jquery-ui.min.js")
  );

  let mainJs = fs.readFileSync(path.join(ROOT, "js/main.js"), "utf8");
  // components/example.js registers <example-comp>, which index.html never uses — dead import, dropped.
  mainJs = mainJs.replace(/^\s*import\s+["']\.\.\/components\/example\.js["'];?\s*\n/, "");

  const obfuscated = JavaScriptObfuscator.obfuscate(mainJs, {
    compact: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    stringArray: true,
    stringArrayEncoding: ["base64"],
    stringArrayThreshold: 0.75,
    identifierNamesGenerator: "hexadecimal",
    renameGlobals: false,
    selfDefending: false,
  }).getObfuscatedCode();
  fs.writeFileSync(path.join(DIST, "js/main.min.js"), obfuscated);

  // ---- 5. HTML: rewrite references, strip dev comments, minify ----------
  let html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  html = html.replace(/\.\/src\/img\//g, "./img/");
  html = html.replace(
    '<link rel="stylesheet" href="./css/main.css">',
    '<link rel="stylesheet" href="./css/main.min.css">'
  );
  html = html.replace(
    '<script type="module" src="./js/main.js"></script>',
    '<script type="module" src="./js/main.min.js"></script>'
  );

  const minifiedHtml = await minifyHtml(html, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    useShortDoctype: true,
    minifyCSS: false, // already minified separately
    minifyJS: false, // no inline scripts
  });
  fs.writeFileSync(path.join(DIST, "index.html"), minifiedHtml);

  console.log("dist/ ready.");
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
