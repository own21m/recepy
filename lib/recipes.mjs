// Contrato compartido por el formulario, la persistencia y las pruebas sin navegador.
export const STORAGE_KEY = "recepy-demo-recipes-v1";
export const MAX_IMAGE_BYTES = 1024 * 1024;
export const MAX_STORED_CHARACTERS = 3_000_000;
export const CATEGORIES = ["Pasteleria", "Vegetariano", "Parrilla", "Otro"];
export const FALLBACK_IMAGE = "/wallpaper.jpg";

// Ejemplos de la recuperación, no registros de la base de datos histórica.
export const SAMPLE_RECIPES = [
  {
    id: "ejemplo-torta",
    name: "Torta de chocolate y fresas",
    author: "Cocina de demostración",
    type: "Pasteleria",
    image: "/download.jpg",
    description: "Un ejemplo dulce para conocer cómo se presentan las recetas en Recepy.",
    ingredients:
      "200 g de harina\n150 g de azúcar\n50 g de cacao\n2 huevos\n150 ml de leche\nFresas para decorar",
    howTo:
      "1. Mezcla los ingredientes secos.\n2. Incorpora los huevos y la leche.\n3. Hornea a 180 °C durante unos 30 minutos, hasta que esté cocida.\n4. Deja enfriar y decora con fresas.",
    video: "",
  },
  {
    id: "ejemplo-pizza",
    name: "Pizza de la huerta",
    author: "Cocina de demostración",
    type: "Vegetariano",
    image: "/wallpaper.jpg",
    description: "Una receta de ejemplo con vegetales, queso y una base crujiente.",
    ingredients:
      "1 base de pizza\n4 cucharadas de salsa de tomate\n150 g de mozzarella\nPimentón, champiñones y albahaca",
    howTo:
      "1. Extiende la salsa sobre la base.\n2. Añade el queso y las verduras cortadas.\n3. Hornea a 220 °C hasta que la base y el queso estén dorados.\n4. Termina con albahaca fresca.",
    video: "",
  },
  {
    id: "ejemplo-empanadas",
    name: "Empanadas para compartir",
    author: "Cocina de demostración",
    type: "Otro",
    image: "/downloada.jpg",
    description: "Un ejemplo casero para probar los detalles y las categorías.",
    ingredients:
      "8 discos de masa\n250 g de relleno cocido a elección\n1 huevo para pincelar",
    howTo:
      "1. Coloca una cucharada de relleno sobre cada disco.\n2. Cierra y sella los bordes.\n3. Pincela con huevo.\n4. Hornea a 200 °C hasta que estén doradas.",
    video: "",
  },
];

// Solo se admiten direcciones web para video, nunca esquemas ejecutables.
export function isVideoUrl(value) {
  if (!value) return true;
  if (typeof value !== "string") return false;
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

export function validateRecipe(values) {
  const errors = {};
  for (const field of ["name", "description", "ingredients", "howTo"]) {
    const limit = field === "name" ? 100 : 6000;
    if (typeof values[field] !== "string" || !values[field].trim())
      errors[field] = "Completa este campo.";
    else if (String(values[field]).length > limit)
      errors[field] = "Usa como máximo " + limit + " caracteres.";
  }
  if (!CATEGORIES.includes(values.type)) errors.type = "Elige una categoría válida.";
  if (!isVideoUrl(values.video)) errors.video = "Usa una URL http o https válida.";
  return errors;
}

// El almacenamiento local es entrada externa y puede estar dañado o modificado.
export function parseStoredRecipes(raw) {
  if (!raw) return [];
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed))
    throw new Error("El almacenamiento no contiene una lista de recetas.");
  return parsed.filter(
    (recipe) =>
      recipe &&
      typeof recipe.id === "string" &&
      typeof recipe.name === "string" &&
      typeof recipe.author === "string" &&
      typeof recipe.description === "string" &&
      typeof recipe.ingredients === "string" &&
      typeof recipe.howTo === "string" &&
      CATEGORIES.includes(recipe.type) &&
      isVideoUrl(recipe.video) &&
      typeof recipe.image === "string" &&
      (recipe.image.startsWith("data:image/") ||
        recipe.image.startsWith("/") ||
        /^https?:\/\//.test(recipe.image)),
  );
}

export function createLocalRecipe(values, image, id, timestamp) {
  if (Object.keys(validateRecipe(values)).length)
    throw new Error("La receta tiene campos incompletos o inválidos.");
  return {
    id,
    name: values.name.trim(),
    description: values.description.trim(),
    ingredients: values.ingredients.trim(),
    howTo: values.howTo.trim(),
    type: values.type,
    video: (values.video || "").trim(),
    image: image || FALLBACK_IMAGE,
    author: "Visitante de demostración",
    date: timestamp,
    localOnly: true,
  };
}

export function serializeRecipes(recipes) {
  const serialized = JSON.stringify(recipes);
  if (serialized.length > MAX_STORED_CHARACTERS) {
    throw new Error(
      "La demo alcanzó su límite local. Usa una imagen más pequeña o elimina las recetas locales desde tu perfil.",
    );
  }
  return serialized;
}
