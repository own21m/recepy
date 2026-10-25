import Head from "next/head";
import AppHeader from "../../components/content/AppHeader";
import Footer from "../../components/content/Footer";
import GetType from "../../components/database/GetType";
import style from "../../styles/content/Editorial.module.scss";
export default function Category() {
  return (
    <>
      <Head>
        <title>Vegetariano — Recepy</title>
      </Head>
      <AppHeader />
      <main className={style.content}>
        <section className={style.pageIntro}>
          <div>
            <p className={style.eyebrow}>El recetario / Vegetariano</p>
            <h1>Todo empieza en la huerta.</h1>
          </div>
          <p>Vegetales, colores y recetas para cocinar a tu manera.</p>
        </section>
        <GetType type="Vegetariano" />
      </main>
      <Footer />
    </>
  );
}
