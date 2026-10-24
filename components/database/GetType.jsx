import { useState } from "react";
import { motion } from "framer-motion";
import { useRecipes } from "./RecipesProvider";
import { FALLBACK_IMAGE, isVideoUrl } from "../../lib/recipes.mjs";
import style from "../../styles/database/GetType.module.scss";
import styleModal from "../../styles/content/modalRecipe.module.scss";

// La categoría conserva la cuadrícula de fotografías y la aparición escalonada de 2021.
export default function GetType({ type }) {
  const { recipes: allRecipes, loading, error } = useRecipes();
  const recipes = allRecipes.filter((recipe) => recipe.type === type);
  const [selectedId, setSelectedId] = useState(null);
  const selected = recipes.find((recipe) => recipe.id === selectedId) || recipes[0];

  function recoverImage(event) {
    if (event.currentTarget.getAttribute("src") !== FALLBACK_IMAGE) {
      event.currentTarget.src = FALLBACK_IMAGE;
    }
  }

  return (
    <>
      {loading ? (
        <p role="status" style={{ color: "rgb(150, 150, 150)" }}>
          Cargando recetas...
        </p>
      ) : null}
      {error ? (
        <p role="alert" style={{ color: "rgb(150, 150, 150)" }}>
          {error}
        </p>
      ) : null}
      <section className={style.wrapper} aria-label={"Recetas de " + type}>
        {recipes.map((recipe, index) => (
          <motion.a
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0, delay: Number("1." + index + 2) }}
            href="#open-modal"
            style={{ backgroundImage: `url(${recipe.image || FALLBACK_IMAGE})` }}
            key={recipe.id}
            onClick={() => setSelectedId(recipe.id)}
            title={recipe.name}
            aria-label={"Ver receta: " + recipe.name}
          />
        ))}
        {!loading && !recipes.length ? (
          <p style={{ color: "rgb(150, 150, 150)" }}>
            Todavía no hay recetas en esta categoría.
          </p>
        ) : null}
      </section>
      <div
        id="open-modal"
        className={styleModal.modalOpen}
        role="dialog"
        aria-label="Detalle de la receta"
      >
        <div>
          <a href="#" title="Cerrar" aria-label="Cerrar receta">
            X
          </a>
          {selected ? (
            <section>
              <h1>&quot;{selected.name}&quot;</h1>
              {selected.video && isVideoUrl(selected.video) ? (
                <video
                  src={selected.video}
                  controls
                  preload="none"
                  className={styleModal.video}
                  title={"Vídeo principal: " + selected.name}
                />
              ) : (
                <img
                  src={selected.image || FALLBACK_IMAGE}
                  alt={selected.name}
                  className={styleModal.video}
                  onError={recoverImage}
                />
              )}
              <h2>Descripción.</h2>
              <textarea
                aria-label="Descripción"
                value={selected.description || ""}
                readOnly
              />
              <h2>Ingredientes.</h2>
              <textarea
                aria-label="Ingredientes"
                value={selected.ingredients || ""}
                readOnly
              />
              <h2>Paso a paso.</h2>
              <textarea aria-label="Paso a paso" value={selected.howTo || ""} readOnly />
            </section>
          ) : (
            <p>No hay una receta seleccionada.</p>
          )}
        </div>
      </div>
    </>
  );
}
