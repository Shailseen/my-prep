import { QuestionCard } from "../../components/Navbar/QuestionCard/QuestionCard";
import styles from "./Questions.module.css"
export const Questions = () => {
  return (
    <div className={styles.questions_container}>
      <QuestionCard />
    </div>
  );
};
