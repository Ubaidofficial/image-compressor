export default function BulkWorkflowIllustration() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 340 180"
      fill="none"
      className="w-full h-auto"
      aria-hidden="true"
      focusable="false"
    >
      {/* Stack of files on left */}
      <rect x="15" y="70" width="70" height="50" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="30" y="80" width="40" height="4" rx="2" fill="#94a3b8" />
      <rect x="30" y="88" width="35" height="4" rx="2" fill="#cbd5e1" />
      <text x="50" y="112" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="600">×20</text>

      {/* Second file layer */}
      <rect x="22" y="55" width="70" height="50" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="37" y="65" width="40" height="4" rx="2" fill="#94a3b8" />

      {/* Top tag */}
      <rect x="35" y="42" width="44" height="18" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="57" y="54" textAnchor="middle" fill="#2563eb" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="700">Batch</text>

      {/* Arrow */}
      <path d="M95 75 L135 75" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrowBulk)" />
      <defs>
        <marker id="arrowBulk" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6 Z" fill="#2563eb" />
        </marker>
      </defs>

      {/* Processing indicator */}
      <rect x="142" y="55" width="44" height="40" rx="8" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
      <text x="164" y="70" textAnchor="middle" fill="#2563eb" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="600">Proc-</text>
      <text x="164" y="83" textAnchor="middle" fill="#2563eb" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="600">essing</text>

      {/* Arrow to ZIP */}
      <path d="M196 75 L236 75" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrowZip)" />
      <defs>
        <marker id="arrowZip" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6 Z" fill="#2563eb" />
        </marker>
      </defs>

      {/* ZIP on right */}
      <rect x="248" y="55" width="72" height="40" rx="8" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
      <text x="284" y="70" textAnchor="middle" fill="#2563eb" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="700">ZIP</text>
      <text x="284" y="85" textAnchor="middle" fill="#3b82f6" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="500">WebP</text>

      {/* Bottom labels */}
      <text x="50" y="148" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="system-ui, sans-serif">Upload</text>
      <text x="164" y="148" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="system-ui, sans-serif">Convert</text>
      <text x="284" y="148" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="system-ui, sans-serif">Download</text>
    </svg>
  );
}
