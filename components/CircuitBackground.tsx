type CircuitBackgroundProps = {
  /** Unique suffix so multiple patterns on one page don't clash */
  id?: string;
  className?: string;
};

export default function CircuitBackground({
  id = "default",
  className = "",
}: CircuitBackgroundProps) {
  const patternId = `circuit-pattern-${id}`;
  const lineFadeId = `circuit-line-fade-${id}`;

  return (
    <div
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(107, 130, 168, 0.16) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.22,
        }}
      />

      <div
        className="absolute top-0 right-0 h-[65%] w-[80%]"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 85% 15%, rgba(107, 130, 168, 0.18) 0%, transparent 68%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 h-[55%] w-[70%]"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 10% 90%, rgba(107, 130, 168, 0.14) 0%, transparent 68%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 60 H30 M30 60 V20 M30 20 H90 M90 20 V100 M90 100 H120"
              fill="none"
              stroke="#6B82A8"
              strokeWidth="1.1"
              opacity="0.26"
              className="animate-circuit-pulse"
            />
            <circle cx="30" cy="60" r="3" fill="#6B82A8" opacity="0.24">
              <animate
                attributeName="opacity"
                values="0.24;0.38;0.24"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="90" cy="20" r="3" fill="#4A6490" opacity="0.24">
              <animate
                attributeName="opacity"
                values="0.38;0.24;0.38"
                dur="5s"
                repeatCount="indefinite"
              />
            </circle>
          </pattern>

          <linearGradient id={lineFadeId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B82A8" stopOpacity="0" />
            <stop offset="15%" stopColor="#6B82A8" stopOpacity="0.18" />
            <stop offset="85%" stopColor="#6B82A8" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#6B82A8" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${patternId})`} />

        {[18, 34, 50, 66, 82].map((y, i) => (
          <line
            key={y}
            x1="0"
            y1={`${y}%`}
            x2="100%"
            y2={`${y}%`}
            stroke={`url(#${lineFadeId})`}
            strokeWidth={i === 2 ? 1.25 : 0.75}
          />
        ))}

        <path
          d="M -5 68 Q 28 54, 52 64 T 105 58 T 155 66"
          fill="none"
          stroke="#6B82A8"
          strokeWidth="1.5"
          opacity="0.2"
          strokeLinecap="round"
        />
        <path
          d="M -5 74 Q 35 84, 68 72 T 120 78 T 170 70"
          fill="none"
          stroke="#4A6490"
          strokeWidth="1"
          opacity="0.14"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
