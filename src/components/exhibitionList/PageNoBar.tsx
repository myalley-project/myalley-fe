import React from "react";
import styled from "styled-components";
import arrowRightIcon from "../../assets/icons/arrowRight.svg";
import arrowLeftIcon from "../../assets/icons/arrowLeft.svg";
import arrowRightDoubleIcon from "../../assets/icons/arrowRightDouble.svg";
import arrowLeftDoubleIcon from "../../assets/icons/arrowLeftDouble.svg";
import { PagesState } from "../Pagination";

const PageNoBar = (props: PageNoBarType) => {
  const { pages, setPages, totalPage } = props;

  // 페이지 넘버 클릭 함수_박예선_23.01.16
  const clickPageNo = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newSelected = Number(e.currentTarget.innerHTML);
    if (newSelected !== pages.selected) {
      setPages({ ...pages, selected: newSelected });
    }
  };

  // 좌우 페이지 방향버튼 클릭 함수_박예선_23.01.16
  const handlePageArrow = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { started, selected } = pages;
    const { name } = e.currentTarget;
    if (!totalPage) return;
    if (name === "doubleMinus") {
      if (started !== 1) {
        setPages({ started: started - 5, selected: started - 1 });
      }
      if (started === 1) {
        setPages({ ...pages, selected: 1 });
      }
    }
    if (name === "minus") {
      if (selected === 1) return;
      if (started === selected) {
        setPages({ started: started - 5, selected: selected - 1 });
      }
      if (selected - started >= 1)
        setPages({ ...pages, selected: selected - 1 });
    }
    if (name === "plus") {
      if (totalPage === selected) return;
      if (selected - started < 4) {
        setPages({ ...pages, selected: selected + 1 });
      }
      if (started + 4 === selected) {
        setPages({ started: started + 5, selected: started + 5 });
      }
    }
    if (name === "doublePlus") {
      if (started >= totalPage - 4) {
        setPages({ ...pages, selected: totalPage });
      }
      if (started < totalPage - 4) {
        setPages({ started: started + 5, selected: started + 5 });
      }
    }
  };

  return (
    <PageNoContanier className={totalPage ? "" : "none"}>
      <button type="button" name="doubleMinus" onClick={handlePageArrow}>
        <img alt="double left icon" src={arrowLeftDoubleIcon} />
      </button>
      <button type="button" name="minus" onClick={handlePageArrow}>
        <img alt="left icon" src={arrowLeftIcon} />
      </button>
      {getPageNoArr(totalPage).map((pageNo) => {
        const { selected, started } = pages;
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
      <button type="button" name="plus" onClick={handlePageArrow}>
        <img alt="right icon" src={arrowRightIcon} />
      </button>
      <button type="button" name="doublePlus" onClick={handlePageArrow}>
        <img alt="double right icon" src={arrowRightDoubleIcon} />
      </button>
    </PageNoContanier>
  );
};

export default PageNoBar;

interface PageNoBarType {
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
