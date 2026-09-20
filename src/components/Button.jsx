import { Link } from "react-router-dom";

// variant: "primary" | "outline" | "ghost"
export default function Button({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  ...rest
}) {
  const classes = `btn btn--${variant} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}