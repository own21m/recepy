import Head from "next/head";
import AppHeader from "../../components/content/AppHeader";
import Footer from "../../components/content/Footer";
import GetType from "../../components/database/GetType";
import style from "../../styles/content/Editorial.module.scss";
export default function Category() {
  return (
    <>
      <Head>
        <title>Otro — Recepy</title>
      </Head>
      <AppHeader />
      <main className={style.content}>
        <section className={style.pageIntro}>
          <div>
            <p className={style.eyebrow}>El recetario / Otro</p>
            <h1>La curiosidad también cocina.</h1>
          </div>
          <p>Esas ideas que no necesitan una categoría para encontrar su lugar.</p>
        </section>
        <GetType type="Otro" />
      </main>
      <Footer />
    </>
  );
}
