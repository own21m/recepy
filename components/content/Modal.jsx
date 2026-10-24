import { useEffect, useId, useRef } from "react";
import style from "../../styles/content/Modal.module.scss";

// El diálogo nativo gestiona foco, tecla Escape y bloqueo del fondo.
export default function Modal({ open, title, onClose, children }) {
  const reference = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = reference.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  return (
    <dialog
      ref={reference}
      className={style.dialog}
      aria-labelledby={titleId}
      onCancel={onClose}
      onClose={onClose}
    >
      <header className={style.header}>
        <h2 id={titleId}>{title}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar ventana"
          className={style.close}
        >
          ×
        </button>
      </header>
      {open ? children : null}
    </dialog>
  );
}
