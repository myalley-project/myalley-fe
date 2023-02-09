import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import styled from "styled-components";
import { theme } from "../styles/theme";
import heartOff from "../assets/icons/heartOff.svg";
import profileImg from "../assets/icons/profileImg.svg";
import { MateRes } from "../types/mate";
import { BookMarkRes, mateApi, useMateBookMarkApi } from "../apis/mate";
import isApiError from "../utils/isApiError";
import MateTop, {
  BtnColored,
  BtnTransparent,
} from "../components/mate/MateTop";
import CommentList, {
  SubTitle,
  TextArea,
} from "../components/mate/CommentList";

// 메이트 모집글 상세페이지_박예선_23.02.09
const Mate = () => {
  const navigate = useNavigate();
  const mateBookMarkApi = useMateBookMarkApi();
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
      const res: AxiosResponse<MateRes> = await mateApi(mateId, memberId);
      setMateInfo(res.data);
      setIsBookmarked(res.data.bookmarked);
    } catch (err) {
      const errorRes = isApiError(err);
      if (typeof errorRes !== "object") return;
      const { errorMsg } = errorRes;
      alert(errorMsg);
      navigate("/");
    }
  }, [mateId, memberId, navigate]);

  // 메이트 상세페이지 api 호출_박예선_23.01.22
  useEffect(() => {
    getMate();
  }, [getMate, isBookmarked]);

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
        <MateTop isMyPost={isMyPost} mateId={mateId} mateInfo={mateInfo} />
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
          <div className="flex">
            <ColoredBox>
              <HeartIcon src={heartOff} alt="" />
              <div>
                <h4>관람 예정일</h4>
                <span>{mateInfo.availableDate}</span>
              </div>
            </ColoredBox>
            <ColoredBox>
              <HeartIcon src={heartOff} alt="" />
              <div>
                <h4>메이트 성별</h4>
                <span>{mateInfo.mateGender}</span>
              </div>
            </ColoredBox>
            <ColoredBox>
              <HeartIcon src={heartOff} alt="" />
              <div>
                <h4>메이트 나이</h4>
                <span>{mateInfo.mateAge}</span>
              </div>
            </ColoredBox>
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
          <div>
            <SubTitle type="greys90" marginTop={50}>
              연락가능 메신저
            </SubTitle>
            <Span size={16}>{mateInfo.contact}</Span>
          </div>
          <MemberInfoContainer>
            <MemberProfileImg
              alt="member profile img"
              src={mateInfo.member.memberProfileImg || profileImg}
            />
            <div>
              <Title size={20} lineHight={28}>
                {mateInfo.member.memberNickname}
              </Title>
              <span>
                {mateInfo.member.memberGender === "M" ? "남자" : "여자"}
              </span>
              <span>{getMemberAgeForm(mateInfo.member.memberAge)}</span>
            </div>
          </MemberInfoContainer>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  .flex {
    display: flex;
  }
  .none {
    display: none;
  }
`;

const MateContentContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 50px 0 30px;
  padding: 30px;
  border: 1px solid ${theme.colors.greys40};
  background-color: ${theme.colors.white100};
  .title-container {
    width: 100%;
    padding-bottom: 15px;
    border-bottom: 1px solid ${theme.colors.greys40};
    border-radius: 0;
  }
  .title-info {
    align-items: center;
    font-size: 14px;
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

const ColoredBox = styled.div`
  display: flex;
  margin: 50px 30px 0 0;
  padding: 30px;
  background-color: ${theme.colors.secondary5};
  border-radius: 16px;
  h4,
  span {
    font-size: 16px;
  }
  h4 {
    margin-bottom: 10px;
    color: ${theme.colors.primry60};
    line-height: 26px;
  }
  span {
    color: ${theme.colors.primry80};
    font-weight: 700;
    line-height: 22px;
  }
  @media (max-width: 1440px) {
    margin-right: 2.08vw;
    padding: 2.08vw;
    h4,
    span {
      font-size: 14px;
    }
  }
  @media (max-width: 1064px) {
    padding: 15px;
  }
  @media (max-width: 624px) {
    h4,
    span {
      font-size: 12px;
    }
    h4 {
      margin-bottom: 0;
    }
  }
`;

const HeartIcon = styled.img`
  width: 40px;
  margin-right: 30px;
  @media (max-width: 1440px) {
    width: 2.7vw;
    margin-right: 2.08vw;
  }
  @media (max-width: 1064px) {
    width: 28.75px;
  }
`;

const MemberInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px auto 0;
  span {
    margin-right: 10px;
    color: ${theme.colors.greys60};
    font-size: 16px;
    font-weight: 500;
  }
`;

const MemberProfileImg = styled.img`
  width: 78px;
  height: 78px;
  margin-bottom: 10px;
  border-radius: 50px;
`;

const Span = styled.span<{ size: number }>`
  color: ${theme.colors.greys90};
  font-size: ${(props) => `${props.size}px`};
  font-weight: 400;
`;
