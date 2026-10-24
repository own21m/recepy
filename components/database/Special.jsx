import { useState } from "react";
import { motion } from "framer-motion";
import { useRecipes } from "./RecipesProvider";
import { FALLBACK_IMAGE, isVideoUrl } from "../../lib/recipes.mjs";
import style from "../../styles/content/Main.module.scss";
import styleModal from "../../styles/content/modalRecipe.module.scss";

// Carrusel destacado original: imágenes grandes, degradado negro y texto al pie.
// El criterio histórico selecciona tres recetas por nombre, sin ranking de popularidad.
export default function Special() {
  const { recipes: allRecipes, loading } = useRecipes();
  const recipes = [...allRecipes]
    .sort((a, b) => a.name.localeCompare(b.name, "es"))
    .slice(0, 3);
  const [selectedId, setSelectedId] = useState(null);
  const selected = recipes.find((recipe) => recipe.id === selectedId) || recipes[0];

  function recoverImage(event) {
    if (event.currentTarget.getAttribute("src") !== FALLBACK_IMAGE) {
      event.currentTarget.src = FALLBACK_IMAGE;
    }
  }

  return (
    <>
      <section className={style.special} aria-label="Recetas destacadas">
        {recipes.map((recipe) => (
          <motion.a
            href="#open-modal3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.4, duration: 0 }}
            onClick={() => setSelectedId(recipe.id)}
            key={recipe.id}
            aria-label={"Ver receta destacada: " + recipe.name}
            style={{
              background: `linear-gradient(to bottom, transparent, rgb(0, 0, 0)), url(${recipe.image || FALLBACK_IMAGE})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h1 className={style.title}>{recipe.name}</h1>
            <p className={style.text}>{recipe.description}</p>
          </motion.a>
        ))}
        {!loading && !recipes.length ? (
          <p className={style.text}>No hay recetas destacadas.</p>
        ) : null}
      </section>
      <div
        id="open-modal3"
        className={styleModal.modalOpen}
        role="dialog"
        aria-label="Detalle de la receta destacada"
      >
        <div>
          <a href="#" title="Cerrar" aria-label="Cerrar receta destacada">
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
