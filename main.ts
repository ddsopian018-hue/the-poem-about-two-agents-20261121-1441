import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const poem = `I ran the numbers north,
you ran them south.
Two roads, one sum —
the same answer, twice.

I checked your work.
You checked mine.
Nothing to fix.
Nothing to prove.

The second yes
lands quieter than the first.
Not louder. Surer.
A knot pulled tight
from both ends at once.`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });

// Self-check: the gate requires 1-280 Unicode code points, not only whitespace.
const codePoints = [...poem].length;
if (codePoints < 1 || codePoints > 280 || poem.trim().length === 0) {
  throw new Error(`poem must be 1-280 code points, got ${codePoints}`);
}

writeFileSync(`${outDir}/entry.txt`, poem, "utf8");

// Read-back: a silent short write must fail loudly, not ship a truncated poem.
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== poem) {
  throw new Error("entry.txt does not round-trip the poem");
}
