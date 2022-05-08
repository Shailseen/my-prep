import * as React from "react";
import { Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuestion } from "../../contexts/QuestionContext";
import styles from "./EditorPage.module.css";
import { CodeEditorEditable } from "react-code-editor-editable";
import "highlight.js/styles/dracula.css";
import SendIcon from "@mui/icons-material/Send";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  setDoc,
  Timestamp,
  addDoc,
  collection,
} from "firebase/firestore";

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

export const EditorPage = () => {
  const [code, setCode] = useState("");
  const { currentUser } = useAuth();
  const { questionId } = useParams();
  const { data } = useQuestion();
  const [isLoading, setIsLoading] = useState(false);

  function submitHandler() {}

  const [isTestcasePass, setIsTestcasePass] = useState({
    status: "",
    statement: "",
  });
  const questionItem =
    data && data.find((item) => item.questionId === questionId);

  const { questionDetail } = data !== undefined && questionItem;
  const {
    question,
    testCaseArr,
    answerArr,
    signature,
    tcDatatype,
    answerDatatype,
  } = data !== undefined && questionDetail;

  var parseTestcase = testCaseArr.map((it) => JSON.parse(it));
  var parseAnswerArray = answerArr.map((it) => JSON.parse(it));

  console.log(parseTestcase, parseAnswerArray);
  const testCase = data !== undefined && parseTestcase[0].toString();
  const answerTestcase = data !== undefined && parseAnswerArray[0].toString();
  useEffect(() => {
    setCode(signature);
  }, [data]);
  const navigate = useNavigate();


  const clickHandler = () => {
    !currentUser && navigate("/login");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    let userCode = "";
    userCode += "const num = tc;";
    userCode += code;
    let temp = code.split(" ")[1];
    userCode += temp + "(num);";
    // setCode(userCode);
    let p = false;
    for (let i = 0; i < parseTestcase.length; i++) {
      let tc = parseTestcase[i];
      var userAns = eval(userCode);
      console.log(userAns);
      if (JSON.stringify(userAns) !== JSON.stringify(parseAnswerArray[i])) {
        p = true;
        setTimeout(() => {
          setIsTestcasePass((prev) => ({
            ...prev,
            status: false,
            statement: `Testcase failed at (${i}/${parseTestcase.length}) !!`,
          }));
        }, 1000);
        break;
      }
    }
    if (p === false) {
      setTimeout(() => {
        setIsTestcasePass((prev) => ({
          ...prev,
          status: true,
          statement: `You are SuperMan😎!!! Testcase passed(${parseTestcase.length}/${parseTestcase.length})`,
        }));
      }, 1000);
    }
  }
  return (
    <div className={styles.pageContainer}>
      <Typography sx={{ textAlign: "center" }} component="h3" variant="div">
        Question Name
      </Typography>
      <Typography className={styles.question_container} variant="div">
        <Typography sx={{ marginTop: "0.5rem" }} variant="div">
          {questionItem && questionItem.questionDetail.question}
        </Typography>
        <Card className={styles.example_testcase_container} variant="outlined">
          <span
            style={{ fontWeight: "bolder", margin: "0rem 0rem 0.5rem 0rem" }}
          >
            Example
          </span>
          <Typography variant="div">
            {" "}
            <span style={{ fontWeight: "bolder" }}>Input:</span> {testCase}
          </Typography>
          <Typography variant="div">
            <span style={{ fontWeight: "bolder" }}>Output:</span>{" "}
            {answerTestcase}
          </Typography>
        </Card>
      </Typography>
      <div style={{ margin: "2rem 0rem" }}>
        <CodeEditorEditable
          value={code}
          setValue={(e) => setCode(e)}
          width="100%"
          height="50vh"
          language="javaScript"
          inlineNumbers
        />
      </div>

      <div className={styles.buttonContainer}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Language</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value="JavaScript"
            label="Language"
          >
            <MenuItem value={"JavaScript"}>JavaScript</MenuItem>
          </Select>
        </FormControl>
        <div className={styles.submitButtoncontainer}>
          <LoadingButton
            loading={isLoading}
            size="small"
            variant="contained"
            startIcon={<SendIcon />}
            onClick={() => clickHandler()}
          >
            Submit
          </LoadingButton>
          <Button
            sx={{ color: "green", border: "1px solid green" }}
            size="medium"
            variant="outlined"
            startIcon={<PlayArrowIcon />}
          ></Button>
        </div>
      </div>

      {isTestcasePass.status ? (
        <Typography sx={{ color: "green" }}>
          {isTestcasePass.statement}
        </Typography>
      ) : (
        <Typography sx={{ color: "red" }}>
          {isTestcasePass.statement}
        </Typography>
      )}
    </div>
  );
};