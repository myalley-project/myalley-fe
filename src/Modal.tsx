import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  setIsOpen: () => void;
}

const Modal = ({ open = false, setIsOpen, children }: ModalProps) => {
  const domElement = document.getElementById("portal");

  return open
    ? ReactDOM.createPortal(
        <div>
          <OverLay onClick={setIsOpen} />
          {children}
        </div>,
        domElement as HTMLElement
      )
    : null;
};

export default Modal;

const OverLay = styled.section`
  position: fixed;
  inset: 0;
  background-color: rgba(0 0 0 / 0.7);
  z-index: 1000;
`;
