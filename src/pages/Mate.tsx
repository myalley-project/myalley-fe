import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import styled from "styled-components";
import profileImg from "../assets/icons/profileImg.svg";
import Calender from "../components/Calendar";
import { MateRes } from "../types/mate";
import { theme } from "../styles/theme";
import CommentList, {
  SubTitle,
  TextArea,
} from "../components/mate/CommentList";
import ExhbCard from "../components/mate/ExhbCard";
import { BookMarkRes, getMateApi, mateBookMarkApi } from "../apis/mate";
import isApiError from "../utils/isApiError";

// 메이트 모집글 상세페이지_박예선_23.01.26
const Mate = () => {
  const navigate = useNavigate();
  const mateId = Number(useParams().id);
  const memberId = Number(localStorage.getItem("memberId"));
  const [isMyPost, setIsMyPost] = useState(false);
  const [mateInfo, setMateInfo] = useState<MateRes | null>(null);
  const [mateContentHeight, setMateContentHeight] = useState(0);
  const mateContentRef = useRef<HTMLTextAreaElement>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentTextArea, setCommentTextArea] = useState("");

  // 메이트 상세페이지 api 호출_박예선_23.01.26
  const getMate = useCallback(async () => {
    try {
      const res: AxiosResponse<MateRes> = await getMateApi(mateId, memberId);
      setMateInfo(res.data);
      setIsBookmarked(res.data.bookmarked);
    } catch (err) {
      const errorRes = isApiError(err);
      if (typeof errorRes !== "object") return;
      const { errorCode } = errorRes;
      if (errorCode === 404)
        alert("등록되지 않은 메이트 모집글입니다. 다시 시도해주십시오.");
      navigate("/");
    }
  }, [mateId, memberId, navigate]);

  // 메이트 상세페이지 api 호출_박예선_23.01.22
  useEffect(() => {
    getMate();
  }, [getMate]);

  // 메이트 설명글의 길이에 따라 높이 변경_박예선_23.01.22
  useEffect(() => {
    if (mateContentRef.current?.scrollHeight)
      setMateContentHeight(mateContentRef.current?.scrollHeight);
  }, [mateInfo]);

  // 내가 작성한 메이트글 여부파악_박예선_23.01.22
  useEffect(() => {
    if (!mateInfo) return;
    const mateAuthorId = mateInfo?.member.memberId;
    if (mateAuthorId === memberId) setIsMyPost(true);
  }, [mateInfo, mateInfo?.member, memberId]);

  // 메이트글 북마크 등록/해제 api 호출_박예선_23.01.26
  const clickBookmarkBtn = async () => {
    if (!memberId) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }
    const res: AxiosResponse<BookMarkRes> | void = await mateBookMarkApi(
      mateId
    );
    if (!res) return;
    const { data } = res.data;
    if (data) setIsBookmarked(true);
    if (!data) setIsBookmarked(false);
  };

  return (
    mateInfo && (
      <MateContainer>
        <div className="top-buttons-container flex">
          <BtnTransparent>목록</BtnTransparent>
          {/* <BtnTransparent>이전 글</BtnTransparent>
          <BtnTransparent>다음 글</BtnTransparent> */}
          {/* 일단 구현 중지 */}
          <div className={isMyPost ? "" : "none"}>
            <BtnTransparent>수정</BtnTransparent>
            <BtnTransparent>삭제</BtnTransparent>
          </div>
        </div>
        <ExhbCard exhbData={mateInfo.exhibition} />
        <MateContentContainer>
          <div className="flex">
            <div className="title-container">
              <BtnColored disabled>{mateInfo.status}</BtnColored>
              <Title size={28} lineHight={36} type="mateTitle">
                {mateInfo.title}
              </Title>
              <div className="title-info flex">
                <div>{mateInfo.createdAt}</div>
                <div className="border" />
                <div>조회수</div>
                <div className="colored">{mateInfo.viewCount}</div>
                <div className="border" />
                <div>댓글</div>
                <div className="colored">0</div>
                {/* 댓글기능 추가되면 데이터 반영하도록 변경해야 함 */}
              </div>
            </div>
          </div>
          <SubTitle type="greys90" marginTop={50}>
            원하는 메이트
          </SubTitle>
          <div className="flex">
            <BorderedBox>
              <SubTitle type="greys60" marginTop={0}>
                성별
              </SubTitle>
              <div>{mateInfo.mateGender}</div>
            </BorderedBox>
            <BorderedBox>
              <SubTitle type="greys60" marginTop={0}>
                나이
              </SubTitle>
              <div>{mateInfo.mateAge}</div>
            </BorderedBox>
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
            <TextArea
              type="readOnly"
              ref={mateContentRef}
              height={mateContentHeight}
              defaultValue={mateInfo.content}
              disabled
            />
          </div>
          <MemberInfo className="flex">
            <MemberProfileImg
              alt="member profile img"
              src={
                mateInfo.member.memberProfileImg
                  ? mateInfo.member.memberProfileImg
                  : profileImg
              }
            />
            <div>
              <Title size={20} lineHight={28}>
                {mateInfo.member.memberNickname}
              </Title>
              <span>
                {mateInfo.member.memberGender === "M" ? "남성" : "여성"}
              </span>
              <span>{getMemberAgeForm(mateInfo.member.memberAge)}</span>
            </div>
          </MemberInfo>
          <div>
            <SubTitle type="greys90" marginTop={50}>
              연락가능 메신저
            </SubTitle>
            <Span size={14}>{mateInfo.contact}</Span>
          </div>
          <div className="bookmark-container">
            <BtnTransparent
              type="button"
              onClick={clickBookmarkBtn}
              className={`bookmark ${isBookmarked ? "bookmarked" : ""}`}
            >
              {isBookmarked ? "저장됨" : "저장하기"}
              <span>{mateInfo.bookmarkCount}</span>
            </BtnTransparent>
          </div>
        </MateContentContainer>
        <CommentList
          commentTextArea={commentTextArea}
          setCommentTextArea={setCommentTextArea}
        />
      </MateContainer>
    )
  );
};

