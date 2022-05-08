import React from "react";
import { Card } from "@mui/material";
import { Box } from "@mui/system";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Chip } from "@mui/material";
import styles from "./QuestionCard.module.css";
import { NavLink } from "react-router-dom";

export const QuestionCard = ({ items }) => {
  const { questionDetail, questionId } = items;
  const { question, tag, related } = questionDetail;
  const relatedTopic = JSON.parse(related);
  const title =
    question.length > 50 ? question.substring(0, 49).concat("...") : question;
  return (
    <>
      <Box className={styles.card_container} sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <React.Fragment>
            <CardContent className={styles.card}>
              <Typography className={styles.question_wrapper} component="div">
                <Typography component="div">
                  <Typography variant="h5" component="div">
                    {title}
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
              <NavLink className="link" to={`/editor/${questionId}`}>
                <Button variant="outlined" sx={{ width: "9rem" }} size="medium">
                  SOLVE NOW
                </Button>
              </NavLink>
              <Typography className={styles.wrapper} component="div">
                <Typography className={styles.chips_wrapper} component="div">
                  {relatedTopic.map((item, index) => (
                    <Chip
                      sx={{
                        backgroundColor: "var(--primary-color)",
                        color: "white",
                      }}
                      label={item}
                      key={index}
                    />
                  ))}
                </Typography>
                <Typography component="div">
                  {tag === "Easy" ? (
                    <Button sx={{ color: "green" }} variant="text">
                      Easy
                    </Button>
                  ) : tag === "Medium" ? (
                    <Button sx={{ color: "orange" }} variant="text">
                      Medium
                    </Button>
                  ) : (
                    <Button sx={{ color: "Hard" }} variant="text">
                      Hard
                    </Button>
                  )}
                </Typography>
              </Typography>
            </CardContent>
          </React.Fragment>
        </Card>
      </Box>
    </>
  );
};
