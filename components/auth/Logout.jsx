import { useRouter } from "next/router";
import { useSession } from "./Session";
import style from "../../styles/auth/Logout.module.scss";

// Auth0 utiliza logoutParams; la demo solo vuelve a la portada.
export default function LogoutButton() {
  const session = useSession();
  const router = useRouter();
  if (session.isDemo)
    return (
      <button
        type="button"
        className={style.button}
        onClick={() => router.push("/")}
        title="Volver a la portada de prueba"
      >
        Volver a la portada
      </button>
    );
  return (
    <button
      className={style.button}
      onClick={() =>
        session.logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Volver a la portada
    </button>
  );
}
