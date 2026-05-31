export default function PrivacyBrowserIllustration() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 140"
      fill="none"
      className="w-full h-auto"
      aria-hidden="true"
    >
      <rect x="20" y="20" width="160" height="110" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2"/>
      <rect x="36" y="32" width="128" height="12" rx="4" fill="#e2e8f0"/>
      <rect x="48" y="56" width="104" height="8" rx="4" fill="#f1f5f9"/>
      <rect x="48" y="72" width="80" height="8" rx="4" fill="#f1f5f9"/>
      <rect x="48" y="88" width="96" height="8" rx="4" fill="#f1f5f9"/>

      <rect x="76" y="46" width="48" height="24" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
      <text x="100" y="56" textAnchor="middle" fill="#2563eb" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="700">100KB</text>
      <text x="100" y="67" textAnchor="middle" fill="#3b82f6" fontSize="8" fontFamily="system-ui, sans-serif">WebP</text>

      <circle cx="100" cy="110" r="12" fill="#10b981" fillOpacity="0.15" stroke="#34d399" strokeWidth="2"/>
      <text x="100" y="114" textAnchor="middle" fill="#10b981" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="800">🔒</text>
    </svg>
  );
}
