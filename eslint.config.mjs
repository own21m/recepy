// Next 16 usa la configuración plana de ESLint y ejecuta el análisis por separado.
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  {
    rules: {
      // Las imágenes nativas permiten mostrar data URLs en las recetas de la demo.
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "node_modules/**"]),
]);
