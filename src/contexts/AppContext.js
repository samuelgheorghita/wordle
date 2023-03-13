import { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const AppContext = createContext(null);

export const AppProvider = (props) => {
  const [solution, setSolution] = useState("");
  const [popularWords, setPopularWords] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const notify = (mess) => toast(mess);

  return (
    <AppContext.Provider
      value={{
        notify,
        solution,
        setSolution,
        popularWords,
        setPopularWords,
        errorMessage,
        setErrorMessage,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
