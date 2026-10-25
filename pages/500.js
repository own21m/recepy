import Head from "next/head";
import Link from "next/link";
import PageState from "../components/content/PageState";

export default function ServerError() {
  return (
    <>
      <Head>
        <title>Una pausa en la cocina — Recepy</title>
      </Head>
      <PageState
        kind="error"
        eyebrow="500 / Una pequeña pausa"
        title="Algo se nos pasó de cocción."
        action={<Link href="/">Volver a Recepy</Link>}
      >
        <p>
          No pudimos preparar esta página. Vuelve a intentarlo en un momento; tu próxima
          receta puede esperar un poco.
        </p>
      </PageState>
    </>
  );
}
