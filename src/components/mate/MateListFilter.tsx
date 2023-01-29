import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import Button from "../atom/Button";
import Selectbox from "../atom/Selectbox";
import { PagesState } from "../Pagination";

interface MateListFilterType {
  mateStatusFilter: MateStatusSelect;
  setMateStatusFilter: React.Dispatch<React.SetStateAction<MateStatusSelect>>;
  setPages: React.Dispatch<React.SetStateAction<PagesState>>;
}

// 메이트목록 상단 필터, 검색 컴포넌트_박예선_23.01.29
const MateListFilter = (props: MateListFilterType) => {
  const { mateStatusFilter, setMateStatusFilter, setPages } = props;
  const navigate = useNavigate();

  // 필터 조건 핸들 함수_박예선_23.01.26
  const handleFilters = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const value = e.currentTarget.textContent;
    for (let i = 0; i < MATE_STATUS_ARRAY.length; i += 1) {
      if (value === MATE_STATUS_ARRAY[i]) {
        setMateStatusFilter({ ...mateStatusFilter, selected: value });
      }
    }
  };

  // 필터 적용버튼 클릭 함수_박예선_23.01.27
  const clickFilterApplyBtn = () => {
    setMateStatusFilter({
      ...mateStatusFilter,
      applied: mateStatusFilter.selected,
    });
    setPages({ started: 1, selected: 1 });
  };

  return (
    <FilterContainer>
      <div className="flex">
        <Selectbox
          placeholder="전체"
          options={MATE_STATUS_ARRAY}
          width="130px"
          name="filters"
          onClick={handleFilters}
        />
        <Button
          variant="primary"
          size="small"
          className="filter-apply-btn"
          onClick={clickFilterApplyBtn}
        >
          적용
        </Button>
      </div>
      <div>
        <SearchInput
          placeholder="검색"
          onClick={() => alert("준비 중인 기능입니다.")}
          onKeyDown={(e) => {
            if (e.key === "Enter") alert("준비 중인 기능입니다.");
          }}
        />
        <Button
          variant="primary"
          size="small"
          className="mate-write-btn"
          onClick={() => {
            if (!localStorage.getItem("accessToken")) {
              alert("로그인이 필요합니다.");
              return;
            }
            navigate("/mate-write");
          }}
        >
          메이트 모집하기
        </Button>
      </div>
    </FilterContainer>
  );
};

export default MateListFilter;

export interface MateStatusSelect {
  selected: MateStatusType;
  applied: MateStatusType;
}

export type MateStatusType = "전체" | "모집 중" | "모집 완료";

const MATE_STATUS_ARRAY: MateStatusType[] = ["전체", "모집 중", "모집 완료"];

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
  padding-top: 14px;
  border-top: 1px solid ${theme.colors.greys40};
  border-radius: 0;
  .filter-apply-btn {
    display: flex;
    align-items: center;
    height: 36px;
    margin-left: 10px;
    font-size: 14px;
    line-height: 20px;
  }
  .mate-write-btn {
    width: 130px;
    margin-left: 10px;
    font-size: 14px;
    line-height: 20px;
  }
  .flex {
    display: flex;
  }
`;

const SearchInput = styled.input`
  width: 19.2vw;
  height: 36px;
  padding: 0 54px 0 20px;
  border: 1px solid ${theme.colors.greys40};
  background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='11' cy='11' r='6' stroke='%239C9C9C' stroke-width='2'/%3E%3Cpath d='M16.2071 14.7929L15.5 14.0858L14.0858 15.5L14.7929 16.2071L16.2071 14.7929ZM18.2929 19.7071C18.6834 20.0976 19.3166 20.0976 19.7071 19.7071C20.0976 19.3166 20.0976 18.6834 19.7071 18.2929L18.2929 19.7071ZM14.7929 16.2071L18.2929 19.7071L19.7071 18.2929L16.2071 14.7929L14.7929 16.2071Z' fill='%239C9C9C'/%3E%3C/svg%3E%0A")
    no-repeat;
  background-position: right 25px center;
  font-size: 14px;
  &::placeholder {
    color: ${(props) => props.theme.colors.greys60};
  }
  &:hover {
    cursor: text;
  }
`;
