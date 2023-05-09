import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "../../styles/SidebarNav.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import NavigationLink from "../UI/NavigationLink";
import AuthContext from "@/store/auth-context";

const SidebarNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const btnRef = useRef();
  const authCtx = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    toggleSidebar();
  };

  const handleClickOutside = (event) => {
    if (event.target === btnRef.current) {
      return;
    }

    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logOutHandler = () => {
    authCtx.logInFnx(false);
    authCtx.tokenFnx("");
    authCtx.emailFxn("");
    authCtx.nameFnx("");
    localStorage.removeItem("authObject");
  };

  return (
    <div className={styles.sidebarNavContainer}>
      <div className={styles.menuButton} onClick={toggleSidebar} ref={btnRef}>
        <MenuIcon />
      </div>

      <div
        ref={sidebarRef}
        className={`${styles.sidebarNav} ${isOpen ? styles.open : ""}`}
      >
        <nav>
          <ul>
            <li>
              <NavigationLink href="/" onClick={handleLinkClick}>
                pagina principal
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/events" onClick={handleLinkClick}>
                eventos
              </NavigationLink>{" "}
            </li>
            <li>
              <NavigationLink href="/events/personal" onClick={handleLinkClick}>
                organiza tu evento
              </NavigationLink>
            </li>
            {!authCtx.authObject.isLogIn && (
              <li>
                <NavigationLink
                  href="/authentication"
                  onClick={handleLinkClick}
                >
                  inicia sessión
                </NavigationLink>{" "}
              </li>
            )}
            {authCtx.authObject.isLogIn && (
              <>
                <li>
                  <NavigationLink
                    href="/authentication"
                    onClick={handleLinkClick}
                  >
                    perfil
                  </NavigationLink>{" "}
                </li>
                <li>
                  <NavigationLink
                    href="/authentication"
                    onClick={handleLinkClick}
                  >
                    mi cuenta
                  </NavigationLink>{" "}
                </li>
                <li
                  onClick={() => {
                    handleLinkClick();
                    logOutHandler();
                  }}
                >
                  cerrar sesión
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarNav;
