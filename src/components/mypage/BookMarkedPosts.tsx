import React from "react";
import { useLocation } from "react-router-dom";
import WrittenMates from "./WrittenMates";
import SubMenuBtns from "./SubMenuBtns";

const BookMarkedPosts = () => {
  const location = useLocation();
  const { search } = location;
  return (
    <div>
      <SubMenuBtns />
      {search.includes("?type=mate") && <WrittenMates />}
    </div>
  );
};

export default BookMarkedPosts;
