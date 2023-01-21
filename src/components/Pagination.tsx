import React from "react";
import styled from "styled-components";
import arrowRight from "../assets/icons/arrowRight.svg";
import arrowLeft from "../assets/icons/arrowLeft.svg";
import arrowRightDouble from "../assets/icons/arrowRightDouble.svg";
import arrowLeftDouble from "../assets/icons/arrowLeftDouble.svg";
import { PagesState } from "../types/exhbList";

// 페이지네이션 컴포넌트_박예선_23.01.21
const Pagination = (props: PaginationType) => {
  const { pages, setPages, totalPage } = props;
  const { started, selected } = pages;

  // 페이지 넘버 클릭 함수_박예선_23.01.16
  const clickPageNo = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newSelected = Number(e.currentTarget.innerHTML);
    if (newSelected !== pages.selected) {
      setPages({ ...pages, selected: newSelected });
    }
  };

  // 좌우 페이지 방향버튼 클릭 함수_박예선_23.01.16
  const handlePageArrow = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    if (!totalPage) return;
    if (name === "leftDouble") {
      if (started !== 1) {
        setPages({ ...pages, started: started - 5, selected: started - 1 });
      }
      if (started === 1) {
        setPages({ ...pages, selected: 1 });
      }
    }
    if (name === "left") {
      if (selected === 1) return;
      if (started === selected) {
        setPages({ ...pages, started: started - 5, selected: selected - 1 });
      }
      if (selected - started >= 1)
        setPages({ ...pages, selected: selected - 1 });
    }
    if (name === "right") {
      if (totalPage === selected) return;
      if (selected - started < 4) {
        setPages({ ...pages, selected: selected + 1 });
      }
      if (started + 4 === selected) {
        setPages({ ...pages, started: started + 5, selected: started + 5 });
      }
    }
    if (name === "rightDouble") {
      if (started >= totalPage - 4) {
        setPages({ ...pages, selected: totalPage });
      }
      if (started < totalPage - 4) {
        setPages({ ...pages, started: started + 5, selected: started + 5 });
      }
    }
  };

  return (
    <PageNoContanier className={totalPage ? "" : "none"}>
      <button type="button" name="leftDouble" onClick={handlePageArrow}>
        <img alt="double left icon" src={arrowLeftDouble} />
      </button>
      <button type="button" name="left" onClick={handlePageArrow}>
        <img alt="left icon" src={arrowLeft} />
      </button>
      {getPageNoArr(totalPage).map((pageNo) => {
        if (pageNo >= started && pageNo <= started + 4) {
          return (
            <button
              onClick={clickPageNo}
              className={pageNo === selected ? "selected" : ""}
              key={pageNo}
              type="button"
            >
              {pageNo}
            </button>
          );
        }
        return null;
      })}
      <button type="button" name="right" onClick={handlePageArrow}>
        <img alt="right icon" src={arrowRight} />
      </button>
      <button type="button" name="rightDouble" onClick={handlePageArrow}>
        <img alt="double right icon" src={arrowRightDouble} />
      </button>
    </PageNoContanier>
  );
};

export default Pagination;

interface PaginationType {
  pages: PagesState;
  setPages: React.Dispatch<React.SetStateAction<PagesState>>;
  totalPage: number;
}

// 페이지 번호 배열 반환 함수_박예선_23.01.18
function getPageNoArr(totalPage: number) {
  const newArr = [];
  for (let i = 1; i < totalPage + 1; i += 1) {
    newArr.push(i);
  }
  return newArr;
}

const PageNoContanier = styled.div`
  display: flex;
  justify-content: space-between;
  width: 326px;
  height: 30px;
  margin-bottom: 50px;
  button {
    width: 30px;
    height: 30px;
    padding: 0;
    font-weight: 500;
    cursor: pointer;
    &.selected {
      background-color: #6750a4;
      color: ${(props) => props.theme.colors.white100};
    }
  }
`;
