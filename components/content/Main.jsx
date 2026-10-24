import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "../auth/Session";
import { useRecipes } from "../database/RecipesProvider";
import Get from "../database/Get";
import Special from "../database/Special";
import Add from "../database/Add";
import LogoutButton from "../auth/Logout";
import Footer from "./Footer";
import Modal from "./Modal";
import style from "../../styles/content/Main.module.scss";

// Iconos vectoriales propios, independientes de fuentes de emoji del sistema.
function CategoryIcon({ kind }) {
  const paths = {
    cake: <path d="M5 11h14v9H5zM4 16h16M8 11V7m4 4V6m4 5V7M7 7h2m2-1h2m2 1h2" />,
    plant: (
      <path d="M12 21V11M12 15C5 15 3 11 3 5c6 0 9 3 9 8M12 12c0-6 3-9 9-9 0 6-3 9-9 9" />
    ),
    grill: <path d="M4 9h16a8 8 0 0 1-16 0ZM8 17l-3 5m11-5 3 5M8 6V2m4 4V1m4 5V2" />,
    book: (
      <path d="M4 4h7a3 3 0 0 1 3 3v14a4 4 0 0 0-4-3H4zM14 7a3 3 0 0 1 3-3h3v14h-3a4 4 0 0 0-3 3" />
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[kind]}
    </svg>
  );
}
const categories = [
  ["pasteleria", "Pastelería", "cake"],
  ["vegetariano", "Vegetariano", "plant"],
  ["parrilla", "Parrilla", "grill"],
  ["otro", "Otras recetas", "book"],
];

export default function Main() {
  const { user } = useSession();
  const { isDemo, loading, error, clearLocalRecipes } = useRecipes();
  const [modal, setModal] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [profileError, setProfileError] = useState("");
  function clearDemo() {
    try {
      clearLocalRecipes();
      setFeedback("Se eliminaron tus recetas locales. Los ejemplos siguen disponibles.");
      setModal(null);
    } catch {
      setProfileError("El navegador no permitió limpiar el almacenamiento local.");
    }
  }
  return (
    <>
      <Head>
        <title>Principal · Recepy</title>
        <meta
          name="description"
          content="Explora recetas, descubre categorías y comparte tus preparaciones en Recepy."
        />
      </Head>
      <main className={style.content}>
        <nav className={style.navbar} aria-label="Navegación principal">
          <Link href="/" className={style.brand}>
            Recepy
          </Link>
          <div className={style.navActions}>
            <button
              type="button"
              className={style.primary}
              onClick={() => setModal("publish")}
            >
              + Agregar receta
            </button>
            <button
              type="button"
              className={style.profile}
              onClick={() => setModal("profile")}
              aria-label="Abrir mi perfil"
            >
              {user?.picture ? (
                <img src={user.picture} alt="" />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 22v-3a8 8 0 0 1 16 0v3" />
                </svg>
              )}
            </button>
          </div>
        </nav>
        <p className="notice">
          {isDemo
            ? "DEMOSTRACIÓN LOCAL · Las recetas de ejemplo no pertenecen a la base de datos histórica. Lo que publiques se guarda solo en este navegador."
            : "MODO FIREBASE · Consulta de recetas en la nube. La publicación está deshabilitada hasta configurar la autorización del backend."}
        </p>
        {feedback ? (
          <p className="notice" role="status">
            {feedback}
          </p>
        ) : null}
        {error ? (
          <p className="notice" role="alert">
            {error}
          </p>
        ) : null}
        {loading ? (
          <p className="empty-state" role="status">
            Cargando recetas...
          </p>
        ) : null}
        <header className={style.heading}>
          <p className={style.eyebrow}>BIENVENIDO A TU COCINA</p>
          <h1>Recetas destacadas</h1>
          <p>
            Una selección de tres recetas, ordenadas por nombre, para empezar a explorar.
          </p>
        </header>
        <Special />
        <div className={style.heading}>
          <p className={style.eyebrow}>ENCUENTRA TU INSPIRACIÓN</p>
          <h2>Tipos de recetas</h2>
          <p>Elige una categoría y descubre qué puedes preparar.</p>
        </div>
        <section className={style.wrapper} aria-label="Categorías de recetas">
          {categories.map(([path, label, icon]) => (
            <Link href={"/home/" + path} className={style.category} key={path}>
              <CategoryIcon kind={icon} />
              <span>{label}</span>
            </Link>
          ))}
        </section>
        <div className={style.heading}>
          <p className={style.eyebrow}>ALGO BUENO SE ESTÁ COCINANDO</p>
          <h2>Explora recetas</h2>
          <p>Todas las preparaciones, en un solo lugar.</p>
        </div>
        <Get />
      </main>
      <Footer />
      <Modal
        open={modal === "publish"}
        title="Comparte tu receta"
        onClose={() => setModal(null)}
      >
        <Add
          onSaved={() => {
            setModal(null);
            setFeedback(
              "Receta guardada en este navegador. Ya aparece en Explora recetas y en su categoría.",
            );
          }}
        />
      </Modal>
      <Modal open={modal === "profile"} title="Tu perfil" onClose={() => setModal(null)}>
        <section className={style.profilePanel}>
          <h3>{user?.name || "Visitante"}</h3>
          <p>{user?.email}</p>
          {isDemo ? (
            <>
              <p>
                Este es un perfil de demostración. No se creó una cuenta ni se enviaron
                tus datos a un servidor.
              </p>
              <button onClick={clearDemo} className={style.secondary}>
                Eliminar mis recetas locales
              </button>
            </>
          ) : null}
          {profileError ? <p role="alert">{profileError}</p> : null}
          <LogoutButton />
        </section>
      </Modal>
    </>
  );
}
