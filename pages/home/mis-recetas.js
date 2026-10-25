import Link from "next/link";
import Head from "next/head";
import GetUser from "../../components/database/GetUser";
import Footer from "../../components/content/Footer";
import style from "../../styles/content/Editorial.module.scss";
import AppHeader from "../../components/content/AppHeader";
import buttonStyle from "../../styles/auth/Login.module.scss";
import { useState } from "react";
import { useRecipes } from "../../components/database/RecipesProvider";

// Esta ruta de la recuperación permite consultar las recetas locales propias;
// no se atribuye a un componente perdido del proyecto original.
export default function MyRecipes() {
  const { clearLocalRecipes, isDemo } = useRecipes();
  const [error, setError] = useState("");
  return (
    <>
      <Head>
        <title>Mis recetas - Recepy</title>
      </Head>
      <AppHeader />
      <main className={style.content}>
        <section className={style.pageIntro}>
          <div>
            <p className={style.eyebrow}>Tus ideas, tu recetario</p>
            <h1>
              De tu cocina
              <br />
              <em>para compartir.</em>
            </h1>
          </div>
          <p>
            Recetas que has creado en este navegador. Guárdalas aquí para volver a ellas.
          </p>
        </section>
        <GetUser />
        {isDemo ? (
          <button
            type="button"
            className={buttonStyle.button}
            style={{ margin: "auto" }}
            onClick={() => {
              try {
                clearLocalRecipes();
                setError("");
              } catch {
                setError("El navegador no permitió eliminar las recetas de prueba.");
              }
            }}
          >
            Borrar recetas de prueba
          </button>
        ) : null}
        {error ? (
          <p role="alert" className={style.text}>
            {error}
          </p>
        ) : null}
        <Link href="/home/lobby" className={style.text}>
          Volver al inicio
        </Link>
      </main>
      <Footer />
    </>
  );
}
