import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import UnidadDropdown from "./UnidadDropdown";
import UserMenu from "./UserMenu";
import { useAuth } from "../hooks/useAuth";
import { INICIO, LOGIN, REGISTRO } from "../config/rutas";
import { useSiteContent } from "../context/SiteContentContext";
import { DEFAULT_HOME_CONTENT } from "../content/defaultHomeContent";
import { buildHomeNavigation } from "../helpers/siteContent";

function resolveHomeHref(pathname, href) {
  return pathname === "/" ? href : `/${href}`;
}

function AuthButtons({ mobile = false, onNavigate }) {
  return (
    <>
      {/* <Link
        to={LOGIN}
        onClick={onNavigate}
        className={
          mobile
            ? "block w-full rounded-2xl border border-emerald-900/10 bg-white px-5 py-3 text-center text-base font-semibold"
            : "rounded-xl border border-emerald-900/10 bg-white/75 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-white"
        }
      >
        Ingresar
      </Link>
      <Link
        to={REGISTRO}
        onClick={onNavigate}
        className={
          mobile
            ? "block w-full rounded-2xl bg-emerald-800 px-5 py-3 text-center text-base font-semibold text-white transition hover:bg-emerald-700"
            : "rounded-xl bg-emerald-800 px-4 py-2 text-sm font-semibold text-white transition shadow-sm hover:bg-emerald-700"
        }
      >
        Registrarme
      </Link> */}
    </>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHomeHref, setActiveHomeHref] = useState("#inicio");
  const { user, isAuthenticated, initializing, logout } = useAuth();
  const { content } = useSiteContent();
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = useMemo(() => buildHomeNavigation(content || DEFAULT_HOME_CONTENT), [content]);
  const HOME_LINKS = navigation.homeLinks;
  const unidadesLinks = navigation.unitLinks;
  const TRACKED_HOME_HREFS = ["#inicio", ...unidadesLinks.map((item) => item.href), ...HOME_LINKS.map((item) => item.href)];

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 10;
      setScrolled((prev) => (prev === next ? prev : next));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveHomeHref("");
      return;
    }

    let rafId = 0;

    const updateActiveSection = () => {
      const offset = 112;
      let nextHref = "#inicio";

      TRACKED_HOME_HREFS.forEach((href) => {
        const section = document.getElementById(href.slice(1));
        if (!section) return;

        const sectionTop = section.getBoundingClientRect().top + window.scrollY - offset;
        if (window.scrollY >= sectionTop) nextHref = href;
      });

      setActiveHomeHref((prev) => (prev === nextHref ? prev : nextHref));
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateActiveSection);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  async function handleLogout() {
    await logout();
    setOpen(false);
    navigate(INICIO, { replace: true });
  }

  const Logo = ({ onClick }) => (
    <Link to="/" onClick={onClick} className="flex items-center select-none" aria-label="Ir a inicio">
      <img src="/logo.png" alt="Tacuifi" className="h-11 w-auto object-contain md:h-12" />
    </Link>
  );

  const isHomeActive = (href) => location.pathname === "/" && activeHomeHref === href;
  const isUnitsActive = unidadesLinks.some((item) => isHomeActive(item.href));

  const linkBase = "flex items-center rounded-xl px-3 py-2 text-sm transition";
  const linkIdle = "text-zinc-700 hover:bg-emerald-900/5 hover:text-emerald-900";
  const linkActive = "bg-emerald-900/10 text-emerald-950";
  const mobileLinkBase = "block rounded-2xl px-4 py-3 text-base font-medium transition";
  const mobileLinkIdle = "text-zinc-800 hover:bg-emerald-900/5";
  const mobileLinkActive = "bg-emerald-900/10 text-emerald-950";
  const getHomeLinkClassName = (href) => [linkBase, isHomeActive(href) ? linkActive : linkIdle].join(" ");

  const getMobileHomeLinkClassName = (href) =>
    [mobileLinkBase, isHomeActive(href) ? mobileLinkActive : mobileLinkIdle].join(" ");

  const getDesktopUnitItemClassName = (item) =>
    [
      "flex flex-col gap-0.5 rounded-xl px-3 py-2 text-sm transition",
      isHomeActive(item.href)
        ? "bg-emerald-900/10 text-emerald-950"
        : "text-zinc-800 hover:bg-emerald-900/5 hover:text-emerald-900",
    ].join(" ");

  const getMobileUnitItemClassName = (item) =>
    [
      "block rounded-2xl px-4 py-3 text-base transition",
      isHomeActive(item.href)
        ? "bg-emerald-900/10 text-emerald-950"
        : "text-zinc-800 hover:bg-emerald-900/5",
    ].join(" ");

  return (
    <>
      <header
        className={[
          "fixed left-0 right-0 top-0 z-50 border-b transition-colors duration-200",
          scrolled ? "border-emerald-900/10 bg-[#fbf7ee]/95 backdrop-blur" : "border-transparent bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            <Logo onClick={() => setOpen(false)} />

            <nav className="hidden items-center gap-1 lg:flex">
              <a
                href={resolveHomeHref(location.pathname, "#inicio")}
                onClick={() => setActiveHomeHref("#inicio")}
                className={getHomeLinkClassName("#inicio")}
              >
                Inicio
              </a>
              {unidadesLinks.length > 0 ? (
                <UnidadDropdown
                  label="Unidades"
                  items={unidadesLinks.map((item) => ({
                    ...item,
                    href: resolveHomeHref(location.pathname, item.href),
                  }))}
                  buttonClassName={isUnitsActive ? linkActive : ""}
                  getItemClassName={(item) =>
                    getDesktopUnitItemClassName({
                      ...item,
                      href: item.href.replace(/^\//, ""),
                    })
                  }
                />
              ) : null}
              {HOME_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={resolveHomeHref(location.pathname, item.href)}
                  onClick={() => setActiveHomeHref(item.href)}
                  className={getHomeLinkClassName(item.href)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              {initializing ? (
                <div className="h-11 w-48 animate-pulse rounded-2xl border border-emerald-900/10 bg-white/60" />
              ) : !isAuthenticated ? (
                <AuthButtons />
              ) : (
                <UserMenu user={user} onLogout={handleLogout} />
              )}
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              {isAuthenticated && !initializing ? <UserMenu user={user} onLogout={handleLogout} compact /> : null}
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-900/10 bg-[#fffaf0]/80 backdrop-blur transition hover:bg-[#fffaf0]"
                onClick={() => setOpen(true)}
                aria-label="Abrir menu"
                aria-expanded={open}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={[
          "fixed inset-0 z-[60] transition-opacity duration-200 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        aria-hidden={!open}
      >
        <button
          className="absolute inset-0 h-full w-full bg-black/35 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
          aria-label="Cerrar menu"
        />

        <div className="absolute inset-0 flex flex-col bg-[#fbf7ee]" role="dialog" aria-modal="true">
          <div className="flex h-16 items-center justify-between border-b border-emerald-900/10 px-4">
            <Logo onClick={() => setOpen(false)} />
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-900/10 bg-white/70 transition hover:bg-white"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5">
            <div className="mx-auto max-w-md">
              <a
                href={resolveHomeHref(location.pathname, "#inicio")}
                onClick={() => {
                  setActiveHomeHref("#inicio");
                  setOpen(false);
                }}
                className={getMobileHomeLinkClassName("#inicio")}
              >
                Inicio
              </a>
              <div className="mt-2">
                {unidadesLinks.length > 0 ? (
                  <UnidadDropdown
                    variant="inline"
                    label="Unidades"
                    items={unidadesLinks.map((item) => ({
                      ...item,
                      href: resolveHomeHref(location.pathname, item.href),
                    }))}
                    buttonClassName={isUnitsActive ? mobileLinkActive : ""}
                    getItemClassName={(item) =>
                      getMobileUnitItemClassName({
                        ...item,
                        href: item.href.replace(/^\//, ""),
                      })
                    }
                    onNavigate={() => setOpen(false)}
                  />
                ) : null}
              </div>
              <div className="mt-2 space-y-1">
                {HOME_LINKS.map((item) => (
                  <a
                    key={item.href}
                    href={resolveHomeHref(location.pathname, item.href)}
                    onClick={() => {
                      setActiveHomeHref(item.href);
                      setOpen(false);
                    }}
                    className={getMobileHomeLinkClassName(item.href)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                {initializing ? (
                  <div className="h-24 animate-pulse rounded-3xl border border-emerald-900/10 bg-white/60" />
                ) : !isAuthenticated ? (
                  <AuthButtons mobile onNavigate={() => setOpen(false)} />
                ) : (
                  <div className="rounded-3xl border border-emerald-900/10 bg-white/80 p-4 shadow-sm">
                    <p className="text-sm font-semibold text-zinc-900">{user?.profile?.firstName || user?.email || "Cuenta activa"}</p>
                    <p className="mt-1 text-xs text-zinc-500">Acceso rapido a tu cuenta</p>
                    <div className="mt-4 space-y-2">
                      <Link
                        to="/mi-cuenta"
                        onClick={() => setOpen(false)}
                        className="block rounded-2xl px-4 py-3 text-sm font-medium text-zinc-800 transition hover:bg-emerald-900/5"
                      >
                        Mi cuenta
                      </Link>
                      <Link
                        to="/mi-cuenta/perfil"
                        onClick={() => setOpen(false)}
                        className="block rounded-2xl px-4 py-3 text-sm font-medium text-zinc-800 transition hover:bg-emerald-900/5"
                      >
                        Editar perfil
                      </Link>
                      <Link
                        to="/mi-cuenta/reservas"
                        onClick={() => setOpen(false)}
                        className="block rounded-2xl px-4 py-3 text-sm font-medium text-zinc-800 transition hover:bg-emerald-900/5"
                      >
                        Mis reservas
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-rose-700 transition hover:bg-rose-50"
                      >
                        Cerrar sesion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
