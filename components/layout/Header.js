import { useState, useEffect } from "react";
import styles from "../../styles/Header.module.scss";
import NavigationLink from "../UI/NavigationLink";
import SidebarNav from "./SidebarNav";
import DesktopNavUI from "./DesktopNavUI";

const Header = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [render, setRender] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    setRender(true);
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <nav className={styles.navigation_bar}>
      <div>
        <NavigationLink href={"/"} className={styles.app_logo}>
          max your watts
        </NavigationLink>
      </div>
      {render && (
        <>
          {(windowSize.width <= 500 || windowSize.height <= 500) && (
            <SidebarNav />
          )}
          {windowSize.width > 500 && windowSize.height > 500 && (
            <DesktopNavUI />
          )}
        </>
      )}
    </nav>
  );
};

export default Header;
