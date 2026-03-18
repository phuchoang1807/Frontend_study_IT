const baseSvgStyle = {
  display: "block",
};

export function SearchIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg style={baseSvgStyle} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
      <path d="M20 20L16.65 16.65" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
export function BellIcon({ size = 18, color = "currentColor", strokeWidth = 1.8 }) {
  return (
    <svg style={baseSvgStyle} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.8V5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 9.8C17 7.05 14.75 4.8 12 4.8C9.25 4.8 7 7.05 7 9.8V13.2L5.5 16H18.5L17 13.2V9.8Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 18.2C10.45 19.25 11.2 20 12 20C12.8 20 13.55 19.25 14 18.2"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function UploadIcon({ size = 14, color = "currentColor" }) {
  return (
    <svg style={baseSvgStyle} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 16V6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M8.5 9.5L12 6L15.5 9.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 18H19" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 12, color = "currentColor" }) {
  return <span style={{ color, fontSize: size, lineHeight: 1 }}>›</span>;
}

export function EyeIcon({ size = 14, color = "currentColor" }) {
  return (
    <svg style={baseSvgStyle} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 12C3.8 8.9 7.3 7 12 7C16.7 7 20.2 8.9 22 12C20.2 15.1 16.7 17 12 17C7.3 17 3.8 15.1 2 12Z" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="12" r="3" fill={color} />
    </svg>
  );
}

export function BookmarkIcon({ size = 14, color = "currentColor" }) {
  return (
    <svg style={baseSvgStyle} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 4H17V20L12 16.5L7 20V4Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({ size = 14, color = "currentColor" }) {
  return <span style={{ color, fontSize: size, lineHeight: 1 }}>★</span>;
}

export function ChevronLeftIcon({ size = 12, color = "currentColor" }) {
  return <span style={{ color, fontSize: size, lineHeight: 1 }}>‹</span>;
}

export function ShieldIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg style={baseSvgStyle} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3L19 6V11C19 15.4 16.2 19.4 12 21C7.8 19.4 5 15.4 5 11V6L12 3Z" stroke={color} strokeWidth="2" />
      <path d="M9 11L11 13L15 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GiftIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg style={baseSvgStyle} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="9" width="16" height="11" stroke={color} strokeWidth="2" />
      <path d="M12 9V20" stroke={color} strokeWidth="2" />
      <path d="M4 13H20" stroke={color} strokeWidth="2" />
      <path d="M12 9H9.5C8.4 9 7.5 8.1 7.5 7C7.5 5.9 8.4 5 9.5 5C11.2 5 12 7 12 9Z" stroke={color} strokeWidth="2" />
      <path d="M12 9H14.5C15.6 9 16.5 8.1 16.5 7C16.5 5.9 15.6 5 14.5 5C12.8 5 12 7 12 9Z" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function GlobeIcon({ size = 14, color = "currentColor" }) {
  return (
    <svg style={baseSvgStyle} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
      <path d="M3 12H21" stroke={color} strokeWidth="2" />
      <path d="M12 3C14.5 5.4 16 8.6 16 12C16 15.4 14.5 18.6 12 21" stroke={color} strokeWidth="2" />
      <path d="M12 3C9.5 5.4 8 8.6 8 12C8 15.4 9.5 18.6 12 21" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function LanguageIcon({ size = 14, color = "currentColor" }) {
  return (
    <svg style={baseSvgStyle} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7H14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M9 5V7" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M6 11C8 10 10 8 11 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M8 9C9 10.5 10.5 12 12 13" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M16 8L20 19" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M14 14H22" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function DocumentIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg style={baseSvgStyle} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3H14L19 8V21H7V3Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 3V8H19" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function UsersIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg style={baseSvgStyle} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="3" stroke={color} strokeWidth="2" />
      <circle cx="17" cy="10" r="2" stroke={color} strokeWidth="2" />
      <path d="M4 19C4 16.8 6.2 15 9 15C11.8 15 14 16.8 14 19" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M15 18C15.2 16.7 16.4 15.8 18 15.7" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function DownloadIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg style={baseSvgStyle} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4V14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M8 10L12 14L16 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19H19" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TrophyIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg style={baseSvgStyle} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 4H16V8C16 10.2 14.2 12 12 12C9.8 12 8 10.2 8 8V4Z" stroke={color} strokeWidth="2" />
      <path d="M9 21H15" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 12V21" stroke={color} strokeWidth="2" />
      <path d="M16 6H19C19 8.2 17.7 10 16 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M8 6H5C5 8.2 6.3 10 8 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}



export function LinkIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg style={baseSvgStyle} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FacebookIcon({ size = 16, color = "currentColor" }) {
  return <span style={{ color, fontSize: size, fontWeight: 700, lineHeight: 1 }}>f</span>;
}

export function YoutubeIcon({ size = 16, color = "currentColor" }) {
  return <span style={{ color, fontSize: size, lineHeight: 1 }}>▶</span>;
}

export function LinkedinIcon({ size = 16, color = "currentColor" }) {
  return <span style={{ color, fontSize: size, fontWeight: 700, lineHeight: 1 }}>in</span>;
}

export function AlertIcon({ size = 16 }) {
  return <span style={{ fontSize: size }}>⚠️</span>;
}

export function MessageIcon({ size = 16 }) {
  return <span style={{ fontSize: size }}>💬</span>;
}

export function PlusIcon({ size = 16 }) {
  return <span style={{ fontSize: size }}>＋</span>;
}

export function HeartIcon({ size = 16 }) {
  return <span style={{ fontSize: size }}>❤️</span>;
}

export function ShareIcon({ size = 16 }) {
  return <span style={{ fontSize: size }}>🔗</span>;
}

export function ListIcon({ size = 16 }) {
  return <span style={{ fontSize: size }}>📋</span>;
}

export function ClockIcon({ size = 16 }) {
  return <span style={{ fontSize: size }}>⏰</span>;
}

export function MaximizeIcon({ size = 16 }) {
  return <span style={{ fontSize: size }}>⛶</span>;
}

export function MinusIcon({ size = 16 }) {
  return <span style={{ fontSize: size }}>➖</span>;
}