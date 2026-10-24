import Head from "next/head";
import LoginButton from "../components/auth/Login";
import Footer from "../components/content/Footer";
import { isDemoMode } from "../components/database/RecipesProvider";
import style from "../styles/content/Index.module.scss";

// Portada gastronómica con la marca roja del proyecto estudiantil original.
export default function Index() {
  return (
    <>
      <Head>
        <title>Recepy · Recetas para compartir</title>
        <meta
          name="description"
          content="Recepy, un proyecto estudiantil de recetas recuperado para explorar, aprender y compartir cocina."
        />
      </Head>
      <main className={style.wall}>
        <p className={style.eyebrow}>COCINA. COMPARTE. DESCUBRE.</p>
        <h1>Recepy</h1>
        <p className={style.intro}>Las buenas recetas saben mejor cuando se comparten.</p>
        <LoginButton />
        <p className={style.note}>
          {isDemoMode
            ? "Demo local: explora ejemplos y guarda tus propias recetas en este navegador, sin crear una cuenta."
            : "Modo conectado: las recetas se consultan desde tu proyecto Firebase."}
        </p>
      </main>
      <Footer />
    </>
  );
}
