import { useState } from "react";
import { motion } from "framer-motion";
import { useRecipes } from "./RecipesProvider";
import { FALLBACK_IMAGE, isVideoUrl } from "../../lib/recipes.mjs";
import style from "../../styles/database/Get.module.scss";
import styleModal from "../../styles/content/modalRecipe.module.scss";

// El catálogo conserva el carrusel, las tarjetas y el modal por :target de 2021.
// Solo cambia la fuente de datos: el proveedor puede entregar ejemplos locales.
export default function GeneralGet({
  recipes: suppliedRecipes,
  modalId = "open-modal2",
  cardStyle = style,
  emptyMessage = "Todavía no hay recetas para mostrar.",
}) {
  const { recipes: allRecipes, loading, error } = useRecipes();
  const recipes = suppliedRecipes || allRecipes;
  const [selectedId, setSelectedId] = useState(null);
  const selected = recipes.find((recipe) => recipe.id === selectedId) || recipes[0];

  // Un archivo de imagen ausente usa un recurso que sí pertenece al repositorio.
  function recoverImage(event) {
    if (event.currentTarget.getAttribute("src") !== FALLBACK_IMAGE) {
      event.currentTarget.src = FALLBACK_IMAGE;
    }
  }

  return (
    <div>
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
      <section className={cardStyle.wrapper} aria-label="Lista de recetas">
        {recipes.map((recipe) => (
          <motion.a
            className={cardStyle.item}
            key={recipe.id}
            href={"#" + modalId}
            onClick={() => setSelectedId(recipe.id)}
            aria-label={"Ver receta: " + recipe.name}
          >
            <img
              src={recipe.image || FALLBACK_IMAGE}
              alt={recipe.name}
              className={cardStyle.image}
              onError={recoverImage}
            />
            <div className={cardStyle.content}>
              <h1 title={recipe.name}>{recipe.name}</h1>
              <h3 title={recipe.author}>{recipe.author}</h3>
              <h3 title={recipe.type}>{recipe.type}</h3>
            </div>
          </motion.a>
        ))}
        {!loading && !recipes.length ? <p>{emptyMessage}</p> : null}
      </section>
      <div
        id={modalId}
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
    </div>
  );
}
