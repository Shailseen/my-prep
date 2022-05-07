import * as React from "react";
import styles from "./Navbar.module.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import classNames from "classnames";
export default function Navbar() {
  const { currentUser, logout } = useAuth();
  return (
    <div className={styles.navbar_wrapper}>
      <Link to="/" className={classNames(styles.header_wrapper,"link")}>
        <h1>
          <span>#</span>neogPrep
        </h1>
      </Link>
      <div className={styles.button_wrapper}>
        {currentUser && (
          <div className={styles.user_name}>{currentUser.displayName}</div>
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
