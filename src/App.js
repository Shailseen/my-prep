import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
}

export default App;
