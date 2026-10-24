import { useRecipes } from "./RecipesProvider";
import RecipeGrid from "../content/RecipeGrid";

// Se conserva el criterio original: tres recetas ordenadas por nombre, no por popularidad.
export default function Special() {
  const { recipes } = useRecipes();
  const featured = [...recipes]
    .sort((a, b) => a.name.localeCompare(b.name, "es"))
    .slice(0, 3);
  return <RecipeGrid recipes={featured} featured />;
}
