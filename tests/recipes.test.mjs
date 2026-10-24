import assert from "node:assert/strict";
import test from "node:test";
import {
  SAMPLE_RECIPES,
  FALLBACK_IMAGE,
  MAX_STORED_CHARACTERS,
  createLocalRecipe,
  validateRecipe,
  parseStoredRecipes,
  serializeRecipes,
  isVideoUrl,
} from "../lib/recipes.mjs";

const values = {
  name: " Ensalada ",
  description: " Fresca ",
  ingredients: " Lechuga ",
  howTo: " Mezclar ",
  type: "Vegetariano",
  video: "",
};

// Las pruebas cubren reglas y fallos de almacenamiento, no la forma de implementar los componentes.
test("las muestras están completas y cubren categorías reconocidas", () => {
  for (const sample of SAMPLE_RECIPES) assert.deepEqual(validateRecipe(sample), {});
});
test("el formulario rechaza campos vacíos y categorías desconocidas", () => {
  const errors = validateRecipe({ ...values, name: " ", type: "desconocido" });
  assert.ok(errors.name);
  assert.ok(errors.type);
});
test("la validación rechaza tipos de datos ajenos al formulario", () => {
  assert.ok(validateRecipe({ ...values, name: {} }).name);
  assert.equal(isVideoUrl({}), false);
});
test("una receta nueva tiene autor local, fecha y fotografía de respaldo", () => {
  const result = createLocalRecipe(values, "", "local-1", "2026-10-24");
  assert.equal(result.name, "Ensalada");
  assert.equal(result.image, FALLBACK_IMAGE);
  assert.equal(result.author, "Visitante de demostración");
  assert.equal(result.localOnly, true);
});
test("el enlace de vídeo rechaza javascript y archivos locales", () => {
  for (const value of ["javascript:alert(1)", "file:///private.mp4", "not a URL"])
    assert.equal(isVideoUrl(value), false);
  assert.equal(isVideoUrl("https://example.com/video.mp4"), true);
});
test("las recetas locales sobreviven una serialización y lectura", () => {
  const result = createLocalRecipe(values, "", "local-2", "2026-10-24");
  assert.deepEqual(parseStoredRecipes(serializeRecipes([result])), [result]);
});
test("se ignoran registros locales inválidos sin perder los válidos", () => {
  const result = createLocalRecipe(values, "", "local-3", "2026-10-24");
  assert.deepEqual(parseStoredRecipes(JSON.stringify([null, {}, result])), [result]);
});
test("un JSON roto o un objeto ajeno se informan en lugar de interpretarse como recetas", () => {
  assert.throws(() => parseStoredRecipes("{broken"));
  assert.throws(() => parseStoredRecipes("{}"));
  assert.deepEqual(parseStoredRecipes(null), []);
});
test("la demo evita superar su presupuesto de almacenamiento", () => {
  assert.throws(
    () => serializeRecipes([{ description: "x".repeat(MAX_STORED_CHARACTERS) }]),
    /límite/,
  );
});
