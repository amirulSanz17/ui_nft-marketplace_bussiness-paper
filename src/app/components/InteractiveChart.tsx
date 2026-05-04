import { useState, useRef, useEffect } from "react";

interface ChartDataPoint {
  date: string;
  value: number;
  change: number;
}

interface InteractiveChartProps {
  data: ChartDataPoint[];
  currentValue: number;
  currentChange: number;
  currentChangePercent: number;
  height?: number;
}

export default function InteractiveChart({
  data,
  currentValue,
  currentChange,
  currentChangePercent,
  height = 200,
}: InteractiveChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);
  const [touchPoint, setTouchPoint] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [isAnimating, setIsAnimating] = useState(true);
  const [chartWidth, setChartWidth] = useState(350);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation on mount
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1500);
    return () => clearTimeout(timer);
  }, [data]);

  useEffect(() => {
    // Update chart width on resize
    const updateWidth = () => {
      if (containerRef.current) {
        setChartWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const valueRange = maxValue - minValue;
  const padding = 20;
  const chartHeight = height;

  const getY = (value: number) => {
    return (
      chartHeight -
      padding -
      ((value - minValue) / valueRange) * (chartHeight - 2 * padding)
    );
  };

  const getX = (index: number) => {
    return padding + (index / (data.length - 1)) * (chartWidth - 2 * padding);
  };

  // Create smooth path using Bezier curves
  const createSmoothPath = () => {
    if (data.length === 0) return "";

    let path = `M ${getX(0)} ${getY(data[0].value)}`;

    for (let i = 0; i < data.length - 1; i++) {
      const x1 = getX(i);
      const y1 = getY(data[i].value);
      const x2 = getX(i + 1);
      const y2 = getY(data[i + 1].value);

      // Control points for smooth curve
      const cpX1 = x1 + (x2 - x1) / 3;
      const cpX2 = x1 + (2 * (x2 - x1)) / 3;

      path += ` C ${cpX1} ${y1}, ${cpX2} ${y2}, ${x2} ${y2}`;
    }

    return path;
  };

  const pathD = createSmoothPath();
  const areaD = `${pathD} L ${getX(data.length - 1)} ${chartHeight} L ${padding} ${chartHeight} Z`;

  const handleInteraction = (
    e: React.TouchEvent<SVGSVGElement> | React.MouseEvent<SVGSVGElement>,
  ) => {
    if (!svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    let clientX: number;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    const x = clientX - rect.left;
    const y = ("touches" in e ? e.touches[0].clientY : e.clientY) - rect.top;

    const index = Math.round(
      ((x - padding) / (chartWidth - 2 * padding)) * (data.length - 1),
    );
    if (index >= 0 && index < data.length) {
      setHoveredPoint(data[index]);
      setTouchPoint({ x, y: getY(data[index].value) });
    }
  };

  const handleLeave = () => {
    setHoveredPoint(null);
    setTouchPoint(null);
  };

  const displayValue = hoveredPoint?.value || currentValue;
  const displayChange = hoveredPoint?.change || currentChange;
  const displayChangePercent = hoveredPoint
    ? (
        (hoveredPoint.change / (hoveredPoint.value - hoveredPoint.change)) *
        100
      ).toFixed(2)
    : currentChangePercent.toFixed(2);

  const isPositive = displayChange >= 0;

  return (
    <div ref={containerRef} className="animate-in fade-in duration-500 w-full">
      {/* Value Display */}
      <div className="mb-4">
        <div className="text-3xl mb-1 font-bold">
          Rp{displayValue.toLocaleString("id-ID")}
        </div>
        <div
          className={`text-sm font-medium flex items-center gap-2 ${isPositive ? "text-green-600" : "text-red-600"}`}
        >
          <span>
            {isPositive ? "+" : ""} Rp
            {Math.abs(displayChange).toLocaleString("id-ID")}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs ${
              isPositive ? "bg-green-100" : "bg-red-100"
            }`}
          >
            ({isPositive ? "+" : ""}
            {displayChangePercent}%)
          </span>
          {hoveredPoint && (
            <span className="text-gray-500 text-xs ml-2">
              {hoveredPoint.date}
            </span>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-4 relative shadow-sm">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full cursor-crosshair"
          onTouchStart={handleInteraction}
          onTouchMove={handleInteraction}
          onTouchEnd={handleLeave}
          onMouseMove={handleInteraction}
          onMouseLeave={handleLeave}
        >
          <defs>
            <linearGradient
              id="chartGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = padding + ratio * (chartHeight - 2 * padding);
            const value = maxValue - ratio * valueRange;
            return (
              <g key={i}>
                <line
                  x1={padding}
                  y1={y}
                  x2={chartWidth - padding}
                  y2={y}
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />
                <text
                  x={5}
                  y={y + 4}
                  fontSize="10"
                  fill="#9ca3af"
                  className="select-none"
                >
                  {(value / 1000000).toFixed(1)}M
                </text>
              </g>
            );
          })}

          {/* Area under curve with animation */}
          <path
            d={areaD}
            fill="url(#chartGradient)"
            className={
              isAnimating
                ? "animate-in fade-in slide-in-from-bottom-4 duration-1000"
                : ""
            }
          />

          {/* Line with animation */}
          <path
            d={pathD}
            fill="none"
            stroke="#22c55e"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            className={
              isAnimating
                ? "animate-in fade-in duration-1500 svg-line-animate"
                : "svg-line-static"
            }
          />

          {/* Touch/Hover indicator */}
          {touchPoint && hoveredPoint && (
            <g className="animate-in fade-in duration-200">
              {/* Vertical line */}
              <line
                x1={touchPoint.x}
                y1={padding}
                x2={touchPoint.x}
                y2={chartHeight - padding}
                stroke="#22c55e"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.5"
              />

              {/* Dot */}
              <circle
                cx={touchPoint.x}
                cy={touchPoint.y}
                r="6"
                fill="white"
                stroke="#22c55e"
                strokeWidth="3"
              />
              <circle
                cx={touchPoint.x}
                cy={touchPoint.y}
                r="3"
                fill="#22c55e"
              />

              {/* Popup */}
              <g>
                <rect
                  x={
                    touchPoint.x < chartWidth / 2
                      ? touchPoint.x + 12
                      : touchPoint.x - 112
                  }
                  y={touchPoint.y - 45}
                  width="100"
                  height="40"
                  fill="white"
                  stroke="#e5e5e5"
                  strokeWidth="1"
                  rx="6"
                  className="drop-shadow-lg"
                />
                <text
                  x={
                    touchPoint.x < chartWidth / 2
                      ? touchPoint.x + 62
                      : touchPoint.x - 62
                  }
                  y={touchPoint.y - 28}
                  fontSize="10"
                  fill="#666"
                  textAnchor="middle"
                  className="select-none font-medium"
                >
                  {hoveredPoint.date}
                </text>
                <text
                  x={
                    touchPoint.x < chartWidth / 2
                      ? touchPoint.x + 62
                      : touchPoint.x - 62
                  }
                  y={touchPoint.y - 14}
                  fontSize="12"
                  fill="#000"
                  textAnchor="middle"
                  className="select-none font-bold"
                >
                  Rp{(hoveredPoint.value / 1000000).toFixed(1)}M
                </text>
              </g>
            </g>
          )}
        </svg>

        <style>{`
          @keyframes dash {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
