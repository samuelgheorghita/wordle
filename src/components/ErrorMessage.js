import React, { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";

const ErrorMessage = () => {
  const { errorMessage } = useContext(AppContext);
  console.log("errorMessage: " + errorMessage);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("This will run after 1 second!");
    }, 1000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  return <div>ErrorMessage</div>;
};

export default ErrorMessage;
