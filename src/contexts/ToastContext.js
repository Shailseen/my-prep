import { useContext } from "react";
import { createContext } from "react";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext();

const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const callToast = (msg) => {
    toast(msg)
  }
  return (
    <ToastContext.Provider value={{callToast}}>
      {children}
    </ToastContext.Provider>
  );
};

export { useToast, ToastProvider };
