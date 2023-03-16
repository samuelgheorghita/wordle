import { useEffect } from "react";

export const useCloseOnEscapeKey = (setIsModalOn) => {
  const closeOnEscapeKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsModalOn(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);

    return () => document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
  }, []);
};
