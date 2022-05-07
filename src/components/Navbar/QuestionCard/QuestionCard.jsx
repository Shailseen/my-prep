import React from "react";
import { Card } from "@mui/material";
import { Box } from "@mui/system";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Chip } from "@mui/material";
import styles from "./QuestionCard.module.css";

export const QuestionCard = () => {
  return (
    <>
      <Box className={styles.card_container} sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <React.Fragment>
            <CardContent className={styles.card}>
              <Typography className={styles.question_wrapper} component="div">
                <Typography component="div">
                  <Typography variant="h5" component="div">
                    No. Question Name
                  </Typography>
                  <Typography
                    style={{ fontSize: "small", color: "grey" }}
                    component="p"
                  >
                    Some text like votes
                  </Typography>
                </Typography>
                <Typography
                  sx={{
                    color: "#fcdc00",
                    fontWeight: "bolder",
                    fontSize: "large",
                  }}
                  component="p"
                >
                  JS
                </Typography>
              </Typography>
              <Button variant="outlined" sx={{ width: "9rem" }} size="medium">
                Let's Do It
              </Button>
              <Typography className={styles.wrapper} component="div">
                <Typography className={styles.chips_wrapper} component="div">
                  <Chip
                    sx={{
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                    }}
                    label="Array"
                  />
                  <Chip
                    sx={{
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                    }}
                    label="String"
                  />
                </Typography>
                <Typography component="div">
                  <Button variant="text">Text</Button>
                </Typography>
              </Typography>
            </CardContent>
          </React.Fragment>
        </Card>
      </Box>
    </>
  );
};
