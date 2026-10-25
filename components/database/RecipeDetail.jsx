import UiIcon from "../content/UiIcon";
import { FALLBACK_IMAGE, isVideoUrl } from "../../lib/recipes.mjs";
import style from "../../styles/content/modalRecipe.module.scss";
export default function RecipeDetail({ recipe, modalId, recoverImage }) {
  return (
    <div
      id={modalId}
      className={style.modalOpen}
      role="dialog"
      aria-label="Detalle de la receta"
    >
      <div className={style.panel}>
        <a className={style.close} href="#" aria-label="Cerrar receta">
          <UiIcon kind="close" />
        </a>
        {recipe ? (
          <article>
            <p className={style.eyebrow}>
              {recipe.type === "Pasteleria" ? "Pastelería" : recipe.type} / EL RECETARIO
            </p>
            <h2>{recipe.name}</h2>
            <p className={style.byline}>Por {recipe.author}</p>
            {recipe.video && isVideoUrl(recipe.video) ? (
              <video
                src={recipe.video}
                controls
                preload="none"
                className={style.video}
                title={"Video de " + recipe.name}
              />
            ) : (
              <img
                src={recipe.image || FALLBACK_IMAGE}
                alt={recipe.name}
                className={style.video}
                onError={recoverImage}
              />
            )}
            <p className={style.description}>{recipe.description}</p>
            <div className={style.instructions}>
              <section>
                <h3>En la despensa.</h3>
                <ul>
                  {(recipe.ingredients || "")
                    .split("\n")
                    .filter(Boolean)
                    .map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                </ul>
              </section>
              <section>
                <h3>Manos a la cocina.</h3>
                <ol>
                  {(recipe.howTo || "")
                    .split("\n")
                    .filter(Boolean)
                    .map((step, index) => (
                      <li key={index}>{step.replace(/^\d+[.)]\s*/, "")}</li>
                    ))}
                </ol>
              </section>
            </div>
          </article>
        ) : (
          <p>Elige una receta para descubrirla.</p>
        )}
      </div>
    </div>
  );
}
