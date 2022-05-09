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
  getDocs,
  getDoc,
} from "firebase/firestore";
import { useTabContext } from "@mui/base";
import { useToast } from "../../contexts/ToastContext";
import { async } from "@firebase/util";

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
    useEffect(() => {
        document.title = "NEOFORCES | PROBLEM";
    })
  const { callToast } = useToast();
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
    title,
  } = data !== undefined && questionDetail;

  var parseTestcase = testCaseArr.map((it) => JSON.parse(it));
  var parseAnswerArray = answerArr.map((it) => JSON.parse(it));

  //   console.log(parseTestcase, parseAnswerArray);
  const testCase = data !== undefined && parseTestcase[0].toString();
  const answerTestcase = data !== undefined && parseAnswerArray[0].toString();
  useEffect(() => {
    setCode(signature);
  }, [data]);
  const navigate = useNavigate();

  const [compileMsg, setCompileMsg] = useState({status: "",statement: ""});

  const compileHandler = () => {
    let userCode = "";
    userCode += "const num = tc;";
    userCode += code;
    let temp = code.split(" ")[1];
    userCode += temp + "(num);";
    let tc = parseTestcase[0];
    var userAns = eval(userCode);
    if (JSON.stringify(userAns) !== JSON.stringify(parseAnswerArray[0])) {
        setCompileMsg((prev) => ({
            ...prev,
            status: false,
            statement: "Sample Testcase failed !!",
          }));
    } else {
        setCompileMsg((prev) => ({
            ...prev,
            status: true,
            statement: "Sample Testcase pass !!",
          }));
    }
  };

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
    let p = false,
      i;
    for (i = 0; i < parseTestcase.length; i++) {
      let tc = parseTestcase[i];
      var userAns = eval(userCode);
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

    console.log(currentUser);
    const docData = {
      codeText: code,
      score: i,
      user: currentUser.uid,
      title: title,
      date: Timestamp.fromDate(new Date()),
    };
    (async function() {
      await addDoc(collection(firestore, "submissions"), docData)
        .then(() => {
          callToast("Submitted succesfully");
        })
        .catch((error) => {
          callToast(error);
        });
    })();

    const docRef = doc(firestore, "users", `${currentUser.uid}`);
    async function check() {
      const docSnap = await getDoc(docRef);
      // console.log(docSnap)
      if (docSnap.exists()) {
        // console.log(docSnap.data())
        let solved = docSnap.data();
        let solvedQuestions = solved.solvedQuestions;
        console.log(solvedQuestions);
        let index = solvedQuestions.findIndex(
          (it) => it.questionId === questionId
        );
        if (index === -1) {
          solvedQuestions.push({ questionId: questionId, score: i });
        } else if (i > solvedQuestions[index].score) {
          solvedQuestions[index].score = i;
        }

        async function update() {
          await setDoc(doc(firestore, "users", `${currentUser.uid}`), solved);
        }
        update();
        console.log(index);
      } else {
        async function update() {
          await setDoc(doc(firestore, "users", `${currentUser.uid}`), {
            name: currentUser.displayName,
            solvedQuestions: [{ questionId: questionId, score: i }],
          });
        }
        update();
      }
    }
    check();

    // console.log(querySnapshot);
    //   const q = query(querySnapshot, where("solvedQuestions" ));
    //   console.log(doc.id, " => ", doc.data());
  };
  return (
    <div className={styles.pageContainer}>
      <Typography
        sx={{ textAlign: "center", padding: "1rem" }}
        component="h2"
        variant="div"
      >
        {title}
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
            size="medium"
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
            onClick={() => compileHandler()}
          >
            Run code
          </Button>
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

      {compileMsg.status ? (
        <Typography sx={{ color: "green" }}>
          {compileMsg.statement}
        </Typography>
      ) : (
        <Typography sx={{ color: "red" }}>
          {compileMsg.statement}
        </Typography>
      )}
    </div>
  );
};
