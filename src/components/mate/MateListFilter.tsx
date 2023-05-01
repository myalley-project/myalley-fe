import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import Button from "../atom/Button";
import Selectbox from "../atom/Selectbox";
import SearchInput from "../atom/SearchInput";

interface MateListFilterType {
  mateFilter: {
    status: MateStatusType;
    title: string;
  };
  setMateFilter: React.Dispatch<
    React.SetStateAction<{
      status: MateStatusType;
      title: string;
    }>
  >;
}

// 메이트목록 상단 필터, 검색 컴포넌트_박예선_23.05.01
const MateListFilter = (props: MateListFilterType) => {
  const { mateFilter, setMateFilter } = props;
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("authority") === "ROLE_ADMIN";
  const inputRef = React.createRef<HTMLInputElement>();

  // 필터 조건 핸들 함수_박예선_23.05.01
  const handleFilters = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const value = e.currentTarget.textContent;
    for (let i = 0; i < MATE_STATUS_ARRAY.length; i += 1) {
      if (value === MATE_STATUS_ARRAY[i]) {
        setMateFilter({ ...mateFilter, status: value });
      }
    }
  };

  // 검색창 입력어 제출(검색) 함수_박예선_23.05.01
  const submitSearchInput = () => {
    if (inputRef.current) {
      setMateFilter({ ...mateFilter, title: inputRef.current?.value });
    }
  };

  // 검색창 초기화 함수_박예선_23.05.01
  const clearSearchBar = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setMateFilter({ ...mateFilter, title: "" });
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
      </div>
      <div>
        <Button
          variant="primary"
          size="small"
          onClick={clearSearchBar}
          className="clear-btn"
        >
          초기화
        </Button>
        <form
          onSubmit={(e) => {
            submitSearchInput();
            e.preventDefault();
          }}
        >
          <SearchInput
            className="search-input"
            ref={inputRef}
            placeholder="모집글 제목으로 찾기"
          />
        </form>
        {!isAdmin && (
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
        )}
      </div>
    </FilterContainer>
  );
};

export default MateListFilter;

export type MateStatusType = "전체" | "모집 중" | "모집 완료";

const MATE_STATUS_ARRAY: MateStatusType[] = ["전체", "모집 중", "모집 완료"];

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
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
    font-size: 14px;
    line-height: 20px;
  }
  .clear-btn {
    display: flex;
    align-items: center;
    height: 36px;
  }
  .search-input {
    width: 277px;
  }
  .flex {
    display: flex;
  }
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;
