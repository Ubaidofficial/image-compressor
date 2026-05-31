export default function PrivacyBrowserIllustration() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 140"
      fill="none"
      className="w-full h-auto"
      aria-hidden="true"
      focusable="false"
    >
      {/* Browser window */}
      <rect x="20" y="18" width="160" height="105" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
      <rect x="36" y="30" width="128" height="12" rx="4" fill="#e2e8f0" />

      {/* Content area */}
      <rect x="40" y="50" width="120" height="8" rx="4" fill="#f1f5f9" />
      <rect x="40" y="64" width="90" height="8" rx="4" fill="#f1f5f9" />
      <rect x="40" y="78" width="105" height="8" rx="4" fill="#f1f5f9" />

      {/* Chip in browser */}
      <rect x="76" y="40" width="48" height="24" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="100" y="50" textAnchor="middle" fill="#2563eb" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="700">100KB</text>
      <text x="100" y="60" textAnchor="middle" fill="#3b82f6" fontSize="7" fontFamily="system-ui, sans-serif">WebP</text>

      {/* Crossed out server */}
      <rect x="100" y="92" width="50" height="26" rx="6" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
      <line x1="108" y1="98" x2="142" y2="112" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
      <text x="125" y="111" textAnchor="middle" fill="#ef4444" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="700">Upload</text>

      {/* Lock */}
      <circle cx="50" cy="105" r="10" fill="#10b981" fillOpacity="0.12" stroke="#34d399" strokeWidth="1.5" />
      <text x="50" y="109" textAnchor="middle" fill="#10b981" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="800">🔒</text>
    </svg>
  );
}
