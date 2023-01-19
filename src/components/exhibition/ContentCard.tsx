import React from "react";
import styled from "styled-components";

interface ContentCardtype {
  title: string;
  content: string;
}

const ContentCard = ({ title, content }: ContentCardtype) => (
  <CardContainer>
    <Card>
      <h1>{title}</h1>
      <p>{content}</p>
    </Card>
  </CardContainer>
);

export default ContentCard;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1200px;
  margin: 0px auto;
`;

const Card = styled.div`
  width: 83vw;
  height: fit-content;
  padding: 30px;
  border: 1px solid #e0e0e0;
  text-align: left;
  margin-bottom: 30px;
  h1 {
    font-weight: 700;
    font-size: 20px;
    line-height: 26px;
    letter-spacing: -0.5px;
    padding-bottom: 10px;
  }
  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 26px;
    letter-spacing: -0.5px;
    color: #000000;
  }
`;
