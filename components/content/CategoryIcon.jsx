// Sustitutos vectoriales de los símbolos originales: conservan su tamaño y lugar.
// Así las categorías no dependen de los pictogramas del sistema operativo.
export default function CategoryIcon({ kind }) {
  const paths = {
    cake: <path d="M5 11h14v9H5zM4 16h16M8 11V7m4 4V6m4 5V7M7 7h2m2-1h2m2 1h2" />,
    plant: (
      <path d="M12 21V11M12 15C5 15 3 11 3 5c6 0 9 3 9 8M12 12c0-6 3-9 9-9 0 6-3 9-9 9" />
    ),
    grill: <path d="M4 9h16a8 8 0 0 1-16 0ZM8 17l-3 5m11-5 3 5M8 6V2m4 4V1m4 5V2" />,
    book: (
      <path d="M4 4h7a3 3 0 0 1 3 3v14a4 4 0 0 0-4-3H4zM14 7a3 3 0 0 1 3-3h3v14h-3a4 4 0 0 0-3 3" />
    ),
  };
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#f9f9f9"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[kind]}
    </svg>
  );
}
