import React, { useContext } from "react";
import { IoTrophySharp } from "react-icons/io5";
import { BsXLg } from "react-icons/bs";

import { AppContext } from "../contexts/AppContext";

const Modal = ({ isCorrect, isGameEnded, turn, setIsCorrect, setTurn }) => {
  const { solution } = useContext(AppContext);

  const closeModal = () => {
    setIsCorrect(false);
    setTurn(7);
  };

  return (
    <div className={`modal ${isGameEnded ? "visible" : ""}`} onClick={closeModal}>
      <div className={`modal__content ${isGameEnded ? "visible" : ""}`} onClick={(e) => e.stopPropagation()}>
        <div>
          {isCorrect && <IoTrophySharp className="icon-trophy" />}
          {/* <img src={trophyImg} alt="" /> */}
          <div className="victory">{isCorrect ? "Congratulations!" : "Unfortunate!"}</div>
          <div className="message">{isCorrect ? `You completed Wordle in ${turn} tries!` : "You'll get it next time!"}</div>
          {!isCorrect && (
            <div className="solution">
              The correct word was
              <div>{solution}</div>
            </div>
          )}
          <BsXLg className="icon-x" onClick={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
