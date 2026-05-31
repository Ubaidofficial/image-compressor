export default function HeroCompressionIllustration() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 240"
      fill="none"
      className="w-full h-auto"
      aria-hidden="true"
    >
      <rect x="20" y="40" width="100" height="80" rx="12" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2"/>
      <text x="70" y="75" textAnchor="middle" fill="#64748b" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="600">JPG / PNG</text>
      <rect x="30" y="85" width="80" height="6" rx="3" fill="#94a3b8"/>
      <rect x="30" y="96" width="60" height="6" rx="3" fill="#cbd5e1"/>
      <rect x="30" y="107" width="70" height="6" rx="3" fill="#94a3b8"/>

      <path d="M130 80 L180 80" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowBlue)"/>
      <defs>
        <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6 Z" fill="#2563eb"/>
        </marker>
      </defs>

      <rect x="200" y="40" width="100" height="80" rx="12" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2"/>
      <text x="250" y="70" textAnchor="middle" fill="#2563eb" fontSize="14" fontFamily="system-ui, sans-serif" fontWeight="700">WebP</text>
      <text x="250" y="90" textAnchor="middle" fill="#3b82f6" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="600">≤ 100KB</text>
      <rect x="210" y="100" width="80" height="6" rx="3" fill="#93c5fd"/>
      <rect x="210" y="111" width="50" height="6" rx="3" fill="#bfdbfe"/>
    </svg>
  );
}
