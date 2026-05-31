export default function JpgToWebpIllustration() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 200"
      fill="none"
      className="w-full h-auto"
      aria-hidden="true"
      focusable="false"
    >
      {/* JPG file on left */}
      <rect x="20" y="40" width="110" height="80" rx="12" fill="#fff7ed" stroke="#fed7aa" strokeWidth="2" />
      <text x="75" y="70" textAnchor="middle" fill="#ea580c" fontSize="16" fontFamily="system-ui, sans-serif" fontWeight="800">JPG</text>
      <rect x="35" y="78" width="80" height="6" rx="3" fill="#fdba74" />
      <rect x="35" y="89" width="65" height="6" rx="3" fill="#fed7aa" />
      <rect x="35" y="100" width="72" height="6" rx="3" fill="#fdba74" />
      <text x="75" y="115" textAnchor="middle" fill="#ea580c" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="500">.jpg / .jpeg</text>

      {/* Conversion arrow */}
      <path d="M138 80 L182 80" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowJpg)" />
      <defs>
        <marker id="arrowJpg" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6 Z" fill="#2563eb" />
        </marker>
      </defs>
      <text x="160" y="70" textAnchor="middle" fill="#3b82f6" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="600">Convert</text>

      {/* WebP on right */}
      <rect x="190" y="40" width="110" height="80" rx="12" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
      <text x="245" y="68" textAnchor="middle" fill="#2563eb" fontSize="14" fontFamily="system-ui, sans-serif" fontWeight="700">WebP</text>
      <text x="245" y="86" textAnchor="middle" fill="#3b82f6" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700">≤ 100KB</text>
      <rect x="205" y="94" width="80" height="6" rx="3" fill="#93c5fd" />
      <rect x="205" y="105" width="50" height="6" rx="3" fill="#bfdbfe" />

      {/* Bottom tag */}
      <rect x="85" y="150" width="150" height="28" rx="14" fill="#10b981" fillOpacity="0.1" stroke="#34d399" strokeWidth="1.5" />
      <text x="160" y="168" textAnchor="middle" fill="#10b981" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700">25-35% smaller than JPG</text>
    </svg>
  );
}
