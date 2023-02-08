import React from "react";
import { useQuery } from "react-query";
import Carousel from "../components/Carousel";
import MainArticle from "../components/main/MainArticle";

const Main = () => (
  <div>
    <Carousel />
    <MainArticle />
  </div>
);

export default Main;
