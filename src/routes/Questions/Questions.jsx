import { QuestionCard } from "../../components/Navbar/QuestionCard/QuestionCard";
import styles from "./Questions.module.css";
import "firebase/firestore";
import { useQuestion } from "../../contexts/QuestionContext";
import { useEffect } from "react";

export const Questions = () => {
  useEffect(() => {
    document.title = "NEOFORCES | QUESTTIONS";
  })
  const {data} = useQuestion()
  return (
    <div className={styles.questions_container}>
      {data && data.map((items,index) => {
        return (
            <QuestionCard key={items.questionId} items={items} />
        );
      })}
    </div>
  );
};
