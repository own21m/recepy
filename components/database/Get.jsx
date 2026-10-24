import { useRecipes } from "./RecipesProvider";
import RecipeGrid from "../content/RecipeGrid";

// Renderizar la lista no vuelve a consultar Firebase.
export default function GeneralGet() {
  const { recipes } = useRecipes();
  return <RecipeGrid recipes={recipes} />;
}
