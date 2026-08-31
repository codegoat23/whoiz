export function FlowerAccent({
  color = "currentColor",
  petals = 6,
  size = 64,
  className = "",
}: {
  color?: string;
  petals?: number;
  size?: number;
  className?: string;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const length = size * 0.42;
  const width = size * 0.13;

  const petalPath = (angle: number) => {
    // rotate a single petal around the center
    const rad = (angle * Math.PI) / 180;
    const rotate = `rotate(${angle} ${cx} ${cy})`;
    const tipX = cx;
    const tipY = cy - length;
    return (
      <g key={angle} transform={rotate} opacity={0.9}>
        <path
          d={`M ${cx} ${cy} Q ${cx - width} ${cy - length * 0.55} ${tipX} ${tipY} Q ${
            cx + width
          } ${cy - length * 0.55} ${cx} ${cy} Z`}
          fill={color}
        />
      </g>
    );
  };

  const step = 360 / petals;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ pointerEvents: "none" }}
    >
      {Array.from({ length: petals }, (_, i) => petalPath(i * step))}
      <circle cx={cx} cy={cy} r={size * 0.09} fill={color} opacity={0.95} />
    </svg>
  );
}