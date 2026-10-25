import style from "../../styles/content/Editorial.module.scss";
export default function Footer() {
  return (
    <footer className={style.footer}>
      <div>
        <div className={style.footerBrand}>Recepy</div>
        <p>
          Una mesa abierta a nuevas ideas. Proyecto estudiantil nacido en 2021, recuperado
          para seguir explorando la cocina y el código.
        </p>
      </div>
      <div className={style.credits}>
        <strong>Creado en equipo</strong>
        <p>
          Juan Pablo Gutierrez Gutierrez · Esteban Perez Garzon · Cristian David Ramirez
          Vargas.
        </p>
        <p>
          Formación Cefit / SENA.{" "}
          <a href="mailto:proyectosena.programacion@gmail.com">Contacto del proyecto</a>
        </p>
      </div>
      <div className={style.schoolLogos}>
        <img src="/sena.png" alt="SENA" />
        <img src="/cefit.png" alt="Cefit" />
      </div>
    </footer>
  );
}
