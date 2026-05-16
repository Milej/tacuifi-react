import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingState from "./LoadingState";
import { useAuth } from "../../hooks/useAuth";
import { LOGIN, MI_CUENTA } from "../../config/rutas";

export function PrivateRoute() {
  const { initializing, isAuthenticated } = useAuth();
  const location = useLocation();

  if (initializing) {
    return <LoadingState label="Verificando sesión..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to={LOGIN} replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export function PublicOnlyRoute() {
  const { initializing, isAuthenticated } = useAuth();

  if (initializing) {
    return <LoadingState label="Preparando acceso..." />;
  }

  if (isAuthenticated) {
    return <Navigate to={MI_CUENTA} replace />;
  }

  return <Outlet />;
}
