import axios, { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Calender from "../components/Calendar";
import Comment from "../components/mate/Comment";
import { theme } from "../styles/theme";

// 메이트 모집글 상세페이지_박예선_23.01.19
const Mate = () => {
  const navigate = useNavigate();
  const [mateInfo, setMateInfo] = useState({
    id: 1,
    title: "모집글 제목",
    status: "모집 중",
    mateGender: "여성",
    mateAge: "연령 무관",
    availableDate: "2023-02-10",
    content:
      "메이트 모집글 내용ㄴㅇㄹㄴㅇㄹㄴㅇㄹ닌아러니ㅏㄹ\nsdlfkjsdlfjsdlf\n",
    contact: "오픈채팅방 링크",
    viewCount: 1,
    createdAt: "2023-01-17",
    bookmarkCount: 20,
    bookmarked: false,
    exhibition: {
      exhibitionId: 1,
      exhibitionTitle: "제목2",
      exhibitionSpace: "국립현대미술관",
      posterUrl:
        "https://my-alley-exhibition.s3.ap-northeast-2.amazonaws.com/poster/b769b21c-c858-416a-905c-d5829e35ef34.jpg",
      exhibitionDuration: "2023-02-01 ~ 2023-05-28",
      status: "현재 전시",
    },
    member: {
      memberId: 1,
      memberNickname: "작성자 닉네임",
      memberProfileImg: "작성자 프로필 이미지",
      memberGender: "W",
      memberAge: "1999",
    },
  });
  const mateId = 8;

  interface MateRes {
    id: number;
  }

  const getMate = useCallback(async () => {
    try {
      const res: AxiosResponse<MateRes> = await axios.get("/data/mate.json"); // 테스트용 목데이터
      const { id } = res.data;
      console.log(id);
    } catch (err) {
      alert(
        "죄송합니다.\n전시목록을 불러오는데에 실패하였습니다. 다시 시도해주십시오."
      );
    }
  }, []);

  useEffect(() => {
    getMate();
  }, [getMate]);

  return (
    <MateContainer>
      <div className="top-buttons-container">
        <BtnTransparent>목록</BtnTransparent>
        <BtnTransparent>이전 글</BtnTransparent>
        <BtnTransparent>다음 글</BtnTransparent>
        <BtnTransparent>수정</BtnTransparent>
        <BtnTransparent>삭제</BtnTransparent>
      </div>
      <ExhbCardContainer onClick={() => navigate(`/exhibition/${mateId}`)}>
        <Thumbnail
          className="thumbnail"
          src="https://cdn.pixabay.com/photo/2020/12/23/21/21/macarons-5856039_1280.jpg"
          alt="thumbnail"
        />
        <InfoContainer>
          <div className="title bold">
            동대문 디디피 공연보러오세요 눈누냔냐
          </div>
          <DetailContainer>
            <div className="date flex">
              <div className="detail-name">일정</div>
              <div>2099-09-09</div>
            </div>
            <div className="flex">
              <div className="detail-name">장소</div>
              <div>ddp</div>
            </div>
          </DetailContainer>
        </InfoContainer>
      </ExhbCardContainer>
      <MateContentContainer>
        <div>
          <BtnColored>모집 중</BtnColored>
          <div className="title">모집글 제목</div>
          <span>createdAt</span>
          <div>
            조회수 <span>00</span>
          </div>
          <div>
            댓글 <span>2 </span>
          </div>
        </div>

        <div>
          원하는 메이트
          <div>
            <div>성별</div>
            <div>상관없음</div>
          </div>
          <div>
            <div>나이</div>
            <div>20대 초반 ~ 30대 중반</div>
          </div>
        </div>
        <div>
          관람예정일
          <Calender />
        </div>
        <div>
          메이트 설명글
          <div>니아러닝라ㅓ닝러ㅣㄴ아러ㅣㄴ아러니아러ㅣㄴㅇ러닝런아ㅣ</div>
        </div>
        <MemberInfo className="flex">
          <MemberProfileImg
            alt="member profile img"
            src="https://cdn.pixabay.com/photo/2020/12/23/21/21/macarons-5856039_1280.jpg"
          />
          <div>
            <span>닉네임</span>
            <div>
              <span>여자</span>
              <span>20대 초반</span>
            </div>
          </div>
        </MemberInfo>
        <div>
          연락가능 메신저 <div>니아러니아러ㅣ나ㅓ </div>
        </div>
        <button type="button">저장하기 30</button>
      </MateContentContainer>
      <CommentList>
        <div className="comment-count bold">
          댓글 <span>9</span>
        </div>
        {/* <Comment type="comment" />
        <Comment type="reply" />
        댓글기능 추가되면 추가하기 */}
      </CommentList>
    </MateContainer>
  );
};

export default Mate;

const MateContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 50px 0;
  /* border: 1px solid #e0e0e0; */
  .top-buttons-container {
    height: 40px;
  }
  .flex {
    display: flex;
  }
  .bold {
    font-weight: 700;
  }
`;

const ExhbCardContainer = styled.div`
  display: flex;
  height: 244px;
  margin: 14px 0 30px;
  border: 1px solid ${theme.colors.greys40};
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 175px;
  height: inherit;
`;

const InfoContainer = styled.div`
  margin: 30px;
  border-radius: 0;
  .title {
    height: 104px;
    color: ${(props) => props.theme.colors.greys90};
    font-size: 42px;
    line-height: 52px;
  }
`;

const DetailContainer = styled.div`
  height: 50px;
  margin-top: 30px;
  div {
    div {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: ${theme.colors.greys90};
      &.detail-name {
        width: 72px;
        margin-right: 30px;
        color: ${theme.colors.greys60};
      }
    }
    &.date {
      margin-bottom: 10px;
    }
  }
`;

const MateContentContainer = styled.div`
  margin: 30px 0;
  padding: 30px;
  border: 1px solid ${theme.colors.greys40};
  .title {
    margin: 10px 0 20px;
    font-size: 28px;
    font-weight: 700;
    line-height: 36px;
  }
`;

const MemberInfo = styled.div``;

const MemberProfileImg = styled.img`
  width: 78px;
  height: 78px;
  margin-right: 10px;
  border-radius: 50px;
`;

const CommentList = styled.div`
  border: 1px solid #e0e0e0;
  padding: 30px;
  .comment-count {
    padding-bottom: 14px;
    border-bottom: 1px solid ${theme.colors.greys40};
    border-radius: 0;
    font-size: 20px;
    span {
      color: ${theme.colors.primry60};
    }
  }
`;

const BtnColored = styled.button`
  height: 36px;
  padding: 0 20px;
  background-color: ${theme.colors.primry60};
  color: ${theme.colors.white100};
  font-size: 14px;
`;

const BtnTransparent = styled.button`
  height: 40px;
  padding: 0 20px;
  border: 1px solid ${theme.colors.greys40};
`;
