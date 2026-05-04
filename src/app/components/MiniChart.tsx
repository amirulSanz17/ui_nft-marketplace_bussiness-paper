interface MiniChartProps {
  trend: "up" | "down";
  color?: string;
}

export default function MiniChart({ trend, color }: MiniChartProps) {
  const isUp = trend === "up";
  const strokeColor = color || (isUp ? "#22c55e" : "#ef4444");

  // Generate simple trend line
  const points = isUp
    ? "0,20 15,18 30,15 45,10 60,8"
    : "0,8 15,10 30,15 45,18 60,20";

  return (
    <svg
      width="60"
      height="24"
      viewBox="0 0 60 24"
      className="inline-block mini-chart-overflow-visible"
    >
      <defs>
        <linearGradient
          id={`gradient-${trend}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Area under curve */}
      <path
        d={`M ${points} L 60,24 L 0,24 Z`}
        fill={`url(#gradient-${trend})`}
      />

      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
