import { useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRecipes } from "./RecipesProvider";
import { CATEGORIES, MAX_IMAGE_BYTES, validateRecipe } from "../../lib/recipes.mjs";
import style from "../../styles/database/Add.module.scss";

// Se recuperan el orden, los controles y las clases del formulario de 2021.
// En la demo las recetas se guardan en este navegador, sin subir archivos a Firebase.
export default function Add({ onSaved }) {
  const { addRecipe, isDemo } = useRecipes();
  const [image, setImage] = useState("");
  const [fileError, setFileError] = useState("");
  const [fileLoading, setFileLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const input = useRef(null);
  const readVersion = useRef(0);

  // Una miniatura pequeña mantiene la demostración dentro de la cuota del navegador.
  async function fileStore(event) {
    const version = ++readVersion.current;
    const file = event.target.files?.[0];
    setImage("");
    setFileError("");
    setFileLoading(false);
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
      const result = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
        reader.readAsDataURL(file);
      });
      if (version === readVersion.current) setImage(result);
    } catch {
      if (version === readVersion.current) setFileError("No se pudo leer la imagen.");
    } finally {
      if (version === readVersion.current) setFileLoading(false);
    }
  }

  if (!isDemo) {
    return (
      <p>
        La publicación en la nube requiere configurar un backend que autorice Firebase.
        Esta recuperación permite consultar recetas y crear ejemplos locales.
      </p>
    );
  }

  return (
    <section className={style.wrapper}>
      <p>
        Demostración local: las recetas se guardan solo en este navegador. La miniatura y
        el vídeo son opcionales.
      </p>
      <Formik
        initialValues={{
          name: "",
          type: "",
          description: "",
          howTo: "",
          ingredients: "",
          video: "",
        }}
        validate={validateRecipe}
        onSubmit={async (values, helpers) => {
          setSubmitError("");
          try {
            addRecipe(values, image);
            helpers.resetForm();
            setImage("");
            if (input.current) input.current.value = "";
            window.location.hash = "";
            onSaved?.();
          } catch (problem) {
            setSubmitError(problem.message);
          } finally {
            helpers.setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={style.item} noValidate>
            <label htmlFor="recipe-name">Nombra tu receta</label>
            <Field
              id="recipe-name"
              name="name"
              type="text"
              className={style.effect}
              maxLength={100}
              required
              aria-describedby="recipe-name-error"
              aria-invalid={Boolean(errors.name && touched.name)}
            />
            <ErrorMessage
              name="name"
              component="p"
              id="recipe-name-error"
              className={style.validation}
              role="alert"
            />

            <label htmlFor="recipe-description">¿De qué se trata tu receta?</label>
            <Field
              id="recipe-description"
              name="description"
              as="textarea"
              maxLength={6000}
              required
              aria-describedby="recipe-description-error"
              aria-invalid={Boolean(errors.description && touched.description)}
            />
            <ErrorMessage
              name="description"
              component="p"
              id="recipe-description-error"
              className={style.validation}
              role="alert"
            />

            <label htmlFor="recipe-howto">¿Cómo se hace tu receta?</label>
            <Field
              id="recipe-howto"
              name="howTo"
              as="textarea"
              maxLength={6000}
              required
              aria-describedby="recipe-howto-error"
              aria-invalid={Boolean(errors.howTo && touched.howTo)}
            />
            <ErrorMessage
              name="howTo"
              component="p"
              id="recipe-howto-error"
              className={style.validation}
              role="alert"
            />

            <label htmlFor="recipe-ingredients">¿Qué ingredientes tiene tu receta?</label>
            <Field
              id="recipe-ingredients"
              name="ingredients"
              as="textarea"
              maxLength={6000}
              required
              aria-describedby="recipe-ingredients-error"
              aria-invalid={Boolean(errors.ingredients && touched.ingredients)}
            />
            <ErrorMessage
              name="ingredients"
              component="p"
              id="recipe-ingredients-error"
              className={style.validation}
              role="alert"
            />

            <label htmlFor="recipe-image">Selecciona una miniatura para tu receta</label>
            <input
              id="recipe-image"
              ref={input}
              name="file"
              type="file"
              onChange={fileStore}
              accept="image/jpeg,image/png,image/webp,image/gif"
              className={style.effect}
              aria-describedby={
                fileError ? "recipe-image-note recipe-image-error" : "recipe-image-note"
              }
              aria-invalid={Boolean(fileError)}
            />
            <p id="recipe-image-note">
              Opcional, máximo 1 MB. Si no eliges una imagen, se usará la fotografía de
              portada.
            </p>
            {fileLoading ? <p role="status">Leyendo imagen...</p> : null}
            {fileError ? (
              <p id="recipe-image-error" role="alert" className={style.validation}>
                {fileError}
              </p>
            ) : null}
            {image || fileError ? (
              <button
                type="button"
                className={style.effect}
                onClick={() => {
                  readVersion.current += 1;
                  setImage("");
                  setFileError("");
                  setFileLoading(false);
                  if (input.current) input.current.value = "";
                }}
              >
                Quitar imagen y usar portada
              </button>
            ) : null}

            <label htmlFor="recipe-video">Enlace a un vídeo para tu receta</label>
            <Field
              id="recipe-video"
              name="video"
              type="url"
              className={style.effect}
              placeholder="https://..."
              aria-describedby="recipe-video-error"
              aria-invalid={Boolean(errors.video && touched.video)}
            />
            <p>
              Vídeo opcional en formato MP4 o WebM; la demo no sube archivos de vídeo.
            </p>
            <ErrorMessage
              name="video"
              component="p"
              id="recipe-video-error"
              className={style.validation}
              role="alert"
            />

            <label htmlFor="recipe-type">¿De qué tipo es tu receta?</label>
            <Field
              id="recipe-type"
              name="type"
              as="select"
              required
              className={style.effect}
              aria-describedby="recipe-type-error"
              aria-invalid={Boolean(errors.type && touched.type)}
            >
              <option value="">Elige el tipo de tu receta</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category === "Pasteleria" ? "Pastelería" : category}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="type"
              component="p"
              id="recipe-type-error"
              className={style.validation}
              role="alert"
            />
            {submitError ? <p role="alert">{submitError}</p> : null}
            <button
              type="submit"
              className={style.effect}
              disabled={isSubmitting || fileLoading || Boolean(fileError)}
            >
              {isSubmitting ? "Guardando..." : "Guardar receta"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
