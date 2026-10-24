import { useSession } from "./Session";
import Main from "../content/Main";
import LoginButton from "./Login";

// Se muestran estados explícitos de carga, error y sesión en lugar de una pantalla vacía.
export default function Initial() {
  const session = useSession();
  if (session.isLoading)
    return (
      <main className="status-page" role="status">
        Cargando tu sesión...
      </main>
    );
  if (session.error)
    return (
      <main className="status-page">
        <h1>No pudimos iniciar sesión</h1>
        <p>Revisa la configuración de Auth0 y vuelve a intentarlo.</p>
        <LoginButton />
      </main>
    );
  if (!session.isAuthenticated)
    return (
      <main className="status-page">
        <h1>Bienvenido a Recepy</h1>
        <LoginButton />
      </main>
    );
  return <Main />;
}
