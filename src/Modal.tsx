import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  open: boolean | null;
  children: React.ReactNode;
}

const Modal = ({ open = null, children }: ModalProps) => {
  if (!open) return null;
  const domElement = document.getElementById("portal");
  return domElement ? ReactDOM.createPortal(children, domElement) : null;
};

export default Modal;
