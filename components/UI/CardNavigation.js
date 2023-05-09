import React from "react";
import Link from "next/link";
import styles from "../../styles/CardNavigation.module.scss";

const CardNavigation = ({ href, imageSrc, title, description }) => {
  return (
    <Link href={href} className={styles.card}>
      <div>
        {/* <img className={styles.cardImage} src={imageSrc} alt={title} /> */}
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDescription}>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardNavigation;
