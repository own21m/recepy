import { useRecipes } from "./RecipesProvider";
import GeneralGet from "./Get";
export default function GetType({ type }) {
  const { recipes } = useRecipes();
  return (
    <GeneralGet
      recipes={recipes.filter((recipe) => recipe.type === type)}
      modalId="open-modal-category"
      emptyMessage="Todavía no hay recetas en esta categoría. Puedes compartir la primera."
    />
  );
}
