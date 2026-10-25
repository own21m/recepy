import { useState } from "react";
import { useRecipes } from "./RecipesProvider";
import { FALLBACK_IMAGE } from "../../lib/recipes.mjs";
import UiIcon from "../content/UiIcon";
import RecipeDetail from "./RecipeDetail";
import EditorialState from "../content/EditorialState";
import style from "../../styles/database/Get.module.scss";

export default function GeneralGet({
  recipes: suppliedRecipes,
  modalId = "open-modal2",
  emptyMessage = "Todavía no hay recetas para mostrar.",
  featured = false,
}) {
  const { recipes: allRecipes, loading, error } = useRecipes();
  const recipes = suppliedRecipes || allRecipes;
  const [selectedId, setSelectedId] = useState(null);
  const selected = recipes.find((recipe) => recipe.id === selectedId) || recipes[0];
  function recoverImage(event) {
    if (event.currentTarget.getAttribute("src") !== FALLBACK_IMAGE)
      event.currentTarget.src = FALLBACK_IMAGE;
  }
  return (
    <>
      {loading && (
        <EditorialState
          kind="loading"
          eyebrow="De la cocina a tu mesa"
          title="Preparando el recetario."
        >
          <p>Estamos reuniendo las recetas para ti.</p>
        </EditorialState>
      )}
      {error && (
        <EditorialState
          kind="error"
          eyebrow="Una pequeña pausa"
          title="El recetario no pudo actualizarse."
        >
          <p>{error}</p>
        </EditorialState>
      )}
      <section
        className={style.wrapper + (featured ? " " + style.featured : "")}
        aria-label={featured ? "Recetas destacadas" : "Lista de recetas"}
      >
        {recipes.map((recipe, index) => (
          <a
            className={style.item}
            key={recipe.id}
            href={"#" + modalId}
            onClick={() => setSelectedId(recipe.id)}
            aria-label={"Ver receta: " + recipe.name}
          >
            <div className={style.photo}>
              <img
                src={recipe.image || FALLBACK_IMAGE}
                alt={recipe.name}
                className={style.image}
                onError={recoverImage}
              />
              <span className={style.type}>
                {recipe.type === "Pasteleria" ? "Pastelería" : recipe.type}
              </span>
              <span className={style.cardArrow}>
                <UiIcon />
              </span>
            </div>
            <div className={style.content}>
              <span className={style.index}>
                RECETA / {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{recipe.name}</h3>
              <p>{recipe.description}</p>
              <span className={style.author}>{recipe.author}</span>
            </div>
          </a>
        ))}
        {!loading && !recipes.length && (
          <div className={style.empty}>
            <EditorialState
              eyebrow="Un lugar para tus ideas"
              title="La primera receta puede ser tuya."
            >
              <p>{emptyMessage}</p>
            </EditorialState>
          </div>
        )}
      </section>
      <RecipeDetail recipe={selected} modalId={modalId} recoverImage={recoverImage} />
    </>
  );
}
