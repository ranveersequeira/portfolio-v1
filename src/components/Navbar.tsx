import { ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__brand">
          <Link className="brand-lockup" to="/">
            <span className="brand-lockup__name">Ranveer Sequeira</span>
            <span className="brand-lockup__meta">AI frontend systems / internal DX tooling</span>
          </Link>

          <span className="header-status">
            <span className="header-status__dot" aria-hidden="true" />
            Building for AI product teams
          </span>
        </div>

        <nav className="site-nav" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              className={cn("site-nav__link", location.pathname === link.href && "is-active")}
              to={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a className="header-cta" href="mailto:ranveersequeira@gmail.com">
          Start a conversation
          <ArrowUpRight size={16} />
        </a>
      </div>
    </header>
  );
}
