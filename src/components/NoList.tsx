import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

const NoList = () => {
  console.log("d");
  return (
    <NoListContainer>
      <Content>아직 작성한 글이 없습니다</Content>
    </NoListContainer>
  );
};

export default NoList;

const NoListContainer = styled.div`
  width: inherit;
  min-height: 528px;
  display: flex;
  align-items: center;
`;

const Content = styled.p`
  width: inherit;
  font-weight: 500;
  font-size: 20px;
  color: ${theme.colors.greys40};
  text-align: center;
`;
