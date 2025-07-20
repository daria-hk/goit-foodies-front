import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PathInfo from "../../components/Common/PathInfo/PathInfo";
import MainTitle from "../../components/MainTitle/MainTitle";
import Subtitle from "../../components/Subtitle/Subtitle";
import UserInfo from "../../components/UserPage/UserInfo/UserInfo";
import TabsList from "../../components/UserPage/TabsList/TabsList";
import { logoutUser } from "../../redux/ops/usersOps";
import { selectUser, selectProfileUser } from "../../redux/slices/usersSlice";
import { fetchUserById } from "../../redux/ops/usersOps";
import styles from "./UserPage.module.css";

const UserPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentUser = useSelector(selectUser);
  const profileUser = useSelector(selectProfileUser);
  const isOwnProfile = currentUser && String(currentUser.id) === id;
  const user = isOwnProfile ? currentUser : profileUser;
  const userId = user?.id ?? id;

  useEffect(() => {
    if (!isOwnProfile && id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id, isOwnProfile]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Avatar selected:", file);
    }
  };

  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  const handleFollowToggle = () => {
    alert("Follow/Unfollow clicked");
  };

  return (
    <div className="container">
      <div className={styles.containerUserPage}>
        <PathInfo currentPageName="User Profile" />
        <div>
          <MainTitle className={styles.title}>Profile</MainTitle>
          <Subtitle className={styles.subtitle}>
            Reveal your culinary art, share your favorite recipe and create
            gastronomic masterpieces with us.
          </Subtitle>
        </div>
        <div className={styles.containerMainArea}>
          <div className={styles.userInfoWrapper}>
            <UserInfo
              user={{ ...user, isCurrentUser: isOwnProfile }}
              isOwnProfile={isOwnProfile}
              onAvatarChange={handleAvatarChange}
            />
            {isOwnProfile ? (
              <button
                type="button"
                onClick={handleLogOut}
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Log Out
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFollowToggle}
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                {user?.isFollowing ? "Following" : "Follow"}
              </button>
            )}
          </div>

          <div className={styles.contentWrapper}>
            {userId && (
              <TabsList userId={`${userId}`} isCurrent={isOwnProfile} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
