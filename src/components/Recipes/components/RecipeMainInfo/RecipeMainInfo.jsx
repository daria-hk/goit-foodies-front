import css from './RecipeMainInfo.module.css';

const RecipeMainInfo = ({ data,onUserClick }) => (
  //  <div className={css.recipeBox}>
  //   <img src={data.thumb} alt={data.title} className={css.recipeImg} width={551} height={400} /> 
    <div className={css.recipeBox}>
      <h2 className={css.mainTitle}>{data.title}</h2>
    <div className={css.recipeMetrics}>
                    <p className={css.category}>{data.category.name}</p>
                    <p className={css.time}>{data.time} min</p>
                </div>
    <p className={css.recipeDescription}>{data.description}</p>
      <button className={css.userBox} type="button" onClick={() => onUserClick(data.user.id)}>
        <img src={data.user?.avatar} alt="user" className={css.userAvatar} />
        <p className={css.userName}>
        Created by: <br /> <span>{data.user?.name}</span>
        </p>
      </button>
      </div>
  // </div>
);

export default RecipeMainInfo;
