import "../styles/global/style.scss";
import { SessionProvider } from "../components/auth/Session";
import { RecipesProvider } from "../components/database/RecipesProvider";
import Head from "next/head";

// Estado compartido de sesión y recetas para todas las páginas de Next.js.
export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <RecipesProvider>
        <Head>
          <link
            rel="preload"
            href="/fonts/italianno/Italianno-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          {/* El import remoto histórico queda detrás de otras reglas al compilar.
              Registrar la misma fuente local mantiene la tipografía original. */}
          <style key="italianno-local">{`@font-face {
            font-family: 'Italianno';
            src: url('/fonts/italianno/Italianno-Regular.ttf') format('truetype');
            font-style: normal;
            font-weight: 400;
            font-display: swap;
          }`}</style>
        </Head>
        <Component {...pageProps} />
      </RecipesProvider>
    </SessionProvider>
  );
}
