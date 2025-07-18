import css from './RecipeMainInfo.module.css';
import Modal from "../../../Modal/Modal";
import SignInForm from "../../../Modal/SignInForm";
import SignUpForm from "../../../Modal/SignUpForm";
import { clearUsersError } from "../../../../redux/slices/usersSlice";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
const RecipeMainInfo = ({ data }) => {
  


  const navigate = useNavigate();
  const isAuthenticated = false; 
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const dispatch = useDispatch();

  const openSignIn = () => {
    dispatch(clearUsersError());
    setIsSignInOpen(true);
  };

  const openSignUp = () => {
    dispatch(clearUsersError());
    setIsSignUpOpen(true);
  };

  const closeSignIn = () => setIsSignInOpen(false);
  const closeSignUp = () => setIsSignUpOpen(false);

  const switchToSignUp = () => {
    closeSignIn();
    openSignUp();
  };
   const onAvatarClick = id => {
        if (isAuthenticated) {
            navigate(`/user/${id}`);
        } else {
        openSignIn()
        }
};
  const switchToSignIn = () => {
    closeSignUp();
    openSignIn();
  };

  
  return(
    <>
       <Modal isOpen={isSignInOpen} onClose={closeSignIn}>
        <SignInForm onClose={closeSignIn} onSwitchToSignUp={switchToSignUp} />
      </Modal>

      <Modal isOpen={isSignUpOpen} onClose={closeSignUp}>
        <SignUpForm onClose={closeSignUp} onSwitchToSignIn={switchToSignIn} />
      </Modal>
    <div className={css.recipeBox}>
      <h2 className={css.mainTitle}>{data.title}</h2>
    <div className={css.recipeMetrics}>
                    <p className={css.category}>{data.category.name}</p>
                    <p className={css.time}>{data.time} min</p>
                </div>
    <p className={css.recipeDescription}>{data.description}</p>
      <button className={css.userBox} type="button" onClick={() => onAvatarClick(data.user.id)}>
        <img src={data.user?.avatar} alt="user" className={css.userAvatar} />
        <p className={css.userName}>
        Created by: <br /> <span>{data.user?.name}</span>
        </p>
      </button>
      </div>
  </>
  // </div>
);
}
export default RecipeMainInfo;
