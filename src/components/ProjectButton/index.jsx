import { useState } from "react";
import { createPortal } from "react-dom";
import ModalProject from "../ModalProject";
import "../ProjectButton/ProjectButton.scss";

export default function ProjectButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className="btnProjects" onClick={() => setShowModal(true)}>
        Voir le projet
      </button>
      {showModal &&
        createPortal(
          <ModalProject closeModal={() => setShowModal(false)} />,
          document.body
        )}
    </div>
  );
}
