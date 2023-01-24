import React from "react";
import OnelineWrite from "../components/onelineReview/OnelineWrite";
import Modal from "../Modal";

const Main = () => (
  <Modal open setIsOpen={() => {}}>
    <OnelineWrite />
  </Modal>
);

export default Main;
