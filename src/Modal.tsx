import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  open: boolean | null;
  children: React.ReactNode;
}

const Modal = ({ open = null, children }: ModalProps) => {
  const domElement = document.getElementById("portal");
  return open
    ? ReactDOM.createPortal(children, domElement as HTMLElement)
    : null;
};

export default Modal;
