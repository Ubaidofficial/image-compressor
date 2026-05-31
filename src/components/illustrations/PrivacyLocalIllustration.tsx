export default function PrivacyLocalIllustration() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 160"
      fill="none"
      className="w-full h-auto"
      aria-hidden="true"
      focusable="false"
    >
      {/* Laptop */}
      <rect x="30" y="15" width="180" height="110" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
      <rect x="46" y="28" width="148" height="12" rx="4" fill="#e2e8f0" />

      {/* Browser window with checkmark */}
      <rect x="52" y="50" width="136" height="55" rx="6" fill="#fff" stroke="#cbd5e1" strokeWidth="1" />

      {/* In-browser processing icon */}
      <rect x="85" y="60" width="70" height="20" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="120" y="74" textAnchor="middle" fill="#2563eb" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="700">Processing</text>

      {/* Lock icon */}
      <circle cx="120" cy="95" r="10" fill="#10b981" fillOpacity="0.15" stroke="#34d399" strokeWidth="1.5" />
      <text x="120" y="99" textAnchor="middle" fill="#10b981" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="800">🔒</text>

      {/* No server cross-out */}
      <rect x="230" y="70" width="40" height="50" rx="6" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
      <text x="250" y="88" textAnchor="middle" fill="#ef4444" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="700">Server</text>
      <line x1="235" y1="95" x2="265" y2="105" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />

      {/* Bottom labels */}
      <text x="120" y="148" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="system-ui, sans-serif">Your browser only  ·  Never uploaded</text>
    </svg>
  );
}
