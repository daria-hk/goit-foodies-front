import MainTitle from "../MainTitle/MainTitle";
import Subtitle from "../Subtitle/Subtitle";

const Hero = ({ onAddRecipeClick }) => (
  <section>
    <MainTitle>MainTitle Hero</MainTitle>
    <Subtitle>Subtitle Hero</Subtitle>
    <button type="button" onClick={onAddRecipeClick}>
      Add recipe
    </button>
  </section>
);

export default Hero;
