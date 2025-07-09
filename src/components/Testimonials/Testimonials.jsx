import MainTitle from "../MainTitle/MainTitle";
import Subtitle from "../Subtitle/Subtitle";
import css from "./Testimonials.module.css";

const Testimonials = () => {
  return (
    <>
      <Subtitle className={css.subtitle}>User testimonials</Subtitle>
      <MainTitle className={css.mainTitle}>
        What do they say about us?
      </MainTitle>
    </>
  );
};

export default Testimonials;
