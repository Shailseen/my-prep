import React from "react";
import { useState } from "react";
import styles from "./Submissions.module.css";
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

export const Submissions = () => {
  const { currentUser } = useAuth();
  const [submission, setSubmission] = useState([]);
  let temp = [];

  useEffect(() => {
    document.title = "NEOFORCES | SUBMISSIONS";
    const q = query(
      collection(firestore, "submissions"),
      where("user", "==", currentUser.uid),
      orderBy("date", "desc")
    );
    async function abs() {
      const temp = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        temp.push(doc.data());
        console.log(doc.id, " => ", doc.data());
      });
      setSubmission(temp);
    }
    abs();
  }, []);
  return (
    <>
      {submission.map((item, index) => {
          console.log(item.date.toDate().toString().substring(0,25))
        return (

          <Box className={styles.card_container} sx={{ minWidth: 275 }}>
            <Card variant="outlined">
              <React.Fragment>
                <CardContent
                  className={ClassNames(styles.card,
                    item.score === 10 ? styles.allCorrect : styles.wrong
                  )}
                >
                  <div>
                    <Typography variant="h6" component="div">
                      {index+1}.{" "}{item.title}
                    </Typography>
                    <Typography variant="p" component="div">
                      Score: {item.score}/10
                    </Typography>
                    <small style={{color: "black",fontWeight: "bolder"}}>{item.date.toDate().toString().substring(0,25)}</small>
                  </div>
                  <div>
                    {item.score === 10 && (
                      <iframe
                        style={{
                          width: "100%",
                          height: "3rem",
                          backgroundColor: "white",
                          border: "none",
                          position: "relative"
                        }}
                        src="https://embed.lottiefiles.com/animation/24907"
                      ></iframe>
                    )}
                  </div>
                </CardContent>
              </React.Fragment>
            </Card>
          </Box>
        );
      })}
    </>
  );
};