export default function Logo({ className = "", showWordmark = true }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} data-testid="weha-logo">
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* outer geometric hub */}
        <rect x="1.25" y="1.25" width="29.5" height="29.5" rx="8" stroke="currentColor" strokeWidth="1.6" />
        {/* connecting node lines */}
        <line x1="16" y1="16" x2="16" y2="6" stroke="currentColor" strokeWidth="1.4" />
        <line x1="16" y1="16" x2="24.5" y2="21" stroke="currentColor" strokeWidth="1.4" />
        <line x1="16" y1="16" x2="7.5" y2="21" stroke="currentColor" strokeWidth="1.4" />
        {/* nodes */}
        <circle cx="16" cy="6" r="2.3" fill="currentColor" />
        <circle cx="24.5" cy="21" r="2.3" fill="currentColor" />
        <circle cx="7.5" cy="21" r="2.3" fill="currentColor" />
        {/* central teal hub */}
        <circle cx="16" cy="16" r="3.2" fill="var(--weha-teal)" />
      </svg>
      {showWordmark && (
        <span className="weha-display text-2xl leading-none tracking-tight">
          WeHA
        </span>
      )}
    </span>
  );
}
