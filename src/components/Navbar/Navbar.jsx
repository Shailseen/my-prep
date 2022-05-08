import * as React from "react";
import styles from "./Navbar.module.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const submissionHandler = () => {
    currentUser ? navigate("/submissions") : navigate("/login");
  };
  const leaderHandler = () => {
    navigate("/leaderboard");
  };
  return (
    <div className={styles.navbar_wrapper}>
      <Link to="/" className={classNames(styles.header_wrapper, "link")}>
        <h1>neoForces</h1>
      </Link>
      <div className={styles.linkContainer}>
        <Button
          variant="text"
          sx={{ fontWeight: "bolder" }}
          onClick={() => submissionHandler()}
        >
          Submissions
        </Button>
        <Button
          variant="text"
          sx={{ fontWeight: "bolder" }}
          onClick={() => leaderHandler()}
        >
          Leaderboard
        </Button>
      </div>
      <div className={styles.button_wrapper}>
        {currentUser && (
          <div className={styles.user_name}>{currentUser.displayName.substring(0,8)}</div>
        )}
        {currentUser ? (
          <Button onClick={logout} variant="contained">
            Log Out
          </Button>
        ) : (
          <Link to="/login" className="link">
            <Button variant="contained">Log In</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
