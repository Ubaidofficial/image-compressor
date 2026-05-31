export default function QualityModeIllustration() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 180"
      fill="none"
      className="w-full h-auto"
      aria-hidden="true"
      focusable="false"
    >
      {/* Three mode bars */}
      <rect x="20" y="30" width="230" height="28" rx="8" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="40" y="48" textAnchor="start" fill="#2563eb" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="700">Best Quality</text>
      <circle cx="215" cy="44" r="8" fill="#2563eb" fillOpacity="0.15" stroke="#2563eb" strokeWidth="1" />
      <text x="215" y="48" textAnchor="middle" fill="#2563eb" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="700">~</text>

      <rect x="20" y="66" width="230" height="28" rx="8" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
      <text x="40" y="84" textAnchor="start" fill="#16a34a" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="700">Balanced</text>
      <circle cx="215" cy="80" r="8" fill="#16a34a" fillOpacity="0.15" stroke="#16a34a" strokeWidth="1" />
      <text x="215" y="84" textAnchor="middle" fill="#16a34a" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="700">○</text>

      <rect x="20" y="102" width="230" height="28" rx="8" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
      <text x="40" y="120" textAnchor="start" fill="#dc2626" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="700">Smallest File</text>
      <circle cx="215" cy="116" r="8" fill="#dc2626" fillOpacity="0.15" stroke="#dc2626" strokeWidth="1" />
      <text x="215" y="120" textAnchor="middle" fill="#dc2626" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="700">−</text>

      {/* Quality slider visual */}
      <text x="140" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="500">quality tradeoff  ←  →  file size tradeoff</text>
    </svg>
  );
}
