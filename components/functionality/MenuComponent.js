import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "../../styles/MenuComponent.module.scss";
import Link from "next/link";
import AuthContext from "@/store/auth-context";

const MenuComponent = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const authCtx = useContext(AuthContext);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
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
    <div ref={menuRef} className={styles.menu}>
      <button onClick={handleToggleMenu} className={styles.menuButton}>
        preferencias
      </button>
      {isOpen && (
        <ul className={styles.menuList}>
          {menuItems.map((item, index) => {
            if (item.label === "cerrar sessión") {
              return (
                <li
                  key={index}
                  className={styles.menuItem}
                  onClick={logOutHandler}
                >
                  <p className={styles.menuLink}>{item.label}</p>
                </li>
              );
            }
            return (
              <li key={index} className={styles.menuItem}>
                <Link href={item.link} className={styles.menuLink}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MenuComponent;
