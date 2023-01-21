import React from "react";
import styled from "styled-components";
import Carousel from "../components/Carousel";
import MainArticle from "../components/MainArticle";

const Main = () => (
  <div>
    <Carousel />
    <MainArticle />
  </div>
);

export default Main;

const Container = styled.div`
  width: 1440px;
`;
