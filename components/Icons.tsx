// Small inline brand/utility icons (inherit text colour via currentColor).

type IconProps = { size?: number; className?: string };

export function MailIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  );
}

export function InstagramIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-7.6h2.6l.4-3.1h-3V8.4c0-.9.3-1.5 1.5-1.5h1.6V4.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H7.8v3.1h2.6V21h3.1Z" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M3.5 20.5 4.8 16A8.5 8.5 0 1 1 8 19.3l-4.5 1.2Z" />
      <path
        d="M9.2 8.3c.2-.4.5-.4.8-.4h.4c.2 0 .4 0 .5.4l.6 1.4c.1.3 0 .5-.1.7l-.5.6c.6 1.1 1.4 1.9 2.5 2.5l.6-.5c.2-.2.4-.2.7-.1l1.4.6c.3.1.4.3.4.5v.4c0 .3 0 .6-.4.8-.5.3-1.2.5-1.9.3-2.4-.6-4.3-2.5-4.9-4.9-.2-.7 0-1.4.3-1.9Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function TruckIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7z" />
      <circle cx="6.5" cy="17.5" r="1.8" fill="white" />
      <circle cx="17" cy="17.5" r="1.8" fill="white" />
    </svg>
  );
}
