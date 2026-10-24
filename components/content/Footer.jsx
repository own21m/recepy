// Pie de página recuperado del proyecto de 2021, con su estructura y estilos.
import style from "../../styles/content/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={style.wrapper}>
      <p className={style.text}>
        Recepy nacio como un proyecto de estudiantes, en esta aplicacion hemos practicado
        conceptos como la interfaz del usuario, servidor, autenticacion, base de datos
        entre muchas otras cosas, aunque paresca una aplicacion pequeña, es una aplicacion
        que ha llevado mucho trabajo hacer y si has notado un mal funcionamiento en ella,
        una caracteristica que se pueda mejorar o algo mas para agregar puedes
        informarnolo al correo :
        <br />
        <a href="https://mail.google.com/mail/u/0/#inbox" className={style.text}>
          proyectosena.programacion@gmail.com
        </a>
      </p>
      <section className={style.images}>
        <div>
          <img src="/sena.png" alt="SENA" />
        </div>
        <div>
          <img src="/cefit.png" alt="Cefit" />
        </div>
      </section>
    </footer>
  );
};

export default Footer;
