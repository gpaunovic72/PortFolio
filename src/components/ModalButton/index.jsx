import { useState } from "react";
import { createPortal } from "react-dom";
import "../ModalButton/ModalButton.scss";
import ModalContent from "../ModalContent";

export default function ModalButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)} className="btnModal">
        g.paunovic.8@gmail.com
      </button>
      {showModal &&
        createPortal(
          <ModalContent closeModal={() => setShowModal(false)} />,
          document.body
        )}
    </div>
  );
}
