import { Children, cloneElement } from "react";

// Next 11 permitía un enlace como hijo de Link. Se conserva ese mismo elemento
// para mantener la estructura histórica sin producir dos etiquetas <a> anidadas.
export default function HistoricalLink({ href, children }) {
  return cloneElement(Children.only(children), { href });
}
