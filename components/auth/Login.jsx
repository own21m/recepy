import { useRouter } from "next/router";
import { useSession } from "./Session";
import style from "../../styles/auth/Login.module.scss";

// La demo no requiere registro ni accede al servicio de autenticación antiguo.
export default function LoginButton() {
  const session = useSession();
  const router = useRouter();
  if (session.isDemo || session.isAuthenticated)
    return (
      <button
        type="button"
        className={style.button}
        title={
          session.isDemo ? "Entrar con datos de prueba, sin Google" : "Entrar a Recepy"
        }
        onClick={() => router.push("/home/lobby")}
      >
        Log In
      </button>
    );
  if (!session.configured)
    return (
      <p role="status">Configura Auth0 para iniciar sesión o vuelve al modo demo.</p>
    );
  return (
    <button
      className={style.button}
      onClick={() =>
        session
          .loginWithRedirect()
          .catch(() => window.alert("No se pudo iniciar la conexión con Auth0."))
      }
    >
      Log In
    </button>
  );
}
