//Pagina de llegada del usuario.

//Importaciones de componentes para iniciar la autenticacion.
import LoginButton from "../components/auth/Login";
import Footer from "../components/content/Footer";
import style from "../styles/content/Index.module.scss";

//Componente padre para redirigir a Auth0 y mostrar contenido de recepy.
const Index = () => {
  return (
    <>
      <div>
        <div className={style.wall}>
          <h1>Recepy</h1>
          <LoginButton />
          <small style={{ color: "white", padding: "16px", textAlign: "center" }}>
            Vista original con datos de prueba. No requiere una cuenta de Google.
          </small>
        </div>
        <Footer />
      </div>
    </>
  );
};

//Exportacion del componente Index
export default Index;
