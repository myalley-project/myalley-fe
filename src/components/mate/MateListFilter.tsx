import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import Button from "../atom/Button";
import Selectbox from "../atom/Selectbox";
import SearchInput from "../atom/SearchInput";
import { alertPreparing } from "../../utils/alerts";

interface MateListFilterType {
  setMateStatusFilter: React.Dispatch<React.SetStateAction<MateStatusType>>;
}

// 메이트목록 상단 필터, 검색 컴포넌트_박예선_23.02.10
const MateListFilter = (props: MateListFilterType) => {
  const { setMateStatusFilter } = props;
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("authority") === "ROLE_ADMIN";

  // 필터 조건 핸들 함수_박예선_23.02.01
  const handleFilters = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const value = e.currentTarget.textContent;
    for (let i = 0; i < MATE_STATUS_ARRAY.length; i += 1) {
      if (value === MATE_STATUS_ARRAY[i]) {
        setMateStatusFilter(value);
      }
    }
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
        <SearchInput
          placeholder="검색"
          onClick={alertPreparing}
          onKeyDown={(e) => {
            if (e.key === "Enter") alertPreparing();
          }}
        />
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
  .flex {
    display: flex;
  }
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;
