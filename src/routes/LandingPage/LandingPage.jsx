import ClassNames from "classnames";
import React from "react";
import styles from "./LandingPage.module.css";
import codeSvg from "../../assets/code.svg";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const theme = createTheme({
    palette: {
      secondary: {
        main: grey[900],
      },
    },
  });
  return (
    <div>
      <div className={styles.header}>
        Improve how you
        <span
          className={ClassNames(
            styles.from_pink,
            styles.bg_clip_text,
            styles.bg_gradient_to_r,
            styles.text_transparent,
            styles.to_blue
          )}
        >
          {" "}
          architect{" "}
        </span>
        code
      </div>
      <img
        style={{ margin: "0rem auto", width: "100%", height: "20rem" }}
        src={codeSvg}
        alt="codeSvg"
      />
      <div className={styles.description_wrapper}>
        <p>
          Programming isn't about what you know, it's about what you can figure
          out
        </p>
        <div className={styles.button_wrapper}>
          <Link to="/login" style={{textDecoration: "none"}}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              sx={{ width: "15rem" }}
            >
              LOG IN
            </Button>
          </Link>
          <ThemeProvider theme={theme}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              sx={{ width: "15rem" }}
            >
              GET STARTED
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
