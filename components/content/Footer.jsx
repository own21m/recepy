import style from "../../styles/content/Footer.module.scss";

// Reconocimiento del origen estudiantil y de los tres autores originales.
export default function Footer() {
  return (
    <footer className={style.wrapper}>
      <p className={style.text}>
        Recepy nació como un proyecto de estudiantes del Cefit: un espacio para aprender
        interfaces, autenticación, bases de datos y cocina compartida.
      </p>
      <p className={style.text}>
        Proyecto original de Juan Pablo Gutiérrez Gutiérrez, Esteban Pérez Garzón y
        Cristian David Ramírez Vargas.
      </p>
      <section className={style.images} aria-label="Instituciones del proyecto original">
        <img src="/sena.png" alt="SENA" width="80" height="80" />
        <img src="/cefit.png" alt="Cefit" width="120" height="80" />
      </section>
    </footer>
  );
}
