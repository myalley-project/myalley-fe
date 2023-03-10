import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

const NoList = (props: { notice: string }) => {
  const { notice } = props;

  return (
    <NoListContainer>
      <Content>{notice}</Content>
    </NoListContainer>
  );
};

export default NoList;

const NoListContainer = styled.div`
  width: -webkit-fill-available;
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
