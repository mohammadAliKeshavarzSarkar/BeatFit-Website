import { useEffect, useId, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BeatfitCta } from "./BeatfitCta";
import { headerCta, headerMenu, nav, site } from "../content/home";
import { cn } from "../lib/cn";

const LOGO_SRC = "/assets/brand/beatfit-logo.svg";

type HeaderProps = {
  /**
   * auto — solid after scrolling past #top (default)
   * solid — always white header (light pages)
   * overlay — always transparent with light elements (dark pages)
   */
  appearance?: "auto" | "solid" | "overlay";
  /** @deprecated use appearance="solid" */
  solid?: boolean;
};

function NavLinks({
  onNavigate,
  variant,
}: {
  onNavigate?: () => void;
  variant: "desktop" | "mobile";
}) {
  const location = useLocation();

  const items = nav.map((item) => {
    const isActive = item.href.startsWith("/") && location.pathname === item.href;

    if (item.href.startsWith("/")) {
      return (
        <Link
          key={item.label}
          to={item.href}
          className={cn(isActive && "is-active")}
          aria-current={isActive ? "page" : undefined}
          onClick={onNavigate}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <a key={item.label} href={item.href} onClick={onNavigate}>
        {item.label}
      </a>
    );
  });

  if (variant === "desktop") {
    return <>{items}</>;
  }

  return (
    <ul className="bf-header__menu-list">
      {nav.map((item) => {
        const isActive = item.href.startsWith("/") && location.pathname === item.href;

        return (
          <li key={item.label} className="bf-header__menu-item">
            {item.href.startsWith("/") ? (
              <Link
                to={item.href}
                className={cn(isActive && "is-active")}
                aria-current={isActive ? "page" : undefined}
                onClick={onNavigate}
              >
                {item.label}
              </Link>
            ) : (
              <a href={item.href} onClick={onNavigate}>
                {item.label}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function Header({
  appearance,
  solid: solidProp = false,
}: HeaderProps) {
  const mode = appearance ?? (solidProp ? "solid" : "auto");
  const location = useLocation();
  const navId = useId();
  const [solid, setSolid] = useState(mode === "solid");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuIcon, setMenuIcon] = useState<"idle" | "open" | "closed">("idle");

  useEffect(() => {
    if (mode === "solid") {
      setSolid(true);
      return;
    }

    if (mode === "overlay") {
      setSolid(false);
      return;
    }

    const hero = document.getElementById("top");
    if (!hero) {
      setSolid(true);
      return;
    }

    const update = () => {
      const headerOffset = 96;
      setSolid(window.scrollY >= hero.offsetHeight - headerOffset);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [mode, location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
    setMenuIcon("idle");
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const headerSolid = solid && !menuOpen;

  return (
    <header
      className={cn(
        "bf-header",
        headerSolid && "is-solid",
        menuOpen && "is-menu-open",
        mode === "overlay" && "bf-header--overlay-mode",
      )}
      data-header-mode={mode}
      data-menu-icon={menuIcon}
      dir="rtl"
    >
      <div className="bf-header__inner">
        <Link className="bf-logo" to="/" aria-label={site.homeAriaLabel}>
          <img
            className="bf-logo__mark"
            src={LOGO_SRC}
            alt=""
            width={72}
            height={72}
            decoding="async"
          />
        </Link>

        <nav className="bf-nav bf-nav--desktop" aria-label="ناوبری اصلی">
          <NavLinks variant="desktop" />
        </nav>

        <div className="bf-header__actions">
          <BeatfitCta
            variant="header-outline"
            className="bf-header__cta"
            href={headerCta.href}
            rel="noopener noreferrer"
          >
            {headerCta.label}
          </BeatfitCta>

          <button
            type="button"
            className="bf-header__menu"
            aria-expanded={menuOpen}
            aria-controls={navId}
            aria-label={menuOpen ? headerMenu.closeLabel : headerMenu.openLabel}
            onClick={() =>
              setMenuOpen((open) => {
                const next = !open;
                setMenuIcon(next ? "open" : "closed");
                return next;
              })
            }
          >
            <span className="bf-header__menu-icon" aria-hidden="true">
              <span className="bf-header__menu-bar" />
              <span className="bf-header__menu-bar" />
              <span className="bf-header__menu-bar" />
            </span>
          </button>
        </div>
      </div>

      <nav
        id={navId}
        className={cn("bf-nav bf-nav--mobile", menuOpen && "is-open")}
        aria-label="ناوبری اصلی"
        aria-hidden={!menuOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) setMenuOpen(false);
        }}
      >
        <div className="bf-header__menu-panel" inert={menuOpen ? undefined : true}>
          <NavLinks variant="mobile" onNavigate={() => setMenuOpen(false)} />
          <div className="bf-header__menu-cta-row">
            <BeatfitCta
              variant="menu-on-dark"
              className="bf-header__menu-cta"
              href={headerCta.href}
              rel="noopener noreferrer"
              dir="rtl"
              onClick={() => setMenuOpen(false)}
            >
              {headerCta.label}
            </BeatfitCta>
          </div>
        </div>
      </nav>
    </header>
  );
}
