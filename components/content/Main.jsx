import Head from "next/head";
import Link from "next/link";
import { useSession } from "../auth/Session";
import AppHeader from "./AppHeader";
import CategoryIcon from "./CategoryIcon";
import UiIcon from "./UiIcon";
import Special from "../database/Special";
import Get from "../database/Get";
import Add from "../database/Add";
import Footer from "./Footer";
import LogoutButton from "../auth/Logout";
import style from "../../styles/content/Editorial.module.scss";

const categories = [
  ["pasteleria", "cake", "Pastelería"],
  ["vegetariano", "plant", "Vegetariano"],
  ["parrilla", "grill", "Parrilla"],
  ["otro", "book", "Otras ideas"],
];
export default function Main() {
  const { user } = useSession();
  return (
    <>
      <Head>
        <title>El recetario — Recepy</title>
        <meta
          name="description"
          content="Recetas para inspirarte, cocinar y compartir."
        />
      </Head>
      <AppHeader />
      <main className={style.content}>
        <section className={style.pageIntro}>
          <div>
            <p className={style.eyebrow}>Bienvenido a tu mesa digital</p>
            <h1>
              ¿Qué vamos a<br />
              <em>cocinar hoy?</em>
            </h1>
          </div>
          <p>
            Las recetas se vuelven mejores cuando las compartimos. Aquí hay ideas para
            empezar y un lugar para guardar las tuyas.
          </p>
        </section>
        <div className={style.sectionTitle}>
          <h2>Para abrir el apetito.</h2>
          <p>Tres recetas de ejemplo para descubrir el recetario.</p>
        </div>
        <Special />
        <div className={style.sectionHeading}>
          <h2>Una cocina, muchas posibilidades.</h2>
          <p>Elige una categoría y sigue tu curiosidad.</p>
        </div>
        <nav className={style.categories} aria-label="Categorías de recetas">
          {categories.map(([slug, icon, label]) => (
            <Link className={style.category} href={"/home/" + slug} key={slug}>
              <CategoryIcon kind={icon} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className={style.sectionHeading}>
          <h2>Todo el recetario.</h2>
          <a className={style.profileLink} href="#open-modal4">
            <img src={user.picture} alt="" />
            Mi perfil
          </a>
        </div>
        <Get />
        <aside className={style.quote}>
          <p>
            Las recetas favoritas no siempre están en un libro. A veces, están en alguien.
          </p>
          <a href="#open-modal">
            Comparte una receta <UiIcon />
          </a>
        </aside>
        <div
          id="open-modal"
          className={style.modalOpen}
          role="dialog"
          aria-label="Compartir una receta"
        >
          <div className={style.modalPanel}>
            <a className={style.close} href="#" aria-label="Cerrar formulario">
              <UiIcon kind="close" />
            </a>
            <p className={style.eyebrow}>De tu cocina al recetario</p>
            <h2>Una idea para compartir.</h2>
            <Add />
          </div>
        </div>
        <div
          id="open-modal4"
          className={style.modalOpen}
          role="dialog"
          aria-label="Mi perfil"
        >
          <div className={style.modalPanel + " " + style.profilePanel}>
            <a className={style.close} href="#" aria-label="Cerrar perfil">
              <UiIcon kind="close" />
            </a>
            <img src={user.picture} alt="Perfil de demostración" />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <Link href="/home/mis-recetas">Ver mis recetas</Link>
            <LogoutButton />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
