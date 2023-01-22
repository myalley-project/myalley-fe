import axios, { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Calender from "../components/Calendar";
import Comment from "../components/mate/Comment";
import { MateRes } from "../types/mate";
import { theme } from "../styles/theme";

// 구현해야 할 부분
// 댓글 엔터 막기(또는 엔터치면 등록 모달 뜨도록 하기)

// 메이트 모집글 상세페이지_박예선_23.01.22
const Mate = () => {
  const navigate = useNavigate();
  const [mateInfo, setMateInfo] = useState<MateRes | null>(null);
  const [commentTextArea, setCommentTextArea] = useState("");

  const getMate = useCallback(async () => {
    try {
      const res: AxiosResponse<MateRes> = await axios.get("/data/mate.json"); // 테스트용 목데이터
      setMateInfo(res.data);
    } catch (err) {
      alert(
        "죄송합니다.\n전시목록을 불러오는데에 실패하였습니다. 다시 시도해주십시오."
      );
    }
  }, []);

  useEffect(() => {
    getMate();
  }, [getMate]);

  const handleCommentTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCommentTextArea(value);
  };

  return (
    mateInfo && (
      <MateContainer>
        <div className="top-buttons-container flex space-between">
          <BtnTransparent>목록</BtnTransparent>
          {/* <BtnTransparent>이전 글</BtnTransparent>
          <BtnTransparent>다음 글</BtnTransparent> */}
          {/* 일단 구현 중지 */}
          <div>
            <BtnTransparent>수정</BtnTransparent>
            <BtnTransparent>삭제</BtnTransparent>
          </div>
        </div>
        <ExhbCardContainer
          onClick={() =>
            navigate(`/exhibition/${mateInfo.exhibition.exhibitionId}`)
          }
        >
          <Thumbnail
            className="thumbnail"
            src="https://cdn.pixabay.com/photo/2020/12/23/21/21/macarons-5856039_1280.jpg"
            alt="thumbnail"
          />
          <InfoContainer>
            <div className="title bold">
              {mateInfo.exhibition.exhibitionTitle}
            </div>
            <DetailContainer>
              <div className="date flex">
                <div className="detail-name">일정</div>
                <div>{mateInfo.exhibition.exhibitionDuration}</div>
              </div>
              <div className="flex">
                <div className="detail-name">장소</div>
                <div>{mateInfo.exhibition.exhibitionSpace}</div>
              </div>
            </DetailContainer>
          </InfoContainer>
        </ExhbCardContainer>
        <MateContentContainer>
          <div className="flex">
            <div className="title-container">
              <BtnColored>{mateInfo.status}</BtnColored>
              <div className="title">{mateInfo.title}</div>
              <div className="title-info flex">
                <div>2023-03-09 18:30</div>
                <div className="border" />
                <div>조회수</div>
                <div className="colored">{mateInfo.viewCount}</div>
                <div className="border" />
                <div>댓글</div>
                <div className="colored">00</div>
              </div>
            </div>
          </div>
          <SubTitle type="greys90" marginTop={50}>
            원하는 메이트
          </SubTitle>
          <div className="flex">
            <BorderedDiv width="91">
              <SubTitle type="greys60" marginTop={0}>
                성별
              </SubTitle>
              <div>{mateInfo.mateGender}</div>
            </BorderedDiv>
            <BorderedDiv width="169">
              <SubTitle type="greys60" marginTop={0}>
                나이
              </SubTitle>
              <div>{mateInfo.mateAge}</div>
            </BorderedDiv>
          </div>
          <div>
            <SubTitle type="greys90" marginTop={50}>
              관람예정일
            </SubTitle>
            <Calender />
          </div>
          <div>
            <SubTitle type="greys90" marginTop={50}>
              메이트 설명글
            </SubTitle>
            <TextArea type="readOnly" defaultValue={mateInfo.content} />
          </div>
          <MemberInfo className="flex">
            <MemberProfileImg
              alt="member profile img"
              src={mateInfo.member.memberProfileImg}
            />
            <div>
              <span>{mateInfo.member.memberNickname}</span>
              <div>
                <span>
                  {mateInfo.member.memberGender === "M" ? "남성" : "여성"}
                </span>
                <span>{mateInfo.member.memberAge}</span>
                {/* n0대 *반으로 변경해야함 */}
              </div>
            </div>
          </MemberInfo>
          <div>
            <SubTitle type="greys90" marginTop={50}>
              연락가능 메신저
            </SubTitle>
            <div>{mateInfo.contact}</div>
          </div>
          <button type="button">저장하기 {mateInfo.bookmarkCount}</button>
        </MateContentContainer>
        <CommentList>
          <div className="comment-count bold">
            댓글 <span>0</span>
          </div>
          {/* <Comment type="comment" />
        <Comment type="reply" />
        댓글기능 추가되면 추가하기 */}
          <SubTitle type="greys90" marginTop={30}>
            현재보고있는 회원 닉네임
          </SubTitle>
          <TextAreaContainer>
            <TextArea
              type="textArea"
              placeholder="내용을 입력해주세요."
              value={commentTextArea}
              onChange={handleCommentTextArea}
              maxLength={150}
            />
            <div className="input-status">
              <span>{commentTextArea.length}</span>/<span>150</span>
            </div>
          </TextAreaContainer>
        </CommentList>
      </MateContainer>
    )
  );
};

