export default function HeroCompressionIllustration() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 240"
      fill="none"
      className="w-full h-auto"
      aria-hidden="true"
      focusable="false"
    >
      {/* Source file */}
      <rect x="20" y="50" width="110" height="80" rx="14" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="75" y="82" textAnchor="middle" fill="#64748b" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="700">JPG / PNG</text>
      <rect x="35" y="92" width="80" height="5" rx="2.5" fill="#94a3b8" />
      <rect x="35" y="101" width="60" height="5" rx="2.5" fill="#cbd5e1" />
      <rect x="35" y="110" width="70" height="5" rx="2.5" fill="#94a3b8" />

      {/* Arrow with gear */}
      <path d="M138 90 L176 90" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrowHero)" />
      <defs>
        <marker id="arrowHero" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6 Z" fill="#2563eb" />
        </marker>
      </defs>

      {/* Mini compressor badge */}
      <rect x="138" y="72" width="28" height="16" rx="8" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="152" y="83" textAnchor="middle" fill="#2563eb" fontSize="8" fontFamily="system-ui, sans-serif" fontWeight="700">↔</text>

      {/* Output file */}
      <rect x="190" y="50" width="110" height="80" rx="14" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="245" y="78" textAnchor="middle" fill="#2563eb" fontSize="14" fontFamily="system-ui, sans-serif" fontWeight="700">WebP</text>
      <text x="245" y="95" textAnchor="middle" fill="#3b82f6" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700">≤ 100KB</text>
      <rect x="205" y="105" width="80" height="5" rx="2.5" fill="#93c5fd" />
      <rect x="205" y="114" width="50" height="5" rx="2.5" fill="#bfdbfe" />

      {/* Bottom trust badges */}
      <rect x="60" y="160" width="90" height="26" rx="13" fill="#10b981" fillOpacity="0.08" stroke="#34d399" strokeWidth="1" />
      <text x="105" y="177" textAnchor="middle" fill="#10b981" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="600">Privacy first</text>

      <rect x="170" y="160" width="90" height="26" rx="13" fill="#8b5cf6" fillOpacity="0.08" stroke="#a78bfa" strokeWidth="1" />
      <text x="215" y="177" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="600">Browser-based</text>
    </svg>
  );
}
