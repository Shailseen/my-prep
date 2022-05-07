import * as React from "react";
import styles from "./Navbar.module.css";
import Button from "@mui/material/Button";
export default function Navbar() {
  return (
    <div className={styles.navbar_wrapper}>
      <div className={styles.header_wrapper}>
        <h1>
          <span>#</span>neogPrep
        </h1>
      </div>
      <div className={styles.button_wrapper}>
        <Button variant="contained">Log In</Button>
      </div>
    </div>
  );
}
