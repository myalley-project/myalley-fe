import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import Button from "./atom/Button";

interface SimpleDialogProps {
  message: string;
  cancelMessage: string;
  confirmMessage: string;
  clickCancleBtn: () => void;
  clickConfirmBtn: () => void;
}

const SimpleDialog = ({
  message,
  cancelMessage,
  confirmMessage,
  clickCancleBtn,
  clickConfirmBtn,
}: SimpleDialogProps) => (
  <Dialog>
    <Message>
      <Title>{message}</Title>
    </Message>
    <Container>
      <Button
        variant="text"
        size="large"
        type="button"
        onClick={clickCancleBtn}
      >
        {cancelMessage}
      </Button>
      <Button
        variant="primary"
        size="large"
        type="button"
        onClick={clickConfirmBtn}
      >
        {confirmMessage}
      </Button>
    </Container>
  </Dialog>
);

export default SimpleDialog;

const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  background-color: #fff;
  z-index: 1000;
`;

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 380px;
  height: 116px;
  padding: 0px;
  margin-bottom: 30px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  padding: 0px;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: ${theme.colors.greys90};
  font-weight: 400;
  font-size: 20px;
  text-align: center;
`;
