import Link from "next/link";
import { useSession } from "./Session";
import style from "../../styles/auth/Login.module.scss";

// La demo no requiere registro ni accede al servicio de autenticación antiguo.
export default function LoginButton() {
  const session = useSession();
  if (session.isDemo)
    return (
      <Link href="/home/lobby" className={style.button}>
        Explorar la demo
      </Link>
    );
  if (!session.configured)
    return (
      <p role="status">Configura Auth0 para iniciar sesión o vuelve al modo demo.</p>
    );
  if (session.isAuthenticated)
    return (
      <Link href="/home/lobby" className={style.button}>
        Entrar a Recepy
      </Link>
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
      Iniciar sesión
    </button>
  );
}
