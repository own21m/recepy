import Head from "next/head";
import Link from "next/link";
import { useRecipes } from "./RecipesProvider";
import RecipeGrid from "../content/RecipeGrid";
import Footer from "../content/Footer";
import style from "../../styles/content/Main.module.scss";

// Las categorías comparten datos y ofrecen una salida visible al lobby.
export default function GetType({ type, label = type }) {
  const { recipes, loading, error, isDemo } = useRecipes();
  return (
    <>
      <Head>
        <title>{label} · Recepy</title>
      </Head>
      <main className={style.content}>
        <nav className={style.navbar}>
          <Link href="/home/lobby" className={style.brand}>
            Recepy
          </Link>
          <Link href="/home/lobby" className={style.textLink}>
            Volver al inicio
          </Link>
        </nav>
        <div className={style.heading}>
          <p className={style.eyebrow}>RECETAS POR CATEGORÍA</p>
          <h1>{label}</h1>
          <p>
            {isDemo
              ? "Ejemplos y recetas que has guardado en este navegador."
              : "Recetas de tu proyecto Firebase."}
          </p>
        </div>
        {loading ? (
          <p className="empty-state" role="status">
            Cargando recetas...
          </p>
        ) : null}
        {error ? (
          <p className="notice" role="alert">
            {error}
          </p>
        ) : null}
        <RecipeGrid recipes={recipes.filter((recipe) => recipe.type === type)} />
      </main>
      <Footer />
    </>
  );
}
