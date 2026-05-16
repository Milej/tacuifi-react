import { Fragment, useMemo } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { CalendarDays, ChevronDown, LayoutDashboard, LogOut, PencilLine, User } from "lucide-react";
import { MI_CUENTA, MI_PERFIL, MI_RESERVAS } from "../config/rutas";
import { getFullName } from "../helpers/formatters";

const menuItems = [
  {
    to: MI_CUENTA,
    label: "Mi cuenta",
    icon: LayoutDashboard,
  },
  {
    to: MI_PERFIL,
    label: "Editar perfil",
    icon: PencilLine,
  },
  {
    to: MI_RESERVAS,
    label: "Mis reservas",
    icon: CalendarDays,
  },
];

function resolveDisplayName(user) {
  const fullName = getFullName(user?.profile);
  if (fullName) return fullName;

  if (typeof user?.username === "string" && user.username.trim()) {
    return user.username.trim();
  }

  if (typeof user?.email === "string" && user.email.includes("@")) {
    return user.email.split("@")[0];
  }

  return "Mi cuenta";
}

function resolveInitials(name) {
  const words = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (words.length === 0) return "U";
  return words.map((word) => word.charAt(0).toUpperCase()).join("");
}

export default function UserMenu({ user, onLogout, onNavigate, compact = false }) {
  const displayName = useMemo(() => resolveDisplayName(user), [user]);
  const initials = useMemo(() => resolveInitials(displayName), [displayName]);

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className={[
          "inline-flex items-center gap-3 rounded-2xl border border-emerald-900/10 bg-white/80 text-left text-zinc-900 shadow-sm transition hover:bg-white",
          compact ? "h-10 w-10 justify-center px-0" : "px-3 py-2",
        ].join(" ")}
        aria-label={compact ? "Abrir menu de usuario" : `Abrir menu de ${displayName}`}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-900 text-xs font-semibold text-white">
          {initials || <User className="h-4 w-4" />}
        </span>
        {!compact ? (
          <>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{displayName}</span>
              <span className="block truncate text-xs text-zinc-500">{user?.email || "Cuenta activa"}</span>
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 text-zinc-500" />
          </>
        ) : null}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-[70] mt-3 w-64 origin-top-right rounded-3xl border border-emerald-900/10 bg-white p-2 shadow-xl focus:outline-none">
          <div className="rounded-2xl bg-[#fbf7ee] px-4 py-3">
            <p className="truncate text-sm font-semibold text-zinc-900">{displayName}</p>
            <p className="mt-1 truncate text-xs text-zinc-500">{user?.email || "Cuenta activa"}</p>
          </div>

          <div className="mt-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Menu.Item key={item.to}>
                  {({ active }) => (
                    <Link
                      to={item.to}
                      onClick={() => onNavigate?.()}
                      className={[
                        "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-zinc-700 transition",
                        active ? "bg-emerald-900/5 text-emerald-950" : "",
                      ].join(" ")}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </Menu.Item>
              );
            })}

            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={onLogout}
                  className={[
                    "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-rose-700 transition",
                    active ? "bg-rose-50" : "",
                  ].join(" ")}
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                  <span>Cerrar sesion</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
