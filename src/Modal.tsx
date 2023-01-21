import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

interface ModalProps {
  open: boolean | null;
  children: React.ReactNode;
}

const Modal = ({ open = null, children }: ModalProps) => {
  const domElement = document.getElementById("portal");
  return open
    ? ReactDOM.createPortal(
        <div>
          <OverLay />
          {children}
        </div>,
        domElement as HTMLElement
      )
    : null;
};

export default Modal;

const OverLay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0 0 0 / 0.7);
  z-index: 1000;
`;
