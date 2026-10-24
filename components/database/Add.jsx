import { useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRecipes } from "./RecipesProvider";
import { CATEGORIES, MAX_IMAGE_BYTES, validateRecipe } from "../../lib/recipes.mjs";
import style from "../../styles/database/Add.module.scss";

const initialValues = {
  name: "",
  type: "",
  description: "",
  ingredients: "",
  howTo: "",
  video: "",
};

// En demo se guarda una imagen pequeña. Los vídeos son enlaces, no archivos pesados.
export default function Add({ onSaved }) {
  const { addRecipe, isDemo } = useRecipes();
  const [image, setImage] = useState("");
  const [fileError, setFileError] = useState("");
  const [fileLoading, setFileLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const imageInput = useRef(null);
  async function readImage(event) {
    setImage("");
    setFileError("");
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      setFileError("Elige una imagen JPEG, PNG, WebP o GIF.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setFileError("La imagen no puede superar 1 MB en la demo local.");
      return;
    }
    setFileLoading(true);
    try {
      const value = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
        reader.readAsDataURL(file);
      });
      setImage(value);
    } catch {
      setFileError("No se pudo leer la imagen. Prueba con otro archivo.");
    } finally {
      setFileLoading(false);
    }
  }
  if (!isDemo)
    return (
      <p className="notice">
        Esta recuperación permite consultar Firebase. Publicar en la nube requiere
        configurar un backend que autorice la identidad de Auth0 en Firebase; no se envían
        escrituras con la sesión del navegador.
      </p>
    );
  return (
    <section className={style.wrapper}>
      <p className={style.note}>
        Demo local. Tu receta se guardará solo en este navegador. Una imagen y un vídeo
        son opcionales.
      </p>
      <Formik
        initialValues={initialValues}
        validate={validateRecipe}
        onSubmit={async (values, helpers) => {
          setSubmitError("");
          try {
            addRecipe(values, image);
            helpers.resetForm();
            setImage("");
            onSaved?.();
          } catch (problem) {
            setSubmitError(problem.message);
          } finally {
            helpers.setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={style.item} noValidate>
            <label htmlFor="recipe-name">Nombre de la receta</label>
            <Field id="recipe-name" name="name" type="text" maxLength={100} required />
            <ErrorMessage name="name" component="p" className={style.error} />
            <label htmlFor="recipe-description">¿De qué se trata?</label>
            <Field
              id="recipe-description"
              name="description"
              as="textarea"
              maxLength={6000}
              required
            />
            <ErrorMessage name="description" component="p" className={style.error} />
            <label htmlFor="recipe-ingredients">Ingredientes</label>
            <Field
              id="recipe-ingredients"
              name="ingredients"
              as="textarea"
              maxLength={6000}
              required
            />
            <ErrorMessage name="ingredients" component="p" className={style.error} />
            <label htmlFor="recipe-howto">Paso a paso</label>
            <Field
              id="recipe-howto"
              name="howTo"
              as="textarea"
              maxLength={6000}
              required
            />
            <ErrorMessage name="howTo" component="p" className={style.error} />
            <label htmlFor="recipe-type">Categoría</label>
            <Field id="recipe-type" name="type" as="select" required>
              <option value="">Elige una categoría</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category === "Pasteleria" ? "Pastelería" : category}
                </option>
              ))}
            </Field>
            <ErrorMessage name="type" component="p" className={style.error} />
            <label htmlFor="recipe-image">Imagen (opcional, máximo 1 MB)</label>
            <input
              id="recipe-image"
              ref={imageInput}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={readImage}
              aria-describedby="image-note"
            />
            <p id="image-note" className={style.note}>
              Si no eliges una imagen, se usará la fotografía de portada del proyecto.
            </p>
            {fileLoading ? <p role="status">Leyendo imagen...</p> : null}
            {fileError ? (
              <p className={style.error} role="alert">
                {fileError}
              </p>
            ) : null}
            {image ? (
              <img
                src={image}
                alt="Vista previa de tu receta"
                className={style.preview}
              />
            ) : null}
            {image || fileError ? (
              <button
                type="button"
                onClick={() => {
                  setImage("");
                  setFileError("");
                  if (imageInput.current) imageInput.current.value = "";
                }}
              >
                Quitar imagen y usar portada
              </button>
            ) : null}
            <label htmlFor="recipe-video">Enlace a un vídeo (opcional, MP4 o WebM)</label>
            <Field id="recipe-video" name="video" type="url" placeholder="https://..." />
            <ErrorMessage name="video" component="p" className={style.error} />
            {submitError ? (
              <p className={style.error} role="alert">
                {submitError}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={isSubmitting || fileLoading || Boolean(fileError)}
            >
              {isSubmitting ? "Guardando..." : "Guardar receta en este navegador"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
