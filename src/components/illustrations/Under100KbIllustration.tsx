export default function Under100KbIllustration() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 200"
      fill="none"
      className="w-full h-auto"
      aria-hidden="true"
      focusable="false"
    >
      {/* Large file on left */}
      <rect x="20" y="30" width="110" height="90" rx="12" fill="#fef2f2" stroke="#fecaca" strokeWidth="1.5" />
      <text x="75" y="65" textAnchor="middle" fill="#ef4444" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="700">800KB</text>
      <rect x="35" y="75" width="80" height="6" rx="3" fill="#fca5a5" />
      <rect x="35" y="86" width="65" height="6" rx="3" fill="#fecaca" />
      <rect x="35" y="97" width="75" height="6" rx="3" fill="#fca5a5" />
      <text x="75" y="115" textAnchor="middle" fill="#ef4444" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="500">JPG / PNG</text>

      {/* Arrow with compressor */}
      <path d="M135 75 L170 75" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrowDown)" />
      <defs>
        <marker id="arrowDown" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6 Z" fill="#2563eb" />
        </marker>
      </defs>
      <rect x="135" y="55" width="26" height="16" rx="8" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="148" y="66" textAnchor="middle" fill="#2563eb" fontSize="8" fontFamily="system-ui, sans-serif" fontWeight="700">↓</text>

      {/* Small file on right */}
      <rect x="190" y="30" width="110" height="90" rx="12" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="245" y="60" textAnchor="middle" fill="#2563eb" fontSize="14" fontFamily="system-ui, sans-serif" fontWeight="700">WebP</text>
      <text x="245" y="78" textAnchor="middle" fill="#3b82f6" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="700">94KB</text>
      <rect x="205" y="88" width="80" height="6" rx="3" fill="#93c5fd" />
      <rect x="205" y="99" width="50" height="6" rx="3" fill="#bfdbfe" />
      <rect x="205" y="110" width="65" height="6" rx="3" fill="#93c5fd" />

      {/* Under 100KB badge */}
      <rect x="105" y="140" width="110" height="28" rx="14" fill="#10b981" fillOpacity="0.1" stroke="#34d399" strokeWidth="1.5" />
      <text x="160" y="158" textAnchor="middle" fill="#10b981" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700">Under 100KB ✓</text>
    </svg>
  );
}
