import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SurfaceCard from "./app/SurfaceCard";
import FieldInput from "./app/FieldInput";
import { useAuth } from "../hooks/useAuth";
import { getErrorMessage, logClientError } from "../helpers/errors";
import { notifyError, notifySuccess } from "../helpers/notifications";
import { getAuthSchema } from "../validators/authSchemas";
import { INICIO, LOGIN, RECUPERAR_PASSWORD, REGISTRO, buildHomeSectionPath } from "../config/rutas";

const contentByMode = {
  login: {
    eyebrow: "Acceso",
    title: "Ingresar",
    description: "Entra para ver tus reservas y gestionar tu estadia.",
    submitLabel: "Ingresar",
  },
  register: {
    eyebrow: "Registro",
    title: "Registrate en Tacuifi",
    description: "Completa tus datos para reservar y seguir tu estadia.",
    submitLabel: "Registrarme",
  },
  forgot: {
    eyebrow: "Recuperacion",
    title: "Recuperar contrasena",
    description: "Te enviamos un enlace para volver a ingresar.",
    submitLabel: "Enviar enlace",
  },
  reset: {
    eyebrow: "Nueva contrasena",
    title: "Restablecer contrasena",
    description: "Elegi una nueva contrasena para continuar.",
    submitLabel: "Guardar contrasena",
  },
};

export default function AuthFormContent({ mode = "login", cardClassName = "", onOpenForgotPassword = null, onClose = null }) {
  const copy = contentByMode[mode];
  const { login, register, forgotPassword, resetPassword, authLoading } = useAuth();
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(getAuthSchema(mode)),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      token: params.get("token") || "",
    },
  });

  const password = form.watch("password");

  async function onSubmit(values) {
    try {
      if (mode === "login") {
        const destination = location.state?.from || "/mi-cuenta";
        await login({
          email: values.email,
          password: values.password,
        });
        await notifySuccess("Sesion iniciada", "Ya podes ver tus reservas.");
        navigate(destination, { replace: true });
        return;
      }

      if (mode === "register") {
        await register({
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          email: values.email,
          password: values.password,
        });
        await notifySuccess("Registro listo", "Ya podes reservar y gestionar tu estadia.");
        navigate("/mi-cuenta", { replace: true });
        return;
      }

      if (mode === "forgot") {
        const result = await forgotPassword(values.email);
        await notifySuccess(
          "Solicitud enviada",
          result?.resetUrl
            ? "Entorno local: el backend devolvio un enlace de recuperacion."
            : "Si el email existe, te enviamos un enlace de recuperacion."
        );
        return;
      }

      await resetPassword({
        token: values.token,
        password: values.password,
      });
      await notifySuccess("Contrasena actualizada", "Ya podes volver a iniciar sesion.");
      navigate(LOGIN, { replace: true });
    } catch (error) {
      logClientError(`auth:${mode}`, error, { route: location.pathname });
      notifyError("No se pudo completar la accion", getErrorMessage(error));
    }
  }

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="flex items-center">
        <div className="max-w-xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">{copy.eyebrow}</p>
          <h1 className="mt-5 font-display text-5xl leading-none text-zinc-900">{copy.title}</h1>
          <p className="mt-5 text-base leading-relaxed text-zinc-700">{copy.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={INICIO}
              className="rounded-2xl border border-emerald-900/10 bg-white/70 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-white"
            >
              Volver al sitio
            </Link>
            <Link
              to={buildHomeSectionPath("promociones")}
              className="rounded-2xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Ver promociones
            </Link>
          </div>
        </div>
      </div>

      <SurfaceCard className={`p-6 md:p-8 ${cardClassName}`.trim()}>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {mode === "register" ? (
            <div className="grid gap-4 md:grid-cols-2">
              <FieldInput
                label="Nombre"
                placeholder="Tu nombre"
                error={errors.firstName?.message}
                {...registerField("firstName")}
              />
              <FieldInput
                label="Apellido"
                placeholder="Tu apellido"
                error={errors.lastName?.message}
                {...registerField("lastName")}
              />
            </div>
          ) : null}

          {mode === "register" ? (
            <FieldInput
              label="Telefono"
              placeholder="+54 9 3546..."
              error={errors.phone?.message}
              {...registerField("phone")}
            />
          ) : null}

          {mode !== "reset" ? (
            <FieldInput
              label="Email"
              type="email"
              placeholder="nombre@email.com"
              error={errors.email?.message}
              {...registerField("email")}
            />
          ) : null}

          {mode === "reset" ? (
            <FieldInput
              label="Token"
              placeholder="Pega el token recibido"
              error={errors.token?.message}
              {...registerField("token")}
            />
          ) : null}

          {mode !== "forgot" ? (
            <FieldInput
              label="Contrasena"
              type="password"
              placeholder="Minimo 8 caracteres"
              error={errors.password?.message}
              {...registerField("password")}
            />
          ) : null}

          {mode === "register" ? (
            <FieldInput
              label="Confirmar contrasena"
              type="password"
              placeholder="Repeti la contrasena"
              error={errors.confirmPassword?.message}
              hint={password ? "Debe coincidir con la contrasena elegida." : undefined}
              {...registerField("confirmPassword")}
            />
          ) : null}

          <button
            type="submit"
            disabled={authLoading || isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {authLoading || isSubmitting ? "Procesando..." : copy.submitLabel}
          </button>
        </form>

        <div className="mt-6 space-y-2 text-sm text-zinc-600">
          {mode === "login" ? (
            <>
              <p>
                Todavia no te registraste?{" "}
                <Link
                  to={REGISTRO}
                  state={location.state}
                  className="font-semibold text-emerald-800 hover:text-emerald-700"
                >
                  Registrate
                </Link>
              </p>
              <p>
                Olvidaste tu contrasena?{" "}
                {onOpenForgotPassword ? (
                  <button
                    type="button"
                    onClick={onOpenForgotPassword}
                    className="font-semibold text-emerald-800 transition hover:text-emerald-700"
                  >
                    Recuperarla
                  </button>
                ) : (
                  <Link
                    to={RECUPERAR_PASSWORD}
                    state={location.state}
                    className="font-semibold text-emerald-800 hover:text-emerald-700"
                  >
                    Recuperarla
                  </Link>
                )}
              </p>
            </>
          ) : null}

          {mode === "register" ? (
            <p>
              Ya te registraste?{" "}
              <Link
                to={LOGIN}
                state={location.state}
                className="font-semibold text-emerald-800 hover:text-emerald-700"
              >
                Ingresar
              </Link>
            </p>
          ) : null}

          {mode === "forgot" ? (
            <p>
              Recordaste tu contrasena?{" "}
              {onClose ? (
                <button
                  type="button"
                  onClick={onClose}
                  className="font-semibold text-emerald-800 transition hover:text-emerald-700"
                >
                  Volver a ingresar
                </button>
              ) : (
                <Link
                  to={LOGIN}
                  state={location.state}
                  className="font-semibold text-emerald-800 hover:text-emerald-700"
                >
                  Volver a ingresar
                </Link>
              )}
            </p>
          ) : null}
        </div>
      </SurfaceCard>
    </div>
  );
}
