import React, { useState, useRef, useEffect } from "react";
import NavigationLink from "../UI/NavigationLink";
import styles from "../../styles/SidebarNav.module.scss";

const SidebarNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const btnRef = useRef();

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

  return (
    <div className={styles.sidebarNavContainer}>
      <button
        className={styles.menuButton}
        onClick={toggleSidebar}
        ref={btnRef}
      >
        {isOpen ? "cerrar" : "menu"}
      </button>

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
              <NavigationLink href="/authentication" onClick={handleLinkClick}>
                inicia sessión
              </NavigationLink>{" "}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarNav;
