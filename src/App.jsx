import "./index.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppFloatingWhatsApp from "./components/app/AppFloatingWhatsApp";
import ToastViewport from "./components/ui/ToastViewport";
import Landing from "./pages/Landing";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import AccountLayout from "./pages/account/AccountLayout";
import AccountDashboardPage from "./pages/account/AccountDashboardPage";
import AccountProfilePage from "./pages/account/AccountProfilePage";
import AccountReservationsPage from "./pages/account/AccountReservationsPage";
import { PrivateRoute, PublicOnlyRoute } from "./components/app/RouteGuards";
import { store } from "./store";
import { useAppDispatch } from "./store/hooks";
import { fetchCurrentUser } from "./store/authSlice";
import { SiteContentProvider } from "./context/SiteContentContext";
import {
  INICIO,
  LOGIN,
  MI_CUENTA,
  MI_PERFIL,
  MI_RESERVAS,
  RECUPERAR_PASSWORD,
  REGISTRO,
  RESTABLECER_PASSWORD,
} from "./config/rutas";

function AppBootstrap() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (location.hash) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname, location.search, location.hash]);

  return (
    <div className="min-h-screen bg-[var(--tacuifi-bg)] text-zinc-900">
      <Navbar />
      <Routes>
        <Route path={INICIO} element={<Landing />} />

        <Route element={<PublicOnlyRoute />}>
          <Route path={LOGIN} element={<LoginPage />} />
          <Route path={REGISTRO} element={<RegisterPage />} />
          <Route path={RECUPERAR_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={RESTABLECER_PASSWORD} element={<ResetPasswordPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path={MI_CUENTA} element={<AccountLayout />}>
            <Route index element={<AccountDashboardPage />} />
            <Route path={MI_PERFIL.replace(`${MI_CUENTA}/`, "")} element={<AccountProfilePage />} />
            <Route path={MI_RESERVAS.replace(`${MI_CUENTA}/`, "")} element={<AccountReservationsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <AppFloatingWhatsApp />
      <ToastViewport />
    </div>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <SiteContentProvider>
          <AppBootstrap />
        </SiteContentProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
