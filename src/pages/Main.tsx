import React from "react";
import Carousel from "../components/Carousel";
import MainArticle from "../components/MainArticle";
import ExhibitionChoiceCard from "../components/exhibition/ExhibitionChoiceCard";

const Main = () => (
  <div>
    <ExhibitionChoiceCard />
    <Carousel />
    <MainArticle />
  </div>
);

export default Main;
