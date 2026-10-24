import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { compileString } from "sass";

// La recuperación debe conservar las reglas visuales originales. Compilar ambas
// fuentes permite cambiar el formato del código sin cambiar colores, tamaños o layout.
test("las hojas de estilo conservan las reglas del proyecto original de 2021", () => {
  const files = execFileSync(
    "git",
    ["ls-tree", "-r", "--name-only", "original-2021", "--", "styles"],
    { encoding: "utf8" },
  )
    .trim()
    .split("\n");
  assert.equal(files.length, 12);
  const canonicalCss = (source) =>
    compileString(source).css.replace(/'/g, '"').replace(/\s+/g, " ").trim();
  for (const file of files) {
    const original = execFileSync("git", ["show", "original-2021:" + file], {
      encoding: "utf8",
    });
    assert.equal(canonicalCss(readFileSync(file, "utf8")), canonicalCss(original), file);
  }
});
