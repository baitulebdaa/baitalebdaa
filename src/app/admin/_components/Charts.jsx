// The dashboard's two charts as plain SVG (no chart library): leads per day by source,
// and the share of leads by channel.

export const SERIES = [
  { key: "website", label: "Website forms", color: "#a3864f" },
  { key: "app", label: "Mobile app", color: "#2f6b55" },
  { key: "askAli", label: "Ask Ali chat", color: "#4fa597" },
];

const DONUT_COLORS = ["#a3864f", "#2f6b55", "#1d1c1a", "#4fa597", "#c9bfae", "#8d8a83"];

// A smooth line through the points that never overshoots below the baseline.
function smoothPath(points, floor) {
  if (points.length < 2) return "";
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[Math.max(0, i - 1)];
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const [x3, y3] = points[Math.min(points.length - 1, i + 2)];
    const c1y = Math.min(floor, y1 + (y2 - y0) / 6);
    const c2y = Math.min(floor, y2 - (y3 - y1) / 6);
    d += ` C${x1 + (x2 - x0) / 6},${c1y} ${x2 - (x3 - x1) / 6},${c2y} ${x2},${y2}`;
  }
  return d;
}

export function LeadsChart({ dates, series }) {
  const width = 720;
  const height = 230;
  const pad = { left: 28, right: 8, top: 10, bottom: 26 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const max = Math.max(1, ...SERIES.flatMap(({ key }) => series[key]));
  const step = max <= 2 ? Math.ceil(max * 2) / 8 : Math.ceil(max / 4);
  const top = step * 4;
  const x = (i) => pad.left + (dates.length === 1 ? plotW / 2 : (i / (dates.length - 1)) * plotW);
  const y = (value) => pad.top + plotH - (value / top) * plotH;
  const labelEvery = Math.max(1, Math.ceil(dates.length / 7));
  const floor = pad.top + plotH;
  const total = Math.round(SERIES.reduce((sum, { key }) => sum + series[key].reduce((a, b) => a + b, 0), 0));

  return (
    <div className="a-chart">
      <div className="a-legend">
        {SERIES.map((s) => (
          <span key={s.key}>
            <i style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Leads per day: ${total} in this period`}>
        <defs>
          {SERIES.map((s) => (
            <linearGradient key={s.key} id={`fill-${s.key}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={s.color} stopOpacity="0.22" />
              <stop offset="1" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line x1={pad.left} x2={width - pad.right} y1={y(i * step)} y2={y(i * step)} stroke="#efece6" />
            <text x={pad.left - 8} y={y(i * step) + 3} textAnchor="end">{Math.round(i * step * 100) / 100}</text>
          </g>
        ))}
        {dates.map((date, i) =>
          i % labelEvery === 0 || i === dates.length - 1 ? (
            <text key={date} x={x(i)} y={height - 6} textAnchor="middle">
              {new Date(`${date}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" })}
            </text>
          ) : null
        )}
        {SERIES.map((s) => {
          const points = series[s.key].map((value, i) => [x(i), y(value)]);
          const line = smoothPath(points, floor);
          return (
            <g key={s.key}>
              <path d={`${line} L${x(dates.length - 1)},${floor} L${x(0)},${floor} Z`} fill={`url(#fill-${s.key})`} />
              <path d={line} fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function SourcesDonut({ total, parts }) {
  const size = 180;
  const r = 70;
  const stroke = 26;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="a-donut">
      <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${total} leads by source`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#efece6" strokeWidth={stroke} />
        {parts.map((part, i) => {
          const length = total ? (part.value / total) * circumference : 0;
          const dash = (
            <circle
              key={part.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={DONUT_COLORS[i % DONUT_COLORS.length]}
              strokeWidth={stroke}
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          );
          offset += length;
          return dash;
        })}
        <text x="50%" y="48%" textAnchor="middle" className="a-donut__total">{total}</text>
        <text x="50%" y="60%" textAnchor="middle" className="a-donut__caption">Total Leads</text>
      </svg>
      {parts.length === 0 ? (
        <p className="a-empty">No leads in this period yet.</p>
      ) : (
        <ul className="a-keys">
          {parts.map((part, i) => (
            <li key={part.label}>
              <i style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }} />
              <span>{part.label}</span>
              <strong>{part.percent}%</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
