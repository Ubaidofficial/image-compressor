export default function BulkWebPIllustration() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 160"
      fill="none"
      className="w-full h-auto"
      aria-hidden="true"
    >
      <rect x="25" y="25" width="70" height="50" rx="8" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5"/>
      <rect x="30" y="42" width="60" height="4" rx="2" fill="#94a3b8"/>

      <rect x="50" y="15" width="70" height="50" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5"/>
      <rect x="55" y="30" width="60" height="4" rx="2" fill="#94a3b8"/>
      <rect x="55" y="38" width="40" height="4" rx="2" fill="#cbd5e1"/>

      <rect x="40" y="5" width="70" height="50" rx="8" fill="#fff" stroke="#2563eb" strokeWidth="2"/>
      <rect x="45" y="20" width="60" height="5" rx="2.5" fill="#2563eb"/>
      <rect x="45" y="30" width="45" height="5" rx="2.5" fill="#93c5fd"/>
      <text x="75" y="48" textAnchor="middle" fill="#2563eb" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="700">Bulk</text>

      <path d="M100 50 L145 50" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round"/>

      <rect x="150" y="25" width="40" height="50" rx="8" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
      <text x="170" y="45" textAnchor="middle" fill="#2563eb" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700">ZIP</text>
      <text x="170" y="60" textAnchor="middle" fill="#3b82f6" fontSize="9" fontFamily="system-ui, sans-serif">WebP</text>

      <text x="100" y="155" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="500">Bulk Image to WebP Converter</text>
      <rect x="40" y="145" width="120" height="1" rx="0.5" fill="#e2e8f0"/>
    </svg>
  );
}
