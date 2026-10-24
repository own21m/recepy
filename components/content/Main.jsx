//Importacion de los componentes principales.
import Head from "next/head";
import Get from "../database/Get";
import Link from "../compat/HistoricalLink";
import CategoryIcon from "./CategoryIcon";
import { useRouter } from "next/router";
import logoutStyle from "../../styles/auth/Logout.module.scss";
import style from "../../styles/content/Main.module.scss";
import styleModal from "../../styles/content/modalUser.module.scss";
import { motion } from "framer-motion";
import { useSession } from "../auth/Session";
import Special from "../database/Special";
import Add from "../database/Add";
import Footer from "./Footer";
import LogoutButton from "../auth/Logout";

//Componente padre para mostrar el contenido de la pagina.
const Main = () => {
  const router = useRouter();

  // La sesión aporta el perfil de prueba o el usuario conectado mediante Auth0.
  const { user } = useSession();

  //Contenido de la pagina principal.
  return (
    <div>
      {/* Componente Head para los meta datos de la pagina principal */}
      <Head>
        {/* Titulo de la pagina */}
        <title>Principal - Recepy</title>

        {/* Meta datos de la pagina */}
        <meta name="description" content="Pagina principal de Recepy" />
        <meta
          name="keywords"
          content="
                        Comida,
                        Recetas,
                        ¿Como?,
                        red social,
                        red,
                        cocina,
                        gastronomia,
                        proyecto,
                        aplicacion,
                        sena,
                        nextjs,
                        auth0,
                        vercel,
                        sass,
                        pagina,
                        cultura
                    "
        />
        <meta
          name="viewport"
          content="
                        width=device-width,
                        initial-scale=1.0
                    "
        />

        {/* Favicon de la pagina */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Contenido principal de la pagina */}
      <main className={style.content}>
        <section className={style.navbar}>
          {/* Boton para abrir el formulario para la cracion de la receta */}
          <motion.a
            href="#open-modal"
            className={style.item}
            title="Agrega una receta"
            aria-label="Crear receta"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 1,
              duration: 0,
            }}
          >
            +
          </motion.a>

          {/* Boton para saber mas sobre recepy */}

          {/* Boton para ver la informacion del usuario */}
          <motion.a
            title={user.name}
            aria-label="Abrir mi perfil"
            className={style.item}
            href="#open-modal4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 1.2,
              duration: 0,
            }}
            style={{ backgroundImage: `url(${user.picture})` }}
          ></motion.a>
        </section>

        {/* Titulo de la seccion de destacados */}
        <motion.h1
          className={style.title}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 1.6,
            duration: 0,
          }}
        >
          Recetas Destacadas
        </motion.h1>
        <motion.p
          className={style.text}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 1.7,
            duration: 0,
          }}
        >
          Explora las recetas mas destacadas de la plataforma, en esta sesion puedes ver
          las tres recetas mas destacadas de recepy. sube una buena receta para ver la
          tuya en esta posicion.
        </motion.p>

        {/* Componente que muestra las recetas destacadas */}
        <Special />

        {/* Titulo de la seccion de tipo de recetas */}
        <motion.h1
          className={style.title}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 1.6,
            duration: 0,
          }}
        >
          Tipos de recetas
        </motion.h1>
        <motion.p
          className={style.text}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 1.7,
            duration: 0,
          }}
        >
          Si deseas enfocarte en un tipo de receta mucho mas especifico, puedes hacer
          &apos;click&apos; en alguna de las categorias que recepy ofrece.
        </motion.p>

        {/* Contenedor de los bloques de enlace */}
        <section className={style.wrapper}>
          {/* Enlace a la sesion de 'Pasteleria' */}
          <Link href="/home/pasteleria">
            <motion.a
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 1,
                duration: 0,
              }}
              className={style.item}
              title="Reposteria"
            >
              <CategoryIcon kind="cake" />
            </motion.a>
          </Link>

          {/* Enlace a la sesion de 'vegetariana' */}
          <Link href="/home/vegetariano">
            <motion.a
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 1.2,
                duration: 0,
              }}
              className={style.item}
              title="Vegetariano"
            >
              <CategoryIcon kind="plant" />
            </motion.a>
          </Link>

          {/* Enlace a la sesion de 'parrilla' */}
          <Link href="/home/parrilla">
            <motion.a
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 1.4,
                duration: 0,
              }}
              className={style.item}
              title="Parrilla"
            >
              <CategoryIcon kind="grill" />
            </motion.a>
          </Link>

          {/* Enlace a la sesion de 'otro' */}
          <Link href="/home/otro">
            <motion.a
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 1.6,
                duration: 0,
              }}
              className={style.item}
              title="Otro"
            >
              <CategoryIcon kind="book" />
            </motion.a>
          </Link>
        </section>

        {/* Titulo de las recetas para explorar */}
        <motion.h1
          className={style.title}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 1.6,
            duration: 0,
          }}
        >
          Explora Recetas
        </motion.h1>
        <motion.p
          className={style.text}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 1.7,
            duration: 0,
          }}
        >
          Aun no sabes que quieres hacer, no te preocupes, aqui puedes encontrar las
          ultimas recetas que se han subido a la plataforma y si te lo estas preguntando,
          en esta sesion estan todo tipo de recetas, desde recetas de pasteleria hasta
          recetas vegetarianas.
        </motion.p>

        {/* Secion donde se renderizan las recetas para explorar */}
        <Get />

        {/* modal donde se renderiza el formulario para la creacion de la receta */}
        <div id="open-modal" className={style.modalOpen}>
          <div>
            {/* Boton para cerrar el formulario */}
            <a href="#" title="Close">
              X
            </a>

            {/* Contenedor de el formulario */}
            <Add />
          </div>
        </div>
        <div id="open-modal4" className={styleModal.modalOpen}>
          <div>
            {/* Boton para cerrar el formulario */}
            <a href="#" title="Close">
              X
            </a>
            <img
              src={user.picture}
              alt="Perfil de demostración"
              className={styleModal.picture}
            />
            <h1>{user.name}</h1>
            <h3>{user.email}</h3>
            <button
              type="button"
              className={logoutStyle.button}
              onClick={() => router.push("/home/mis-recetas")}
            >
              Mis recetas
            </button>
            <LogoutButton />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

//Exportacion del componente Main.
export default Main;
