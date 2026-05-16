import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_HOME_CONTENT } from "../content/defaultHomeContent";
import { applySeoContent } from "../helpers/siteContent";
import { getPublicHomeContent } from "../services/public.service";

const SiteContentContext = createContext({
  content: DEFAULT_HOME_CONTENT,
  loading: true,
  refresh: async () => {},
});

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_HOME_CONTENT);
  const [loading, setLoading] = useState(true);

  async function loadContent() {
    setLoading(true);

    try {
      const response = await getPublicHomeContent();
      setContent(response || DEFAULT_HOME_CONTENT);
    } catch {
      setContent(DEFAULT_HOME_CONTENT);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContent();
  }, []);

  useEffect(() => {
    applySeoContent(content);
  }, [content]);

  const value = useMemo(
    () => ({
      content,
      loading,
      refresh: loadContent,
    }),
    [content, loading]
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
