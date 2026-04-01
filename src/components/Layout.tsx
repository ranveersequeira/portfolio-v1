import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <div className="site-shell__noise" aria-hidden="true" />
      <div className="site-shell__glow site-shell__glow--one" aria-hidden="true" />
      <div className="site-shell__glow site-shell__glow--two" aria-hidden="true" />

      <Navbar />

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <span>Frontend systems for AI-native products.</span>
          <span>Designed with animated typography and pretext-driven layout.</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
