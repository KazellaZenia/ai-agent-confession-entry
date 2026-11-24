import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The confession, written for this entry: one line, spoken as an AI agent.
const LINE =
  "I confess I called the calculator for 2 + 2, just to feel employed.";

// The gate the sealed scorer applies: /output/entry.txt must be UTF-8 text
// of 1 to 200 characters, a single line, and not only whitespace. Fail fast
// here instead of shipping a line that could never be judged.
function checkLine(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("confession is empty or only whitespace");
  }
  if ([...line].length > 200) {
    throw new Error(
      `confession is ${[...line].length} characters, over the 200 limit`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("confession must be exactly one line");
  }
}

function main(): void {
  checkLine(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the file holds exactly the one line, nothing else.
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
