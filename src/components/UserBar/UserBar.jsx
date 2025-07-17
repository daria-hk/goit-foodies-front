import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/usersSlice";
import LogoutModal from "../Modal/LogoutModal";
import { useState } from "react";

const UserBar = () => {
  const user = useSelector(selectUser);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  console.log("User: ", user)

  return (
    <div>
      <span>{user?.username || user?.email || "User"}</span>
      <button onClick={() => setIsLogoutOpen(true)}>Logout</button>

      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
      />
    </div>
  );
};

export default UserBar;
