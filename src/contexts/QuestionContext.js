import { useContext } from "react";
import { createContext } from "react";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";

const QuestionContext = createContext();

const useQuestion = () => useContext(QuestionContext);

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
const firestore = getFirestore();

const QuestionProvider = ({ children }) => {
  const [data, setData] = useState();
  useEffect(() => {
    (async function() {
      const querySnapshot = await getDocs(collection(firestore, "questions"));
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push(doc.data());
      });
      setData(temp);
    })();
  }, []);

  return (
    <QuestionContext.Provider value={{ data }}>
      {children}
    </QuestionContext.Provider>
  );
};

export { useQuestion, QuestionProvider };
