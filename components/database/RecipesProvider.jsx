import { createContext, useContext, useEffect, useState } from "react";
import { fetchCloudRecipes } from "./config";
import {
  STORAGE_KEY,
  SAMPLE_RECIPES,
  createLocalRecipe,
  parseStoredRecipes,
  serializeRecipes,
} from "../../lib/recipes.mjs";

const RecipesContext = createContext(null);
export const isDemoMode = process.env.NEXT_PUBLIC_DATA_MODE !== "firebase";

// Una consulta por montaje y una fuente común para todas las listas de recetas.
export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState(isDemoMode ? SAMPLE_RECIPES : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const saved = isDemoMode
          ? [
              ...parseStoredRecipes(window.localStorage.getItem(STORAGE_KEY)),
              ...SAMPLE_RECIPES,
            ]
          : await fetchCloudRecipes();
        if (mounted) setRecipes(saved);
      } catch {
        if (mounted)
          setError(
            isDemoMode
              ? "No se pudieron leer las recetas locales. Los ejemplos siguen disponibles. Puedes limpiar la demo desde tu perfil."
              : "No se pudieron consultar las recetas en Firebase. Revisa la configuración y las reglas de lectura del proyecto.",
          );
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  function addRecipe(values, image) {
    if (!isDemoMode)
      throw new Error(
        "La publicación en la nube requiere un backend que autorice Firebase. Esta recuperación solo habilita lectura.",
      );
    const recipe = createLocalRecipe(
      values,
      image,
      crypto.randomUUID(),
      new Date().toISOString(),
    );
    const localRecipes = [recipe, ...recipes.filter((item) => item.localOnly)];
    try {
      window.localStorage.setItem(STORAGE_KEY, serializeRecipes(localRecipes));
    } catch (problem) {
      throw new Error(
        problem.message.includes("límite")
          ? problem.message
          : "Tu navegador no pudo guardar la receta. Revisa el espacio disponible y el permiso de almacenamiento.",
      );
    }
    setRecipes([...localRecipes, ...SAMPLE_RECIPES]);
    setError("");
  }

  function clearLocalRecipes() {
    window.localStorage.removeItem(STORAGE_KEY);
    setRecipes(SAMPLE_RECIPES);
    setError("");
  }
  return (
    <RecipesContext.Provider
      value={{
        recipes,
        loading,
        error,
        addRecipe,
        clearLocalRecipes,
        isDemo: isDemoMode,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipesContext);
  if (!context) throw new Error("useRecipes debe usarse dentro de RecipesProvider.");
  return context;
}
