import Link from "next/link";
import UiIcon from "./UiIcon";
import style from "../../styles/content/Editorial.module.scss";

export default function AppHeader({ landing = false }) {
  return (
    <header className={style.header}>
      <Link
        className={style.brand}
        href={landing ? "/" : "/home/lobby"}
        aria-label="Recepy, inicio"
      >
        Recepy<span>EL GUSTO DE COMPARTIR</span>
      </Link>
      <nav aria-label="Navegación de Recepy">
        <Link href="/home/lobby">Recetario</Link>
        {!landing && <Link href="/home/mis-recetas">Mis recetas</Link>}
        <span className={style.headerNote}>Hecho para cocinar juntos.</span>
      </nav>
      {!landing && (
        <Link
          className={style.shareButton}
          href="/home/lobby#open-modal"
          aria-label="Compartir receta"
        >
          <UiIcon kind="plus" />
          <span>Compartir receta</span>
        </Link>
      )}
    </header>
  );
}
