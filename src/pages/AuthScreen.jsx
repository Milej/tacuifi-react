import { useState } from "react";
import AuthFormContent from "../components/AuthFormContent";
import AuthModal from "../components/AuthModal";

export default function AuthScreen({ mode = "login", initialModalMode = null }) {
  const [activeModalMode, setActiveModalMode] = useState(initialModalMode);

  return (
    <>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(20,83,45,0.12),transparent_30%),linear-gradient(180deg,#f3f1eb,#ebe6dc)] px-4 pb-12 pt-28">
        <AuthFormContent mode={mode} onOpenForgotPassword={() => setActiveModalMode("forgot")} />
      </div>
      {activeModalMode ? <AuthModal mode={activeModalMode} onClose={() => setActiveModalMode(null)} /> : null}
    </>
  );
}
