import React from "react";
import styled from "styled-components";
import arrowRight from "../assets/icons/arrowRight.svg";
import arrowLeft from "../assets/icons/arrowLeft.svg";
import arrowRightDouble from "../assets/icons/arrowRightDouble.svg";
import arrowLeftDouble from "../assets/icons/arrowLeftDouble.svg";
import { theme } from "../styles/theme";

// 페이지네이션 컴포넌트_박예선_23.01.25
const Pagination = (props: PaginationType) => {
  const { pages, setPages, totalPage } = props;
  const { started, selected } = pages;

  // 페이지 넘버 클릭 함수_박예선_23.01.21
  const clickPageNo = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newSelected = Number(e.currentTarget.innerHTML);
    setPages({ ...pages, selected: newSelected });
  };

  // 전전 화살표 클릭 함수_박예선_23.01.21
  const clickArrowLeftDouble = () => {
    if (started === 1) {
      setPages({ ...pages, selected: 1 });
      return;
    }
    if (started === selected) {
      setPages({ started: started - 5, selected: started - 5 });
      return;
    }
    setPages({ ...pages, selected: started });
  };

  // 이전 화살표 클릭 함수_박예선_23.01.21
  const clickArrowLeft = () => {
    if (started === selected) {
      setPages({ started: started - 5, selected: selected - 1 });
      return;
    }
    setPages({ ...pages, selected: selected - 1 });
  };

  // 다다음 화살표 클릭 함수_박예선_23.01.21
  const clickArrowRightDouble = () => {
    if (selected !== started + 4) {
      setPages({ ...pages, selected: started + 4 });
      if (started >= totalPage - 4) {
        setPages({ ...pages, selected: totalPage });
      }
      return;
    }
    if (started + 4 >= totalPage - 5) {
      setPages({ started: started + 5, selected: totalPage });
      return;
    }
    if (selected === started + 4) {
      setPages({ started: started + 5, selected: selected + 5 });
    }
  };

  // 다음 화살표 클릭 함수_박예선_23.01.21
  const clickArrowRight = () => {
    if (selected < started + 4) {
      setPages({ ...pages, selected: selected + 1 });
      return;
    }
    if (selected === started + 4) {
      setPages({ started: started + 5, selected: started + 5 });
    }
  };

  return (
    <PaginationContainer className={`${totalPage ? "" : "none"}`}>
      <div className="flex">
        <ArrowBtn
          type="button"
          onClick={clickArrowLeftDouble}
          disabled={selected === 1}
        >
          <img alt="double left icon" src={arrowLeftDouble} />
        </ArrowBtn>
        <ArrowBtn
          type="button"
          onClick={clickArrowLeft}
          disabled={selected === 1}
        >
          <img alt="left icon" src={arrowLeft} />
        </ArrowBtn>
      </div>
      {getPageNoArr(totalPage).map((pageNo) => {
        if (pageNo >= started && pageNo <= started + 4) {
          return (
            <PageNoBtn
              type="button"
              key={pageNo}
              className={pageNo === selected ? "selected" : ""}
              onClick={clickPageNo}
              disabled={pageNo === selected}
            >
              {pageNo}
            </PageNoBtn>
          );
        }
        return null;
      })}
      <div className="flex">
        <ArrowBtn
          type="button"
          onClick={clickArrowRight}
          disabled={selected === totalPage}
        >
          <img alt="right icon" src={arrowRight} />
        </ArrowBtn>
        <ArrowBtn
          type="button"
          onClick={clickArrowRightDouble}
          disabled={selected === totalPage}
        >
          <img alt="double right icon" src={arrowRightDouble} />
        </ArrowBtn>
      </div>
    </PaginationContainer>
  );
};

export default Pagination;

export interface PagesState {
  started: number;
  selected: number;
}

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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 326px;
  height: 30px;
  margin: 30px 0 50px;
  margin-inline: auto;
  button {
    width: 30px;
    height: 30px;
    padding: 0;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    :hover {
      background-color: ${theme.colors.greys40};
    }
    &:focus-visible {
      border: 1px solid ${theme.colors.primry80};
      border-radius: 0;
    }
  }
  .flex {
    display: flex;
  }
`;

const ArrowBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageNoBtn = styled.button`
  color: ${theme.colors.greys60};
  &.selected {
    background-color: ${theme.colors.primry70};
    color: ${theme.colors.white100};
    :hover {
      background-color: ${theme.colors.primry70};
    }
  }
`;
