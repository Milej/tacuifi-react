import { NavLink } from "react-router-dom";
import { accountRoutes } from "../../config/rutas";
import SurfaceCard from "./SurfaceCard";

export default function AccountSidebar() {
  return (
    <SurfaceCard className="p-4">
      <div className="space-y-1">
        {accountRoutes.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/mi-cuenta"}
            className={({ isActive }) =>
              [
                "flex rounded-2xl px-4 py-3 text-sm font-medium transition",
                isActive ? "bg-emerald-900 text-white shadow-sm" : "text-zinc-700 hover:bg-emerald-900/5",
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </SurfaceCard>
  );
}
