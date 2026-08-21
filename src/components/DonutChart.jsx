export default function DonutChart({ data, size = 160, stroke = 35 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center gap-6 flex-wrap">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#333" strokeWidth={stroke} />
        {data.map((item, i) => {
          const dash = (item.value / 100) * circumference;
          const el = (
            <circle
              key={i}
              cx={size/2} cy={size/2} r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return el;
        })}
      </svg>
    </div>
  );
}