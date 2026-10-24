import Link from "next/link";
import Head from "next/head";
import GetUser from "../../components/database/GetUser";
import Footer from "../../components/content/Footer";
import style from "../../styles/content/Main.module.scss";
import buttonStyle from "../../styles/auth/Login.module.scss";
import { useState } from "react";
import { useRecipes } from "../../components/database/RecipesProvider";

// La hoja GetUser existía en 2021. Esta ruta de prueba permite consultar las
// recetas locales propias usando esas tarjetas; no se atribuye a un componente perdido.
export default function MyRecipes() {
  const { clearLocalRecipes, isDemo } = useRecipes();
  const [error, setError] = useState("");
  return (
    <>
      <Head>
        <title>Mis recetas - Recepy</title>
      </Head>
      <main className={style.content}>
        <h1 className={style.title}>Mis recetas</h1>
        <p className={style.text}>Recetas que has creado en este navegador.</p>
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
