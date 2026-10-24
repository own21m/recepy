import { useSession } from "../auth/Session";
import { useRecipes } from "./RecipesProvider";
import GeneralGet from "./Get";
import style from "../../styles/database/GetUser.module.scss";

// Las recetas de la demo pertenecen al visitante local, no a una cuenta de 2021.
// La vista reutiliza el carrusel y las clases de GetUser.module.scss de 2021.
export default function GetUser() {
  const { user } = useSession();
  const { recipes, isDemo } = useRecipes();
  const ownRecipes = recipes.filter((recipe) =>
    isDemo ? recipe.localOnly : recipe.idAuthor && recipe.idAuthor === user?.email,
  );
  return (
    <GeneralGet
      recipes={ownRecipes}
      modalId="open-modal5"
      cardStyle={style}
      emptyMessage="Todavía no has creado recetas en este navegador."
    />
  );
}
