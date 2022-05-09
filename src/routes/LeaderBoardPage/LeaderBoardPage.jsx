import React from "react";
import { useState } from "react";
import styles from "./LeaderBoardPage.module.css";
import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  setDoc,
  Timestamp,
  addDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Box } from "@mui/system";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { async } from "@firebase/util";
import ClassNames from "classnames";

const firebaseConfig = {
  apiKey: "AIzaSyB_buVcpv0maTgwt7MDjHM6ux0BFIUUg24",
  authDomain: "neogqod.firebaseapp.com",
  projectId: "neogqod",
  storageBucket: "neogqod.appspot.com",
  messagingSenderId: "4959195096",
  appId: "1:4959195096:web:c99195a7b4412c4fceacad",
  measurementId: "G-KZKGG29D9E",
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore();

export const LeaderBoardPage = () => {
  useEffect(() => {
    document.title = "NEOFORCES | LEADERBOARD";
  });
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const q = query(collection(firestore, "users"));
    async function abs() {
      const temp = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        temp.push(doc.data());
      });
      const compare = (a, b) => {
        let scoreA = 0;
        let scoreB = 0;
        a.solvedQuestions.forEach((it) => (scoreA += it.score));
        b.solvedQuestions.forEach((it) => (scoreB += it.score));
        return scoreB - scoreA;
      };
      const sum = (a) => {
        let scoreA = 0;
        a.solvedQuestions.forEach((it) => (scoreA += it.score));
        return scoreA;
      };
      temp.sort((a, b) => compare(a, b));
      temp.forEach((it, index) => (temp[index].score = sum(it)));
      setUsers(temp);
    }
    abs();
  }, []);

  return (
    <>
      {users.map((item, i) => {
        return (
          <Box
          key={i}
            className={ClassNames(styles.card_container)}
            sx={{ minWidth: 275 }}
          >
            <Card
              variant="outlined"
              className={ClassNames(
                i === 0
                  ? styles.first
                  : i === 1
                  ? styles.second
                  : i === 2 && styles.third
              )}
            >
              <React.Fragment>
                <CardContent
                  className={ClassNames(
                    styles.card,
                    i === 0
                      ? styles.first
                      : i === 1
                      ? styles.second
                      : i === 2 && styles.third
                  )}
                >
                  <Typography
                    className={ClassNames(styles.name, i === 0 && styles.top)}
                    variant="p"
                    component="div"
                  >
                    {i+1}.{" "}{item.name}
                  </Typography>
                  <Typography
                    className={ClassNames(
                      i <= 2 ? styles.score : styles.score1
                    )}
                    variant="p"
                    component="div"
                  >
                    {item.score}
                  </Typography>
                </CardContent>
              </React.Fragment>
            </Card>
          </Box>

          //    <div key={i}>
          //    <h1>{i+1}. {item.name}</h1>
          //    <h1>{item.score}</h1>
          //    </div>
        );
      })}
    </>
  );
};
