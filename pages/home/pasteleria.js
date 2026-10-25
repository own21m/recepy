import Head from "next/head";
import AppHeader from "../../components/content/AppHeader";
import Footer from "../../components/content/Footer";
import GetType from "../../components/database/GetType";
import style from "../../styles/content/Editorial.module.scss";
export default function Category() {
  return (
    <>
      <Head>
        <title>Pasteleria — Recepy</title>
      </Head>
      <AppHeader />
      <main className={style.content}>
        <section className={style.pageIntro}>
          <div>
            <p className={style.eyebrow}>El recetario / Pasteleria</p>
            <h1>Un poco de dulce.</h1>
          </div>
          <p>Ideas para hornear, celebrar y compartir algo hecho en casa.</p>
        </section>
        <GetType type="Pasteleria" />
      </main>
      <Footer />
    </>
  );
}
