import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import styles from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";

import { initializeApp } from "firebase/app";
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyB_buVcpv0maTgwt7MDjHM6ux0BFIUUg24",
  authDomain: "neogqod.firebaseapp.com",
  projectId: "neogqod",
  storageBucket: "neogqod.appspot.com",
  messagingSenderId: "4959195096",
  appId: "1:4959195096:web:c99195a7b4412c4fceacad",
  measurementId: "G-KZKGG29D9E",
};
initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <ToastContainer/>
      <Outlet />
    </div>
  );
}

export default App;