export default Mate;

// 작성자 나이 "n0대 x반" 형식 반환 함수_박예선_23.01.22
function getMemberAgeForm(year: string) {
  const age = (new Date().getFullYear() - Number(year) + 1).toString();
  const firstNumOfAge = Number(age.substring(0, 1));
  const lastNumOfAge = Number(age.slice(-1, 2));
  const ageRanges = [
    { lastNumRange: 2, result: "초반" },
    { lastNumRange: 6, result: "중반" },
    { lastNumRange: 9, result: "후반" },
  ];
  const resultAgeForm = ageRanges.filter(
    (range) => lastNumOfAge <= range.lastNumRange
  );
  return `${firstNumOfAge}0대 ${resultAgeForm[0].result}`;
}

const MateContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 50px auto;
  .top-buttons-container {
    height: 40px;
    justify-content: space-between;
  }
  .flex {
    display: flex;
  }
  .none {
    display: none;
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
  .bookmark-container {
    display: flex;
    margin-top: 50px;
  }
`;

const Title = styled.div<{
  size: number;
  lineHight: number;
  type?: "mateTitle";
}>`
  margin-bottom: 10px;
  margin: ${(props) => props.type && "10px 0 20px"};
  color: ${theme.colors.greys90};
  font-size: ${(props) => `${props.size}px`};
  font-weight: 700;
  line-height: ${(props) => `${props.lineHight}px`};
`;

const BorderedBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90px;
  margin-right: 10px;
  padding: 20px;
  border: 1px solid ${theme.colors.greys40};
  color: ${theme.colors.greys90};
  font-size: 14px;
  font-weight: 700;
`;

const MemberInfo = styled.div`
  align-items: center;
  margin-top: 30px;
  span {
    margin-right: 10px;
    color: ${theme.colors.greys60};
    font-size: 14px;
    font-weight: 500;
  }
`;

const MemberProfileImg = styled.img`
  width: 78px;
  height: 78px;
  margin-right: 10px;
  border-radius: 50px;
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

const BtnTransparent = styled.button`
  height: 40px;
  padding: 0 20px;
  border: 1px solid ${theme.colors.greys40};
  font-size: 14px;
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
  &:nth-child(1) {
    margin-right: 10px;
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

const Span = styled.span<{ size: number }>`
  color: ${theme.colors.greys90};
  font-size: ${(props) => `${props.size}px`};
  font-weight: 400;
`;
