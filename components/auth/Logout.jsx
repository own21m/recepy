import Link from "next/link";
import { useSession } from "./Session";
import style from "../../styles/auth/Logout.module.scss";

// Auth0 utiliza logoutParams; la demo solo vuelve a la portada.
export default function LogoutButton() {
  const session = useSession();
  if (session.isDemo)
    return (
      <Link href="/" className={style.button}>
        Volver a la portada
      </Link>
    );
  return (
    <button
      className={style.button}
      onClick={() =>
        session.logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Cerrar sesión
    </button>
  );
}
