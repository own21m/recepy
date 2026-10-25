import Head from "next/head";
import Link from "next/link";
import PageState from "../components/content/PageState";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Esta receta tomó otro camino — Recepy</title>
      </Head>
      <PageState
        eyebrow="404 / Fuera del recetario"
        title="Esta receta tomó otro camino."
        action={
          <>
            <Link href="/home/lobby">Explorar el recetario</Link>
            <Link href="/">Volver a la portada</Link>
          </>
        }
      >
        <p>
          No encontramos esta página. Todavía hay muchas buenas ideas esperándote en la
          cocina.
        </p>
      </PageState>
    </>
  );
}
