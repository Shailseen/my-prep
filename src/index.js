import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./routes/LandingPage/LandingPage";
import { LoginPage } from "./routes/LoginPage/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import { SignUpPage } from "./routes/SignupPage/SignupPage";
import { Questions } from "./routes/Questions/Questions";
import { QuestionProvider } from "./contexts/QuestionContext";
import { EditorPage } from "./routes/EditorPage/EditorPage";
import { Submissions } from "./routes/Submissions/Submissons";
import { LeaderBoardPage } from "./routes/LeaderBoardPage/LeaderBoardPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <QuestionProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/editor/:questionId" element={<EditorPage />} />
                <Route path="/submissions" element={<Submissions />} />
                <Route path="/leaderboard" element={<LeaderBoardPage />} />
              </Route>
            </Routes>
          </QuestionProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
