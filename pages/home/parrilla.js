import Head from "next/head";
import AppHeader from "../../components/content/AppHeader";
import Footer from "../../components/content/Footer";
import GetType from "../../components/database/GetType";
import style from "../../styles/content/Editorial.module.scss";
export default function Category() {
  return (
    <>
      <Head>
        <title>Parrilla — Recepy</title>
      </Head>
      <AppHeader />
      <main className={style.content}>
        <section className={style.pageIntro}>
          <div>
            <p className={style.eyebrow}>El recetario / Parrilla</p>
            <h1>El gusto de las brasas.</h1>
          </div>
          <p>Una categoría para reunir recetas de parrilla y buenas conversaciones.</p>
        </section>
        <GetType type="Parrilla" />
      </main>
      <Footer />
    </>
  );
}
