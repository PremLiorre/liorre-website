// LIORRE™ wordmark, traced from the brand artwork (geometry measured from the
// reference image) so it stays sharp at any size. Colour follows currentColor.
export default function Wordmark({
  className = "",
  tmTextColor = "#ffffff",
  title = "LIORRE",
}: {
  className?: string;
  /** Colour of the tiny "TM" letters inside the ™ dot — use the background colour. */
  tmTextColor?: string;
  title?: string;
}) {
  return (
    <svg viewBox="30 14 445 70" fill="currentColor" role="img" aria-label={title} className={className}>
      <title>{title}</title>
      {/* L */}
      <path d="M37 31.5h3.5a2.5 2.5 0 0 1 2.5 2.5V73H77a2.5 2.5 0 0 1 2.5 2.5V77A2.5 2.5 0 0 1 77 79.5H39a4.5 4.5 0 0 1-4.5-4.5V34a2.5 2.5 0 0 1 2.5-2.5Z" />
      {/* I */}
      <rect x="104.6" y="31.5" width="8.3" height="48" rx="2.3" />
      {/* O */}
      <path
        fillRule="evenodd"
        d="M152.5 31h44.5a5.5 5.5 0 0 1 5.5 5.5v37.5a5.5 5.5 0 0 1-5.5 5.5h-44.5a5.5 5.5 0 0 1-5.5-5.5V36.5a5.5 5.5 0 0 1 5.5-5.5Zm3 7v35h38.6V38Z"
      />
      {/* R R — top bar + bowl, lower stem, detached leg */}
      {[0, 81].map((dx) => (
        <g key={dx} transform={`translate(${dx} 0)`}>
          <path d="M240 31h40a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6h-43V56.5a2.5 2.5 0 0 1 2.5-2.5H277.4V37.5H240a2.5 2.5 0 0 1-2.5-2.5V33.5a2.5 2.5 0 0 1 2.5-2.5Z" />
          <rect x="237" y="54" width="8.5" height="25.5" rx="2.3" />
          <path d="M264.5 63.5h8.2a1.5 1.5 0 0 1 1.1.5l15.8 14a.9.9 0 0 1-.6 1.5h-9.2a1.5 1.5 0 0 1-1.1-.5L263.9 65a.9.9 0 0 1 .6-1.5Z" />
        </g>
      ))}
      {/* E — detached top bar */}
      <rect x="398" y="31" width="48.5" height="6.6" rx="2.3" />
      <path d="M400.6 44h3.4a2.5 2.5 0 0 1 2.5 2.5V51H428a2.5 2.5 0 0 1 2.5 2.5V55a2.5 2.5 0 0 1-2.5 2.5h-21.5V73H444a2.5 2.5 0 0 1 2.5 2.5V77a2.5 2.5 0 0 1-2.5 2.5h-41.5a4.5 4.5 0 0 1-4.5-4.5V46.6a2.6 2.6 0 0 1 2.6-2.6Z" />
      {/* ™ */}
      <circle cx="462.6" cy="23.6" r="6.9" />
      <text
        x="462.6"
        y="25.4"
        fontSize="5"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fill={tmTextColor}
        textAnchor="middle"
        letterSpacing="-0.2"
      >
        TM
      </text>
    </svg>
  );
}
