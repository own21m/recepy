import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
// La nueva capa editorial puede cambiar la presentación actual. La recuperación
// histórica sigue disponible y su árbol completo de estilos debe permanecer intacto.
test("los estilos originales de 2021 siguen conservados en su referencia histórica", () => {
  const originalStyles = execFileSync("git", ["rev-parse", "original-2021:styles"], {
    encoding: "utf8",
  }).trim();
  assert.equal(originalStyles, "45090a83adb4d0ddc4c1c1d96d99afda67f50f2f");
  const files = execFileSync(
    "git",
    ["ls-tree", "-r", "--name-only", "original-2021", "--", "styles"],
    { encoding: "utf8" },
  )
    .trim()
    .split("\n");
  assert.equal(files.length, 12);
});
