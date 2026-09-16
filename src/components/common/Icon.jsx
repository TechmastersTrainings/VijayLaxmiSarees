const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

export const Icon = ({ name, size = 20, filled = false, ...rest }) => {
  const common = { ...base, width: size, height: size, ...rest }
  switch (name) {
    case 'search':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      )
    case 'heart':
      return (
        <svg {...common} fill={filled ? 'currentColor' : 'none'}>
          <path d="M12 20s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.65 12 20 12 20Z" />
        </svg>
      )
    case 'bag':
      return (
        <svg {...common}>
          <path d="M6 8h12l-1 12H7L6 8Z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
      )
    case 'menu':
      return (
        <svg {...common}>
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      )
    case 'close':
      return (
        <svg {...common}>
          <path d="M5 5l14 14M19 5L5 19" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg {...common} strokeWidth={1.5}>
          <path d="M20 11.5A7.5 7.5 0 0 1 8 18.4L4 20l1.6-4A7.5 7.5 0 1 1 20 11.5Z" />
          <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.5 1-1l-1.4-.8-1 .7c-1-.4-1.9-1.3-2.3-2.3l.7-1L10.7 9c-.5 0-1.7.1-1.7.5Z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'youtube':
      return (
        <svg {...common}>
          <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
          <path d="m10 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...common}>
          <path d="M5 4h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3c0 1-.8 1.6-1.8 1.5A15.5 15.5 0 0 1 3.5 5.8C3.4 4.9 4 4 5 4Z" />
        </svg>
      )
    case 'map-pin':
      return (
        <svg {...common}>
          <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
          <circle cx="12" cy="11" r="2.2" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      )
    case 'arrow-right':
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      )
    case 'arrow-up-right':
      return (
        <svg {...common}>
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      )
    case 'check':
      return (
        <svg {...common}>
          <path d="m4.5 12.5 5 5 10-11" />
        </svg>
      )
    case 'play':
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M8 5.5v13l11-6.5-11-6.5Z" />
        </svg>
      )
    case 'plus':
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      )
    case 'minus':
      return (
        <svg {...common}>
          <path d="M5 12h14" />
        </svg>
      )
    case 'chevron-down':
      return (
        <svg {...common}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      )
    case 'sparkle':
      return (
        <svg {...common}>
          <path d="M12 3.5c.6 3.6 1.9 4.9 5.5 5.5-3.6.6-4.9 1.9-5.5 5.5-.6-3.6-1.9-4.9-5.5-5.5 3.6-.6 4.9-1.9 5.5-5.5Z" />
          <path d="M18 15c.3 1.6.9 2.2 2.5 2.5-1.6.3-2.2.9-2.5 2.5-.3-1.6-.9-2.2-2.5-2.5 1.6-.3 2.2-.9 2.5-2.5Z" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3.5 5.5 6v5c0 4 2.7 7 6.5 8.5 3.8-1.5 6.5-4.5 6.5-8.5V6L12 3.5Z" />
          <path d="m9.5 12 1.8 1.8 3.4-3.6" />
        </svg>
      )
    case 'scissors':
      return (
        <svg {...common}>
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="6.5" cy="17.5" r="2.5" />
          <path d="M8.7 8.3 20 17M8.7 15.7 20 7" />
        </svg>
      )
    case 'info':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 11v5M12 8h.01" />
        </svg>
      )
    default:
      return null
  }
}

export default Icon
