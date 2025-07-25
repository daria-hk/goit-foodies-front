import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  selectTestimonials,
  selectTestimonialsIsLoading,
} from "../../redux/slices/testimonialsSlice";
import Subtitle from "../Subtitle/Subtitle";
import css from "./Testimonials.module.css";
import sprite from "../../assets/img/sprite.svg";

const Testimonials = () => {
  const testimonials = useSelector(selectTestimonials);
  const isLoading = useSelector(selectTestimonialsIsLoading);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextTestimonial = useCallback(() => {
    if (testimonials.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 300);
  }, [testimonials.length]);

  const handleDotClick = (index) => {
    if (index === currentIndex || testimonials.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, testimonials.length, nextTestimonial]);

  // Reset current index when testimonials change
  useEffect(() => {
    setCurrentIndex(0);
  }, [testimonials]);

  if (isLoading) {
    return (
      <section className={css.testimonialsSection}>
        <Subtitle className={css.subtitle}>What our customer say</Subtitle>
        <Subtitle className={css.mainTitle}>TESTIMONIALS</Subtitle>
        <div className={css.testimonialContainer}>
          <p>Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className={css.testimonialsSection}>
        <Subtitle className={css.subtitle}>What our customer say</Subtitle>
        <Subtitle className={css.mainTitle}>TESTIMONIALS</Subtitle>
        <div className={css.testimonialContainer}>
          <p>No testimonials available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={css.testimonialsSection}>
      <Subtitle className={css.subtitle}>What our customer say</Subtitle>
      <Subtitle className={css.mainTitle}>TESTIMONIALS</Subtitle>

      <div className={`${css.testimonialContainer}`}>
        <svg className={css.quoteIcon}>
          <use href={`${sprite}#icon-quote`} />
        </svg>
        <div
          className={`${css.testimonialContent} ${
            isTransitioning ? css.fadeOut : css.fadeIn
          }`}
        >
          <p className={css.testimonialText}>
            {testimonials[currentIndex].testimonial}
          </p>
          <p className={css.author}>{testimonials[currentIndex].owner.name}</p>
        </div>
      </div>

      <div className={css.navigationDots}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`${css.dot} ${
              index === currentIndex ? css.activeDot : ""
            }`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
