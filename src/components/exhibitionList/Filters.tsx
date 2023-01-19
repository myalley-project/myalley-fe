import React from "react";
import styled from "styled-components";
import { ExhbTypeFilters, FilterType, PagesState } from "../../types/exhbList";

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
      alert("필터 적용버튼을 먼저 클릭하세요");
      return;
    }
    setPages({ started: 1, selected: 1 });
    setSelectedStatus(status);
  };

  // 필터 조건 핸들 함수_박예선_23.01.17
  const handleFilters = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === "인기순") {
      alert("준비 중인 기능입니다.");
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
        <div>
          <select className="sort border" onChange={handleFilters}>
            {EXHB_SORT_ARRAY.map((sort) => (
              <option key={sort} value={sort}>
                {sort}
              </option>
            ))}
          </select>
          <select
            value={exhbTypeFilters.selected}
            className="type border"
            onChange={handleFilters}
          >
            {EXHB_TYPE_ARRAY.map((type) => (
              <option key={type} value={type}>
                {type} 전시
              </option>
            ))}
          </select>
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
  "전체",
  "영상",
  "특별",
  "기획",
  "상설",
  "소장품",
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
    select,
    input,
    button {
      height: 36px;
      font-size: 14px;
      padding-left: 20px;
      cursor: pointer;
    }
    select {
      margin-right: 10px;
      border-radius: 30px;
      color: ${(props) => props.theme.colors.greys60};
      background: url("data:image/svg+xml,%3Csvg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.2998 1.69995L6.6998 6.29995C6.5998 6.39995 6.49147 6.47062 6.3748 6.51195C6.25814 6.55395 6.13314 6.57495 5.9998 6.57495C5.86647 6.57495 5.74147 6.55395 5.6248 6.51195C5.50814 6.47062 5.3998 6.39995 5.2998 6.29995L0.699804 1.69995C0.516471 1.51662 0.424804 1.28328 0.424804 0.999951C0.424804 0.716618 0.516471 0.483285 0.699804 0.299952C0.883137 0.116618 1.11647 0.024951 1.3998 0.0249509C1.68314 0.0249509 1.91647 0.116618 2.0998 0.299951L5.9998 4.19995L9.8998 0.299951C10.0831 0.116618 10.3165 0.0249505 10.5998 0.0249505C10.8831 0.0249505 11.1165 0.116618 11.2998 0.299951C11.4831 0.483284 11.5748 0.716618 11.5748 0.999951C11.5748 1.28328 11.4831 1.51662 11.2998 1.69995Z' fill='%239C9C9C'/%3E%3C/svg%3E%0A")
        no-repeat;
      background-size: 11.15px 6.55px;
      background-position: right 16px center;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      &.sort {
        width: 102px;
      }
      &.type {
        width: 117px;
      }
      &:focus {
        border: 1px solid #7f67be;
        outline: none;
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
