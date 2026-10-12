// LIORRE™ wordmark (geometric letterforms), drawn as SVG so it stays sharp at any size.
// Colour follows the surrounding text colour (currentColor).
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
    <svg viewBox="66 -30 912 136" fill="currentColor" role="img" aria-label={title} className={className}>
      <title>{title}</title>
      {/* L */}
      <rect x="72" y="0" width="15" height="100" rx="4.5" />
      <rect x="72" y="85" width="91" height="15" rx="4.5" />
      {/* I */}
      <rect x="216" y="0" width="15" height="100" rx="4.5" />
      {/* O */}
      <path
        fillRule="evenodd"
        d="M317 0h95a10 10 0 0 1 10 10v80a10 10 0 0 1-10 10h-95a10 10 0 0 1-10-10V10a10 10 0 0 1 10-10Zm6 15a4 4 0 0 0-4 4v62a4 4 0 0 0 4 4h83a4 4 0 0 0 4-4V19a4 4 0 0 0-4-4Z"
      />
      {/* R R */}
      {[491, 659].map((x) => (
        <g key={x}>
          <rect x={x} y="0" width="15" height="100" rx="4.5" />
          <rect x={x} y="0" width="109" height="15" rx="4.5" />
          <rect x={x + 94} y="0" width="15" height="56" rx="4.5" />
          <rect x={x} y="41" width="109" height="15" rx="4.5" />
          <path d={`M${x + 37} 56h20l52 44h-21Z`} />
        </g>
      ))}
      {/* E */}
      <rect x="824" y="0" width="15" height="100" rx="4.5" />
      <rect x="824" y="0" width="99" height="15" rx="4.5" />
      <rect x="824" y="42.5" width="66" height="15" rx="4.5" />
      <rect x="824" y="85" width="99" height="15" rx="4.5" />
      {/* ™ */}
      <circle cx="958" cy="-13" r="11.5" />
      <text
        x="958"
        y="-10"
        fontSize="8.5"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fill={tmTextColor}
        textAnchor="middle"
      >
        TM
      </text>
    </svg>
  );
}
