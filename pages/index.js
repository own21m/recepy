import Head from "next/head";
import Link from "next/link";
import LoginButton from "../components/auth/Login";
import Footer from "../components/content/Footer";
import AppHeader from "../components/content/AppHeader";
import UiIcon from "../components/content/UiIcon";
import style from "../styles/content/Editorial.module.scss";

export default function Index() {
  return (
    <>
      <Head>
        <title>Recepy — El gusto de compartir</title>
        <meta
          name="description"
          content="Un recetario para descubrir, cocinar y compartir buenas ideas alrededor de la mesa."
        />
      </Head>
      <div className={style.landing}>
        <AppHeader landing />
        <main>
          <section className={style.hero}>
            <div className={style.heroCopy}>
              <p className={style.eyebrow}>Recetas que nos reúnen / Desde 2021</p>
              <h1>
                Las buenas ideas
                <br />
                se cocinan
                <br />
                <em>en compañía.</em>
              </h1>
              <p>
                Un ingrediente nuevo. Una receta de siempre. Ese plato que merece
                compartirse. Tu próxima historia en la cocina empieza aquí.
              </p>
              <div className={style.heroActions}>
                <LoginButton>
                  Entrar al recetario <UiIcon />
                </LoginButton>
                <a href="#sobre-recepy">Conoce Recepy</a>
              </div>
              <small className={style.demoNote}>
                <UiIcon kind="book" />
                Explora la demo sin crear una cuenta.
              </small>
            </div>
            <div className={style.heroPhoto}>
              <span className={style.photoIndex}>01 / DEL RECETARIO</span>
              <img
                src="/wallpaper.jpg"
                alt="Pizza artesanal con vegetales, una de las imágenes originales de Recepy"
              />
              <div className={style.photoNote}>
                <span>UN CLÁSICO PARA COMPARTIR</span>
                <h2>
                  Pizza de
                  <br />
                  <em>la huerta.</em>
                </h2>
                <p>Una base crujiente. Un puñado de ideas frescas.</p>
              </div>
              <div className={style.photoStamp}>
                DE LA COCINA<strong>a la mesa</strong>Y DE LA MESA A TODOS
              </div>
              <div className={style.photoCaption}>
                <span>Algo delicioso está por empezar.</span>
                <UiIcon />
              </div>
            </div>
          </section>
          <section
            className={style.values}
            id="sobre-recepy"
            aria-label="Una cocina para compartir"
          >
            {[
              [
                "01",
                "Encuentra tu inspiración",
                "Explora recetas, descubre categorías y elige lo que te apetece cocinar.",
              ],
              [
                "02",
                "Comparte tu manera",
                "Guarda tus ingredientes y tu paso a paso para volver a esa buena idea.",
              ],
              [
                "03",
                "Hazlo a tu gusto",
                "Desde algo dulce hasta una receta vegetariana: hay muchas formas de sentarse a la mesa.",
              ],
            ].map(([number, title, text]) => (
              <article className={style.value} key={number}>
                <span>{number}</span>
                <div>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
