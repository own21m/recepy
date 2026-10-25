import { useRouter } from "next/router";
import { useSession } from "./Session";
import { useState } from "react";
import style from "../../styles/auth/Login.module.scss";

// La demo no requiere registro ni accede al servicio de autenticación antiguo.
export default function LoginButton({ children = "Entrar a Recepy" }) {
  const session = useSession();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
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
        {children}
      </button>
    );
  if (!session.configured)
    return (
      <p role="status" className={style.feedback}>
        El acceso al recetario no está disponible por ahora.
      </p>
    );
  return (
    <>
      <button
        type="button"
        className={style.button}
        disabled={pending}
        aria-busy={pending}
        onClick={async () => {
          setPending(true);
          setError("");
          try {
            await session.loginWithRedirect();
          } catch {
            setError("No pudimos abrir el acceso. Vuelve a intentarlo en un momento.");
          } finally {
            setPending(false);
          }
        }}
      >
        {pending ? "Abriendo tu recetario..." : children}
      </button>
      {error ? (
        <p role="alert" className={style.feedback}>
          {error}
        </p>
      ) : null}
    </>
  );
}
