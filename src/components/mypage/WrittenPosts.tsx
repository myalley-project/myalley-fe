import React from "react";
import { useLocation } from "react-router-dom";
import WrittenMates from "./WrittenMates";
import SubMenuBtns from "./SubMenuBtns";

const WrittenPosts = () => {
  const location = useLocation();
  const { search } = location;

  return (
    <div>
      <SubMenuBtns />
      {/* 한줄리뷰 컴포넌트, 블로그 리뷰 컴포넌트 추가해야함 */}
      {search.includes("?type=mate") && <WrittenMates />}
    </div>
  );
};

export default WrittenPosts;
