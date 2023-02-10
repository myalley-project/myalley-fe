import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import Button from "../atom/Button";
import SearchInput from "../atom/SearchInput";
import Selectbox from "../atom/Selectbox";
import { PagesState } from "../Pagination";
import { alertPreparing } from "../../utils/alerts";
import { FilterType } from "../../types/exhbList";

// 전시글 목록 상단 필터 컴포넌트_박예선_23.02.08
const Filters = (props: FiltersType) => {
  const { setPages, selectedStatus, setSelectedStatus, setSelectedFilter } =
    props;

  // 전시상황 버튼 클릭 함수_박예선_23.02.01
  const handleStatusBtn = (status: StatusType) => {
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
        setSelectedFilter(value);
      }
    }
  };

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
        <SearchInput
          placeholder="검색"
          onClick={() => alert("준비 중인 기능입니다.")}
          onKeyDown={(e) => {
            if (e.key === "Enter") alertPreparing();
          }}
        />
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
  setSelectedFilter: React.Dispatch<React.SetStateAction<FilterType>>;
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
      font-size: 14px;
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
