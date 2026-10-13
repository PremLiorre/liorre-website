// Red price-tag "% OFF" badge pinned to the top-left corner of a product image.
// Vector redraw of the brand's discount-tag icon (Images to be added/discount icon.png)
// so the percentage can sit inside the tag and stay sharp at any size.

// Upright tag in a 56 × 78 box: chamfered head with the string hole, rounded body.
const TAG_PATH =
  "M20,2 H36 Q40,2 42.5,5 L54,19 Q56,21.5 56,25 V72 Q56,78 50,78 H6 Q0,78 0,72 V25 Q0,21.5 2,19 L13.5,5 Q16,2 20,2 Z";

export default function DiscountBadge({ percent, className = "" }: { percent: number; className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none drop-shadow-[0_3px_6px_rgba(0,0,0,0.25)] ${className}`}
      role="img"
      aria-label={`${percent}% off`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <g transform="translate(58 57) rotate(-35) scale(0.98) translate(-28 -40)">
          {/* String loop through the hole */}
          <path
            d="M28,14 C24,0 14,-14 4,-13 C-6,-12 -4,0 28,14"
            fill="none"
            stroke="#111111"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path d={TAG_PATH} fill="#EF2539" />
          <circle cx="28" cy="14" r="5" fill="#FFFFFF" />
          <text
            x="28"
            y="50"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="23"
            fontWeight="800"
            letterSpacing="-0.5"
            fontFamily="inherit"
          >
            {percent}%
          </text>
          <text
            x="28"
            y="64"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="10"
            fontWeight="700"
            letterSpacing="2.5"
            fontFamily="inherit"
          >
            OFF
          </text>
        </g>
      </svg>
    </div>
  );
}
