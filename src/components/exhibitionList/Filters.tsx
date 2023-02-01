import React from "react";
import styled from "styled-components";
import { ExhbTypeFilters, FilterType } from "../../types/exhbList";
import Selectbox from "../atom/Selectbox";
import { PagesState } from "../Pagination";

// 전시글 목록 상단 필터 컴포넌트_박예선_23.01.18
const Filters = (props: FiltersType) => {
  const {
    setPages,
    selectedStatus,
    setSelectedStatus,
    exhbTypeFilters,
    setExhbTypeFilters,
    getExhbList,
  } = props;

  // 전시상황 버튼 클릭 함수_박예선_23.01.18
  const handleStatusBtn = (status: StatusType) => {
    if (exhbTypeFilters.applied !== exhbTypeFilters.selected) {
      alert("필터 적용버튼을 먼저 클릭하세요.");
      return;
    }
    setPages({ started: 1, selected: 1 });
    setSelectedStatus(status);
  };

  // 필터 조건 핸들 함수_박예선_23.02.01
  const handleFilters = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.textContent;
    if (!value) return;
    if (value === "인기순") {
      alert("준비중인 기능입니다.");
      return;
    }
    for (let i = 0; i < EXHB_TYPE_ARRAY.length; i += 1) {
      if (value === EXHB_TYPE_ARRAY[i]) {
        setExhbTypeFilters({ ...exhbTypeFilters, selected: value });
      }
    }
  };

  // 필터 적용버튼 클릭 함수_박예선_23.01.18
  const clickFilterApplyBtn = () => {
    return alert("준비중인 기능입니다."); // 백엔드 코드 수정되면 삭제
    getExhbList(selectedStatus, exhbTypeFilters.selected, 1);
    setExhbTypeFilters({
      ...exhbTypeFilters,
      applied: exhbTypeFilters.selected,
    });
    setPages({ started: 1, selected: 1 });
  };

  return (
    <FiltersContainer>
      <div className="status-filter flex space-between">
        {EXHB_STATUS_ARRAY.map((status) => (
          <button
            key={status}
            type="button"
            className={selectedStatus === status ? "selected" : ""}
            onClick={() => handleStatusBtn(status)}
          >
            {status} 전시
          </button>
        ))}
      </div>
      <div className="filter-search-line flex space-between">
        <div className="flex select-container">
          <Selectbox
            options={EXHB_SORT_ARRAY}
            placeholder="최신순"
            width="130px"
            name="sort"
            onClick={handleFilters}
          />
          <Selectbox
            options={EXHB_TYPE_ARRAY}
            placeholder="전체 전시"
            width="130px"
            name="type"
            onClick={handleFilters}
          />
          <button
            type="button"
            className="apply-btn"
            onClick={clickFilterApplyBtn}
          >
            적용
          </button>
        </div>
        <input placeholder="검색" className="search-input border" />
      </div>
    </FiltersContainer>
  );
};

export default Filters;

const EXHB_STATUS_ARRAY: StatusType[] = ["현재", "예정", "지난"];
const EXHB_SORT_ARRAY = ["최신순", "인기순"];
export const EXHB_TYPE_ARRAY: FilterType[] = [
  "전체 전시",
  "영상 전시",
  "특별 전시",
  "기획 전시",
  "상설 전시",
  "소장품 전시",
];

interface FiltersType {
  setPages: React.Dispatch<React.SetStateAction<PagesState>>;
  selectedStatus: StatusType;
  setSelectedStatus: React.Dispatch<React.SetStateAction<StatusType>>;
  exhbTypeFilters: ExhbTypeFilters;
  setExhbTypeFilters: React.Dispatch<React.SetStateAction<ExhbTypeFilters>>;
  getExhbList: (
    status: StatusType,
    type: FilterType,
    page: number
  ) => Promise<void>;
}
export type StatusType = "현재" | "예정" | "지난";

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: inherit;
  margin-bottom: 30px;
  .status-filter {
    width: 300px;
    height: 36px;
    margin-bottom: 14px;
    font-size: 14px;
    button {
      justify-content: center;
      align-items: center;
      width: 93px;
      height: inherit;
      color: ${(props) => props.theme.colors.greys60};
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      &.selected {
        color: #1c1c1c;
      }
    }
  }
  .filter-search-line {
    width: inherit;
    padding-top: 14px;
    border-top: 1px solid ${(props) => props.theme.colors.greys40};
    border-radius: 0%;
    input,
    button {
      height: 36px;
      font-size: 14px;
      padding-left: 20px;
      cursor: pointer;
    }
    .select-container {
      div {
        margin-right: 10px;
      }
    }
    .apply-btn {
      width: 66px;
      padding: 0;
      border-color: #6750a4;
      background-color: #6750a4;
      color: ${(props) => props.theme.colors.white100};
      font-weight: 700;
      &:active {
        background-color: #483974;
      }
    }
  }
  .search-input {
    width: 277px;
    padding-right: 54px;
    background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='11' cy='11' r='6' stroke='%239C9C9C' stroke-width='2'/%3E%3Cpath d='M16.2071 14.7929L15.5 14.0858L14.0858 15.5L14.7929 16.2071L16.2071 14.7929ZM18.2929 19.7071C18.6834 20.0976 19.3166 20.0976 19.7071 19.7071C20.0976 19.3166 20.0976 18.6834 19.7071 18.2929L18.2929 19.7071ZM14.7929 16.2071L18.2929 19.7071L19.7071 18.2929L16.2071 14.7929L14.7929 16.2071Z' fill='%239C9C9C'/%3E%3C/svg%3E%0A")
      no-repeat;
    background-position: right 25px center;
    &::placeholder {
      color: ${(props) => props.theme.colors.greys60};
    }
    &:hover {
      cursor: text;
    }
  }
`;
