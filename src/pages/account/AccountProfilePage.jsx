import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PageBanner from "../../components/app/PageBanner";
import SurfaceCard from "../../components/app/SurfaceCard";
import FieldInput from "../../components/app/FieldInput";
import LoadingState from "../../components/app/LoadingState";
import { getAccountDashboard, updatePassword, updateProfile } from "../../services/account.service";
import { notifyError, notifySuccess } from "../../helpers/notifications";
import { profilePasswordSchema, profileSchema } from "../../validators/accountSchemas";

const emptyProfile = {
  firstName: "",
  lastName: "",
  phone: "",
  documentNumber: "",
  birthDate: "",
};

export default function AccountProfilePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: emptyProfile,
  });
  const passwordForm = useForm({
    resolver: zodResolver(profilePasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  useEffect(() => {
    getAccountDashboard()
      .then((data) => {
        setUser(data.user);
        profileForm.reset({
          firstName: data.user.profile.firstName || "",
          lastName: data.user.profile.lastName || "",
          phone: data.user.profile.phone || "",
          documentNumber: data.user.profile.documentNumber || "",
          birthDate: data.user.profile.birthDate || "",
        });
      })
      .catch((error) => notifyError("No se pudo cargar el perfil", error.message))
      .finally(() => setLoading(false));
  }, [profileForm]);

  async function submitProfile(values) {
    try {
      const nextUser = await updateProfile(values);
      setUser(nextUser);
      profileForm.reset({
        firstName: nextUser.profile.firstName || "",
        lastName: nextUser.profile.lastName || "",
        phone: nextUser.profile.phone || "",
        documentNumber: nextUser.profile.documentNumber || "",
        birthDate: nextUser.profile.birthDate || "",
      });
      notifySuccess("Perfil actualizado", "Tus datos fueron guardados.");
    } catch (error) {
      notifyError("No se pudo guardar el perfil", error.message);
    }
  }

  async function submitPassword(values) {
    try {
      await updatePassword({ password: values.password });
      passwordForm.reset();
      notifySuccess("Contraseña actualizada", "La contraseña quedó modificada.");
    } catch (error) {
      notifyError("No se pudo actualizar la contraseña", error.message);
    }
  }

  if (loading) {
    return <LoadingState label="Cargando perfil..." />;
  }

  return (
    <>
      <PageBanner eyebrow="Mi perfil" title="Datos personales" description="Mantené tus datos al día." compact />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SurfaceCard className="p-6">
          <h2 className="text-xl font-semibold text-zinc-900">Perfil</h2>
          <p className="mt-2 text-sm text-zinc-600">Información básica para tus reservas.</p>
          <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={profileForm.handleSubmit(submitProfile)}>
            <FieldInput label="Nombre" error={profileForm.formState.errors.firstName?.message} {...profileForm.register("firstName")} />
            <FieldInput label="Apellido" error={profileForm.formState.errors.lastName?.message} {...profileForm.register("lastName")} />
            <FieldInput label="Email" value={user?.email || ""} disabled className="md:col-span-2" />
            <FieldInput label="Teléfono" error={profileForm.formState.errors.phone?.message} {...profileForm.register("phone")} />
            <FieldInput label="Documento" error={profileForm.formState.errors.documentNumber?.message} {...profileForm.register("documentNumber")} />
            <FieldInput label="Fecha de nacimiento" type="date" error={profileForm.formState.errors.birthDate?.message} {...profileForm.register("birthDate")} />
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={profileForm.formState.isSubmitting}
                className="rounded-2xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
              >
                {profileForm.formState.isSubmitting ? "Guardando..." : "Guardar perfil"}
              </button>
            </div>
          </form>
        </SurfaceCard>

        <SurfaceCard className="p-6">
          <h2 className="text-xl font-semibold text-zinc-900">Seguridad</h2>
          <p className="mt-2 text-sm text-zinc-600">Actualizá tu contraseña cuando lo necesites.</p>
          <form className="mt-6 space-y-4" onSubmit={passwordForm.handleSubmit(submitPassword)}>
            <FieldInput
              label="Nueva contraseña"
              type="password"
              error={passwordForm.formState.errors.password?.message}
              {...passwordForm.register("password")}
            />
            <button
              type="submit"
              disabled={passwordForm.formState.isSubmitting}
              className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60"
            >
              {passwordForm.formState.isSubmitting ? "Actualizando..." : "Cambiar contraseña"}
            </button>
          </form>
        </SurfaceCard>
      </div>
    </>
  );
}
