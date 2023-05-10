import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "../../styles/CarouselEvent.module.scss";
import EventCard from "./EventCard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CarouselEvent = ({ items, itemsPerPage, title }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const goNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const variants = {
    hidden: { opacity: 0, x: -200 },
    show: { opacity: 1, x: 0 },
  };

  if (!Array.isArray(items)) return null;

  return (
    <div>
      <h1 className={styles.title_container}>{title}</h1>
      <div className={styles.carousel}>
        <button
          className={styles.arrow}
          onClick={goPrevPage}
          disabled={currentPage === 0}
        >
          <ArrowBackIcon />
        </button>
        <div className={styles.carouselContainer}>
          {items
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
            .map((item, index) => (
              <motion.div
                key={index}
                className={styles.carouselItem}
                variants={variants}
                initial="hidden"
                animate="show"
              >
                <EventCard event={item} />
              </motion.div>
            ))}
        </div>
        <button
          className={styles.arrow}
          onClick={goNextPage}
          disabled={(currentPage + 1) * itemsPerPage >= items.length}
        >
          <ArrowForwardIcon />
        </button>
      </div>
    </div>
  );
};

export default CarouselEvent;
