import React, { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";

const ErrorMessage = () => {
  const { errorMessage } = useContext(AppContext);

  useEffect(() => {
    const timer = setTimeout(() => {}, 1000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  return <div>ErrorMessage</div>;
};

export default ErrorMessage;
