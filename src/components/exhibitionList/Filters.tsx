import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import Button from "../atom/Button";
import SearchInput from "../atom/SearchInput";
import Selectbox from "../atom/Selectbox";
import { PagesState } from "../Pagination";
import { FilterType, SortType } from "../../types/exhbList";

// 전시글 목록 상단 필터 컴포넌트_박예선_23.03.30
const Filters = (props: FiltersType) => {
  const {
    setPages,
    selectedStatus,
    setSelectedStatus,
    selectedFilter,
    setSelectedFilter,
  } = props;
  const [searchInput, setSearchInput] = useState(selectedFilter.title);

  // 전시상황 버튼 클릭 함수_박예선_23.03.30
  const handleStatusBtn = (status: StatusType) => {
    setSelectedFilter({ ...selectedFilter, title: "" });
    setSearchInput("");
    setPages({ started: 1, selected: 1 });
    setSelectedStatus(status);
  };

  // 필터 조건 핸들 함수_박예선_23.02.24
  const handleFilters = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.textContent;
    if (!value) return;
    for (let i = 0; i < EXHB_SORT_ARRAY.length; i += 1) {
      if (value === EXHB_SORT_ARRAY[i]) {
        setSelectedFilter({ ...selectedFilter, sort: value });
      }
    }
    for (let i = 0; i < EXHB_TYPE_ARRAY.length; i += 1) {
      if (value === EXHB_TYPE_ARRAY[i]) {
        setSelectedFilter({ ...selectedFilter, type: value });
      }
    }
  };

  const inputRef = React.createRef<HTMLInputElement>();

  return (
    <FiltersContainer>
      <div className="status-filter flex space-between">
        {EXHB_STATUS_ARRAY.map((status) => (
          <Button
            key={status}
            variant="text"
            size="small"
            onClick={() => handleStatusBtn(status)}
            className={selectedStatus === status ? "selected" : ""}
          >
            {status} 전시
          </Button>
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
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("준비 중인 기능입니다.");
          }}
        >
          <SearchInput ref={inputRef} placeholder="전시회 제목으로 찾기" />
        </form>
      </div>
    </FiltersContainer>
  );
};

export default Filters;

const EXHB_STATUS_ARRAY: StatusType[] = ["현재", "예정", "지난"];
const EXHB_SORT_ARRAY: SortType[] = ["최신순", "조회수순"];
const EXHB_TYPE_ARRAY: FilterType[] = [
  "전체 전시",
  "영상 전시",
  "특별 전시",
  "기획 전시",
  "상설 전시",
  "소장품 전시",
  "그림 전시",
  "사진 전시",
  "자유 출품 전시",
  "기타",
];

interface FiltersType {
  setPages: React.Dispatch<React.SetStateAction<PagesState>>;
  selectedStatus: StatusType;
  setSelectedStatus: React.Dispatch<React.SetStateAction<StatusType>>;
  selectedFilter: {
    type: FilterType;
    sort: SortType;
    title: string;
  };
  setSelectedFilter: React.Dispatch<
    React.SetStateAction<{
      type: FilterType;
      sort: SortType;
      title: string;
    }>
  >;
}
export type StatusType = "현재" | "예정" | "지난";

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 30px;
  .status-filter {
    width: 300px;
    height: 36px;
    margin-bottom: 14px;
    font-size: 14px;
    button {
      font-size: 16px;
      line-height: inherit;
      &.selected {
        color: ${theme.colors.greys100};
      }
    }
  }
  .filter-search-line {
    flex-wrap: wrap;
    gap: 10px;
    width: inherit;
    max-width: 1440px;
    padding-top: 14px;
    border-top: 1px solid ${(props) => props.theme.colors.greys40};
    border-radius: 0%;
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
  }
`;
