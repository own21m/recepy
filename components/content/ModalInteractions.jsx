import { useEffect } from "react";
import { mountRecipeModals } from "../../lib/modal-controller.mjs";

export default function ModalInteractions() {
  useEffect(() => {
    const controller = mountRecipeModals(document, window);
    return () => controller.destroy();
  }, []);
  return null;
}