export default Mate;

const MateContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 50px 0;
  .top-buttons-container {
    height: 40px;
  }
  .flex {
    display: flex;
  }
  .space-between {
    justify-content: space-between;
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
  .title-container {
    width: 100%;
    padding-bottom: 15px;
    border-bottom: 1px solid ${theme.colors.greys40};
    border-radius: 0;
    .title {
      margin: 10px 0 20px;
      font-size: 28px;
      font-weight: 700;
      line-height: 36px;
    }
  }
  .title-info {
    align-items: center;
    font-size: 12px;
    color: ${theme.colors.greys60};
    .border {
      height: 8px;
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid ${theme.colors.greys40};
      border-radius: 0;
    }
    .colored {
      margin-left: 2px;
      color: ${theme.colors.primry60};
    }
  }
`;

const SubTitle = styled.div<{ type: "greys60" | "greys90"; marginTop: number }>`
  margin-top: ${(props) => `${props.marginTop}px`};
  margin-bottom: ${(props) => (props.type === "greys60" ? "0" : "10px")};
  color: ${(props) =>
    props.type === "greys60" ? theme.colors.greys60 : theme.colors.greys90};
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`;

const BorderedDiv = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${(props) => props.width}+ "px";
  height: 90px;
  margin-right: 10px;
  padding: 20px;
  border: 1px solid ${theme.colors.greys40};
  color: ${theme.colors.greys90};
  font-size: 14px;
  font-weight: 700;
`;

const MemberInfo = styled.div`
  margin-top: 30px;
`;

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

const TextArea = styled.textarea<{ type: "textArea" | "readOnly" }>`
  width: 100%;
  height: 150px;
  padding: ${(props) => (props.type === "textArea" ? "20px" : "0")};
  border: ${(props) =>
    props.type === "textArea" ? `1px solid ${theme.colors.greys40}` : "none"};
  border-radius: ${(props) => (props.type === "textArea" ? "30px" : "0")};
  color: ${(props) =>
    props.type === "textArea" ? theme.colors.greys60 : theme.colors.greys90};
  font-size: 14px;
  font-weight: 500;
  resize: none;
`;

const TextAreaContainer = styled.div`
  position: relative;
  width: 100%;
  .input-status {
    position: absolute;
    right: 20px;
    bottom: 20px;
    color: ${theme.colors.greys60};
    font-size: 14px;
    font-weight: 500;
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
  &:nth-child(1) {
    margin-right: 10px;
  }
`;
