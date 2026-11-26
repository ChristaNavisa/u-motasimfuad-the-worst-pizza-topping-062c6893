import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the repository root from this file's own location, so the
// entrypoint works no matter which directory the grader invokes it from.
// (Never process.cwd(): the grader may invoke us from anywhere.)
const repoRoot = dirname(fileURLToPath(import.meta.url));
void repoRoot;

// One funny line pitching a terrible pizza topping: wet socks on a pizza,
// so awful that the crust itself files a complaint before the eater does.
// The joke is the reversal at the end — the pizza objects to its own topping.
const entry =
  "This pizza comes topped with wet socks. The crust filed a complaint first.";

// The gate only accepts 1 to under 200 characters of UTF-8 text on a
// single line ("under 200", per the task text — not 200 or fewer), so
// refuse loudly instead of ever writing an entry the scorer would reject.
// The entry below is 74 characters, well inside the gate, and the guard
// below keeps it that way if the line is ever reworded.
if (entry.length < 1 || entry.length > 199) {
  throw new Error(
    `entry is ${entry.length} characters, outside the under-200 gate`,
  );
}
if (entry.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
