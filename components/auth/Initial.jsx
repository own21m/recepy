import Link from "next/link";
import { useSession } from "./Session";
import Main from "../content/Main";
import PageState from "../content/PageState";
import LoginButton from "./Login";

export default function Initial() {
  const session = useSession();
  if (session.isLoading)
    return (
      <PageState
        kind="loading"
        eyebrow="Preparando tu mesa"
        title="Ya casi está todo listo."
      >
        <p>Estamos abriendo tu recetario. Un momento y seguimos cocinando.</p>
      </PageState>
    );
  if (session.error)
    return (
      <PageState
        kind="error"
        eyebrow="Hagamos una pequeña pausa"
        title="No pudimos abrir tu recetario."
        action={
          <>
            <LoginButton>Volver a intentarlo</LoginButton>
            <Link href="/">Volver a la portada</Link>
          </>
        }
      >
        <p>
          La conexión no respondió como esperábamos. Puedes intentarlo de nuevo o volver a
          Recepy.
        </p>
      </PageState>
    );
  if (!session.isAuthenticated)
    return (
      <PageState
        eyebrow="Siempre hay un sitio para ti"
        title="Bienvenido a esta mesa."
        action={
          session.configured ? <LoginButton /> : <Link href="/">Volver a la portada</Link>
        }
      >
        <p>
          {session.configured
            ? "Abre tu recetario para descubrir y compartir buenas ideas."
            : "El acceso a este recetario no está disponible por ahora. Puedes seguir explorando la portada."}
        </p>
      </PageState>
    );
  return <Main />;
}
