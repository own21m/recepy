import AppHeader from "./AppHeader";
import Footer from "./Footer";
import EditorialState from "./EditorialState";
import style from "../../styles/content/Editorial.module.scss";

export default function PageState(props) {
  return (
    <>
      <AppHeader landing />
      <main className={style.content}>
        <EditorialState {...props} heading="h1" />
      </main>
      <Footer />
    </>
  );
}
