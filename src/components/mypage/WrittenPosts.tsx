import React from "react";
import { useLocation } from "react-router-dom";
import SubMenuBtns from "./SubMenuBtns";
import WrittenSimpleReviews from "./WrittenSimpleReview";
import WrittenMates from "./WrittenMate";
import WrittenBlogReviews from "./WrittenBlogReview";

const WrittenPosts = () => {
  const location = useLocation();
  const { search } = location;

  return (
    <div>
      <SubMenuBtns />
      {search.includes("?type=simple") && <WrittenSimpleReviews />}
      {search.includes("?type=blog") && <WrittenBlogReviews />}
      {search.includes("?type=mate") && <WrittenMates />}
    </div>
  );
};

export default WrittenPosts;
