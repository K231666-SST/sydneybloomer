interface Props { className?: string }

export default function BlooomerMark({ className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 56 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Upper teardrop — narrow at top, widens toward centre */}
      <path
        d="M28 4 C28 4 48 16 48 34 C48 48 39 58 28 58 C17 58 8 48 8 34 C8 16 28 4 28 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Lower teardrop — widens at top from centre, narrows to point */}
      <path
        d="M28 80 C28 80 48 68 48 50 C48 36 39 26 28 26 C17 26 8 36 8 50 C8 68 28 80 28 80"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Dashed centre axis */}
      <line
        x1="28" y1="0"
        x2="28" y2="84"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="3 3"
        opacity="0.55"
      />
    </svg>
  )
}
