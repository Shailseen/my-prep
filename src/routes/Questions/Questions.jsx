import { QuestionCard } from "../../components/Navbar/QuestionCard/QuestionCard";
import styles from "./Questions.module.css";
import "firebase/firestore";
import { useQuestion } from "../../contexts/QuestionContext";

export const Questions = () => {
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
