import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMateDeleteApi } from "../../apis/mate";
import { theme } from "../../styles/theme";
import { MateRes } from "../../types/mate";
import ExhbCard from "./ExhbCard";

interface MateTopType {
  isMyPost: boolean;
  mateId: number;
  mateInfo: MateRes;
}

// 메이트 상세페이지 상단 배경색 있는 부분 컴포넌트_박예선_23.02.08
const MateTop = (props: MateTopType) => {
  const { isMyPost, mateId, mateInfo } = props;
  const navigate = useNavigate();
  const mateDeleteApi = useMateDeleteApi();

  // 메이트글 삭제 api 호출_박예선_23.01.31
  const clickDeleteBtn = async () => {
    await mateDeleteApi(mateId);
  };

  return (
    <MateTopContainer>
      <TopBtnsContainer>
        <div>
          <BtnTransparent onClick={() => navigate("/mate-list")}>
            목록
          </BtnTransparent>
          <BtnTransparent onClick={() => alert("준비중 붙이기")}>
            이전 글
          </BtnTransparent>
          <BtnTransparent onClick={() => alert("준비중 붙이기")}>
            다음 글
          </BtnTransparent>
          {/* 준비중 알림창 붙이기 */}
        </div>
        <div className={isMyPost ? "" : "none"}>
          <BtnTransparent
            onClick={() => navigate(`/mate-write?mateId=${mateId}`)}
          >
            수정
          </BtnTransparent>
          <BtnTransparent onClick={clickDeleteBtn}>삭제</BtnTransparent>
        </div>
      </TopBtnsContainer>
      <ExhbCard exhbData={mateInfo.exhibition} />
    </MateTopContainer>
  );
};

export default MateTop;

const MateTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding: 50px 0;
  border-radius: 0;
  background-color: #958da50d;
`;

const TopBtnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 83vw;
  max-width: 1200px;
  height: 40px;
  div {
    display: flex;
    gap: 10px;
  }
`;

export const BtnColored = styled.button`
  height: 36px;
  padding: 0 20px;
  background-color: ${theme.colors.primry60};
  color: ${theme.colors.white100};
  font-size: 14px;
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
`;

export const BtnTransparent = styled.button`
  height: 40px;
  padding: 0 20px;
  border: 1px solid ${theme.colors.greys40};
  background-color: ${theme.colors.white100};
  font-size: 14px;
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
  :hover {
    background-color: ${theme.colors.greys5};
  }
  &.bookmark {
    margin: auto;
    align-items: center;
    span {
      margin-left: 10px;
      font-weight: 700;
    }
    :hover {
      background-color: ${theme.colors.greys10};
    }
    &:focus-visible {
      border: 1px solid ${theme.colors.greys100};
    }
    &.bookmarked {
      background-color: ${theme.colors.primry80};
      color: ${theme.colors.white100};
    }
  }
`;
