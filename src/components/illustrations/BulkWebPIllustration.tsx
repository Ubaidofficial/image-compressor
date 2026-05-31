export default function BulkWebPIllustration() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 160"
      fill="none"
      className="w-full h-auto"
      aria-hidden="true"
      focusable="false"
    >
      {/* Stack of files */}
      <rect x="30" y="35" width="70" height="50" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="38" y="48" width="54" height="4" rx="2" fill="#94a3b8" />
      <rect x="38" y="56" width="40" height="4" rx="2" fill="#cbd5e1" />
      <rect x="38" y="64" width="48" height="4" rx="2" fill="#94a3b8" />

      <rect x="45" y="25" width="70" height="50" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="53" y="38" width="54" height="4" rx="2" fill="#94a3b8" />
      <rect x="53" y="46" width="40" height="4" rx="2" fill="#cbd5e1" />

      <rect x="38" y="15" width="70" height="50" rx="8" fill="#fff" stroke="#2563eb" strokeWidth="2" />
      <rect x="46" y="28" width="54" height="5" rx="2.5" fill="#2563eb" />
      <rect x="46" y="38" width="38" height="5" rx="2.5" fill="#93c5fd" />
      <text x="73" y="56" textAnchor="middle" fill="#2563eb" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="700">×20</text>

      {/* Arrow */}
      <path d="M115 50 L150 50" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrowBulk2)" />
      <defs>
        <marker id="arrowBulk2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6 Z" fill="#2563eb" />
        </marker>
      </defs>

      {/* ZIP box */}
      <rect x="155" y="30" width="35" height="40" rx="8" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="172" y="48" textAnchor="middle" fill="#2563eb" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700">ZIP</text>
      <text x="172" y="61" textAnchor="middle" fill="#3b82f6" fontSize="8" fontFamily="system-ui, sans-serif" fontWeight="500">WebP</text>

      {/* Bottom label */}
      <text x="100" y="120" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="500">Bulk Image to WebP</text>
      <rect x="40" y="110" width="120" height="1" rx="0.5" fill="#e2e8f0" />

      {/* CSV badge */}
      <rect x="60" y="130" width="80" height="20" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
      <text x="100" y="143" textAnchor="middle" fill="#16a34a" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="600">+ CSV report</text>
    </svg>
  );
}
