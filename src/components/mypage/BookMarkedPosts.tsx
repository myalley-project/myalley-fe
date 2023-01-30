import React from "react";
import { useLocation } from "react-router-dom";
import SubMenuBtns from "./SubMenuBtns";
import BookMarkedExhb from "./BookMarkedExhb";
import BookMarkedBlog from "./BookMarkedBlog";
import BookMarkedMate from "./BookMarkedMate";

const BookMarkedPosts = () => {
  const location = useLocation();
  const { search } = location;
  return (
    <div>
      <SubMenuBtns />
      {search.includes("?type=exhibition") && <BookMarkedExhb />}
      {search.includes("?type=blog") && <BookMarkedBlog />}
      {search.includes("?type=mate") && <BookMarkedMate />}
    </div>
  );
};

export default BookMarkedPosts;
