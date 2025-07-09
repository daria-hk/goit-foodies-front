import { useEffect, useState, useRef } from "react";
import MainTitle from "../MainTitle/MainTitle";
import Subtitle from "../Subtitle/Subtitle";
import css from "./Testimonials.module.css";

const AUTOPLAY_INTERVAL = 4000;

const Testimonials = ({ testimonials = [] }) => {
  const [current, setCurrent] = useState(0);
  const timer = useRef();

  useEffect(() => {
    timer.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearTimeout(timer.current);
  }, [current, testimonials.length]);

  if (!testimonials.length) return null;

  return (
    <section className={css.section}>
      <Subtitle className={css.subtitle}>User testimonials</Subtitle>
      <MainTitle className={css.mainTitle}>
        What do they say about us?
      </MainTitle>
      <div style={{ minHeight: 120, margin: "24px 0", textAlign: "center" }}>
        <blockquote className={css.blockquote}>
          “{testimonials[current].text}”
        </blockquote>
        <div className={css.author}>— {testimonials[current].author}</div>
      </div>
      <div className={css.dots}>
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrent(idx)}
            className={
              idx === current ? `${css.dot} ${css.dotActive}` : css.dot
            }
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
