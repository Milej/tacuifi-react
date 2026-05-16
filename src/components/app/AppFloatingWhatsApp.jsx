import { useLocation } from "react-router-dom";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { useSiteContent } from "../../context/SiteContentContext";
import { DEFAULT_HOME_CONTENT } from "../../content/defaultHomeContent";

const hiddenPrefixes = ["/mi-cuenta", "/login", "/registro", "/recuperar", "/restablecer"];

export default function AppFloatingWhatsApp() {
  const location = useLocation();
  const { content } = useSiteContent();

  if (hiddenPrefixes.some((prefix) => location.pathname.startsWith(prefix))) {
    return null;
  }

  const siteConfig = content?.siteConfig || DEFAULT_HOME_CONTENT.siteConfig;
  const contactSection = content?.contactSection || DEFAULT_HOME_CONTENT.contactSection;

  return (
    <FloatingWhatsApp
      phoneNumber={`+${contactSection.whatsappPhone}`}
      accountName={siteConfig.siteName}
      avatar="/fondo-wa.png"
      statusMessage={siteConfig.floatingWhatsappStatus}
      chatMessage={siteConfig.floatingWhatsappMessage}
      placeholder={siteConfig.floatingWhatsappPlaceholder}
      allowClickAway
      allowEsc
      notification
      notificationSound
    />
  );
}
