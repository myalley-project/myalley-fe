import React from "react";
import Editor from "../components/Editor";
import TimeSelect from "../components/blogreview/TimeSelect";
import ConvenienceSelect from "../components/blogreview/ConvenienceSelect";
import ExhibitionSelect from "../components/blogreview/ExhibitionSelect";

const Main = () => (
  <>
    <ExhibitionSelect />
    <TimeSelect />
    <ConvenienceSelect />
  </>
);

export default Main;
