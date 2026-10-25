import { useRecipes } from "./RecipesProvider";
import GeneralGet from "./Get";
export default function Special() {
  const { recipes } = useRecipes();
  const featured = [...recipes]
    .sort((a, b) => a.name.localeCompare(b.name, "es"))
    .slice(0, 3);
  return <GeneralGet recipes={featured} modalId="open-modal3" featured />;
}
