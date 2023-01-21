import React from "react";
import styled from "styled-components";

const SimpleDialog = () => (
  <Dialog>
    <Container>
      <p>작성하신 내용을 정말 삭제하겠습니까?</p>
    </Container>
    <Container>
      <button type="button">취소하기</button>
      <button type="button">삭제하기</button>
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

const Container = styled.div`
  margin-inline: auto;
  margin-bottom: 30px;
`;
