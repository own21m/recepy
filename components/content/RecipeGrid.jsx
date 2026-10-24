import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Modal from "./Modal";
import { FALLBACK_IMAGE, isVideoUrl } from "../../lib/recipes.mjs";
import style from "../../styles/database/Get.module.scss";

// Un respaldo que también falta no debe provocar un bucle de peticiones fallidas.
function recoverImage(event) {
  if (event.currentTarget.getAttribute("src") !== FALLBACK_IMAGE) {
    event.currentTarget.src = FALLBACK_IMAGE;
  }
}

// Las listas vacías no intentan acceder a recipes[0], que rompía las páginas originales.
export default function RecipeGrid({ recipes, featured = false }) {
  const [selected, setSelected] = useState(null);
  const reduceMotion = useReducedMotion();
  if (!recipes.length)
    return <p className="empty-state">Todavía no hay recetas en esta categoría.</p>;
  return (
    <>
      <section
        className={featured ? style.featured : style.wrapper}
        aria-label={featured ? "Recetas destacadas" : "Lista de recetas"}
      >
        {recipes.map((recipe, index) => (
          <motion.button
            key={recipe.id}
            className={style.item}
            onClick={() => setSelected(recipe)}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(index * 0.06, 0.3) }}
            aria-label={"Ver receta: " + recipe.name}
          >
            <img
              src={recipe.image || FALLBACK_IMAGE}
              alt={recipe.name}
              className={style.image}
              loading="lazy"
              onError={recoverImage}
            />
            <span className={style.content}>
              <span className={style.type}>{recipe.type}</span>
              <strong>{recipe.name}</strong>
              <span>{recipe.author || "Autor sin nombre"}</span>
              {featured ? (
                <span className={style.description}>{recipe.description}</span>
              ) : null}
              {recipe.localOnly ? <small>Guardada en este navegador</small> : null}
            </span>
          </motion.button>
        ))}
      </section>
      <Modal
        open={Boolean(selected)}
        title={selected?.name || "Receta"}
        onClose={() => setSelected(null)}
      >
        {selected ? (
          <article className={style.detail}>
            <img
              src={selected.image || FALLBACK_IMAGE}
              alt={selected.name}
              onError={recoverImage}
            />
            <p className={style.type}>
              {selected.type} · {selected.author || "Autor sin nombre"}
            </p>
            <h3>Descripción</h3>
            <p>{selected.description}</p>
            <h3>Ingredientes</h3>
            <p>{selected.ingredients}</p>
            <h3>Paso a paso</h3>
            <p>{selected.howTo}</p>
            {selected.video && isVideoUrl(selected.video) ? (
              <>
                <h3>Vídeo de la receta</h3>
                <video
                  controls
                  preload="none"
                  src={selected.video}
                  aria-label={"Vídeo de " + selected.name}
                />
                <a href={selected.video} target="_blank" rel="noreferrer">
                  Abrir el vídeo en otra pestaña
                </a>
              </>
            ) : (
              <p className={style.note}>Esta receta no incluye vídeo.</p>
            )}
          </article>
        ) : null}
      </Modal>
    </>
  );
}
