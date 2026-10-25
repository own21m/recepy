export default function UiIcon({ kind = "arrow", ...props }) {
  const paths = {
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    plus: <path d="M12 4v16M4 12h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    book: (
      <>
        <path d="M3 5h6a4 4 0 0 1 3 3v13a5 5 0 0 0-5-3H3V5Zm18 0h-6a4 4 0 0 0-3 3v13a5 5 0 0 1 5-3h4V5Z" />
        <path d="M6 9h2m-2 4h2m8-4h2m-2 4h2" />
      </>
    ),
    spark: (
      <path d="M12 2c.8 7.5 2.5 9.2 10 10-7.5.8-9.2 2.5-10 10C11.2 14.5 9.5 12.8 2 12c7.5-.8 9.2-2.5 10-10Z" />
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[kind] || paths.arrow}
    </svg>
  );
}
