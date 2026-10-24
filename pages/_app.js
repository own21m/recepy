import "../styles/global/style.scss";
import { SessionProvider } from "../components/auth/Session";
import { RecipesProvider } from "../components/database/RecipesProvider";

// Estado compartido de sesión y recetas para todas las páginas de Next.js.
export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <RecipesProvider>
        <Component {...pageProps} />
      </RecipesProvider>
    </SessionProvider>
  );
}
