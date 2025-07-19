import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";
import img from "../../assets/img/hero";

// import { useState } from 'react';

const Hero = () => {
  const navigate = useNavigate();
  // const isLoggedIn = true;
  // const [showModal, setShowModal] = useState(false);
  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };

  // const handleAddRecipeButton = () => {
  //   if (!isLoggedIn) {
  //     setShowModal(true);
  //     return;
  //   }
  //   navigate('recipe/add');
  // };

  return (
    <>
      {/* {showModal && <Modal onClose={toggleModal} />} */}
      <section className={styles["hero-section"]}>
        <h1 className={styles.title}>
          Improve Your
          <br />
          Culinary Talents
        </h1>
        <p className={styles.desc}>
          Amazing recipes for beginners in the world of cooking, enveloping you
          in the aromas and tastes of various cuisines.
        </p>
        <button
          className={styles["hero-button"]}
          onClick={() => navigate("/recipe/add")}
        >
          Add Recipe
        </button>
        <div className={styles["hero-wrapper-img"]}>
          <div className={styles["hero-img-small"]}>
            <img
              width="128"
              src={img.imageSmall1x}
              srcSet={`${img.imageSmall1x} 1x,
                                    ${img.imageSmall2x} 2x,
                                    ${img.imageSmall2x} 3x`}
              alt="food"
            />
          </div>
          <div className={styles["hero-img-big"]}>
            <img
              width="302"
              src={img.imageBig1x}
              srcSet={`${img.imageBig1x} 1x,
                                    ${img.imageBig2x} 2x,
                                    ${img.imageBig2x} 3x`}
              alt="food"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
