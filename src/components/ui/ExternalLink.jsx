function isExternalUrl(href) {
  return /^https?:\/\//i.test(href || '');
}

export default function ExternalLink({ href, children, variant = 'primary', ariaLabel }) {
  const external = isExternalUrl(href);

  return (
    <a
      className={`button button-${variant}`}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
    >
      {children}
    </a>
  );
}
