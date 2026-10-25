import UiIcon from "./UiIcon";
import style from "../../styles/content/State.module.scss";

export default function EditorialState({
  kind = "empty",
  eyebrow,
  title,
  children,
  action,
  heading = "h2",
}) {
  const Heading = heading;
  return (
    <section
      className={style.state}
      data-state={kind}
      role={kind === "error" ? "alert" : kind === "loading" ? "status" : undefined}
    >
      <span className={style.mark}>
        <UiIcon kind={kind === "loading" ? "spark" : "book"} />
      </span>
      {eyebrow ? <p className={style.eyebrow}>{eyebrow}</p> : null}
      <Heading>{title}</Heading>
      {children ? <div className={style.copy}>{children}</div> : null}
      {action ? <div className={style.action}>{action}</div> : null}
    </section>
  );
}
