import React, { useState, useEffect } from "react";
import styles from "../../styles/ImageCarousel.module.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ImageCarousel = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const handlePrevious = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [current]);

  const offset = -current * 100;

  return (
    <div className={styles.carousel}>
      <button
        className={[styles.arrow, styles.left_arrow].join(" ")}
        onClick={handlePrevious}
      >
        <ArrowBackIcon />
      </button>
      <div className={styles.card}>
        <div
          className={styles.slider}
          style={{ transform: `translateX(${offset}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.imageWrapper}>
              <img className={styles.image} src={image} alt="Carousel" />
            </div>
          ))}
        </div>
        <div className={styles.indicator}>
          {images.map((image, index) => (
            <span
              key={index}
              className={`${styles.dot} ${
                current === index ? styles.active : ""
              }`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
      <button
        className={[styles.arrow, styles.right_arrow].join(" ")}
        onClick={handleNext}
      >
        <ArrowForwardIcon />
      </button>
    </div>
  );
};

export default ImageCarousel;
