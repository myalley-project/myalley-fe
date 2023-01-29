import { AxiosResponse } from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import plus from "../assets/icons/plus.svg";
import Button from "../components/atom/Button";
import CheckLabel from "../components/atom/CheckLabel";
import Selectbox from "../components/atom/Selectbox";
import Calender from "../components/Calendar";
import SubTitle from "../components/SubTitle";
import { theme } from "../styles/theme";
import { MateRes, MateWriteType } from "../types/mate";
import { mateApi, mateWriteApi, MateWriteRes } from "../apis/mate";
import isApiError from "../utils/isApiError";
import useRefreshTokenApi from "../apis/useRefreshToken";
import Editor from "../components/Editor";

// 메이트글 작성/수정 페이지_박예선_23.01.28
const MateWrite = () => {
  const refreshTokenApi = useRefreshTokenApi();
  const location = useLocation();
  const navigate = useNavigate();
  const urlSearch = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const isModifyPage = location.search.includes("mateId");
  const memberId = Number(localStorage.getItem("memberId"));
  const mateId = Number(urlSearch.get("mateId"));
  const [writeData, setWriteData] = useState<MateWriteType>({
    title: "",
    status: "모집 중",
    mateGender: "성별 무관",
    mateAge: "",
    availableDate: "2023-10-30",
    content: "같이 전시봐요",
    contact: "",
    exhibitionId: 2,
  });
  const [isAgeRegardless, setIsAgeRegardless] = useState(false);
  const [isDateRegardless, setIsDateRegardless] = useState(false);
  const [ageRange, setAgeRange] = useState({
    minimum: "",
    maximum: "",
  });
  const { title, status, mateGender, mateAge, content, contact } = writeData;

  // 수정페이지면 원래 정보 가져오기
  // 전시회 선택 모달 연결하기
  // 달력 선택값 가져오기
  // 에디터 연결하기

  // 토큰 없을 때 접속하면 로그인페이지로 리다이렉트_박예선_23.01.28
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      alert("로그인이 필요한 기능입니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    }
  }, [navigate]);

  // 기존 메이트글 정보 조회 api 호출_박예선_23.01.28
  const getMate = async () => {
    if (!memberId) return;
    try {
      const res: AxiosResponse<MateRes> = await mateApi(mateId, memberId);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  // 메이트글 작성/수정 api 호출_박예선_23.01.29
  const clickApplyBtn = async (type: "post" | "put") => {
    try {
      const res: AxiosResponse<MateWriteRes> = await mateWriteApi(
        type,
        writeData,
        mateId
      );
      alert(res.data);
      navigate(-1);
    } catch (err) {
      const errorRes = isApiError(err);
      if (errorRes === "accessToken 만료") {
        refreshTokenApi();
        const res: AxiosResponse<MateWriteRes> = await mateWriteApi(
          type,
          writeData,
          mateId
        );
        alert(res.data);
        navigate(-1);
      }
      if (typeof errorRes !== "object") return;
      const { errorMsg } = errorRes;
      alert(errorMsg);
      navigate("/mate-list");
    }
  };

  // 메이트글 수정페이지인 경우 기존 메이트글 정보 조회_박예선_23.01.29
  useEffect(() => {
    if (mateId) {
      //   getMate();
      //   console.log(mateId);
    }
  }, [mateId]);

  // 테스트용 useEffect
  useEffect(() => {
    // console.log(location.search);
    // console.log(urlSearch.get("mateId"));
    // console.log(isModifyPage);
    // console.log(ageRange);
  }, [ageRange, isModifyPage, location.search, urlSearch, writeData]);

  // 제목, 내용, 연락망 input/textArea 상태관리_박예선_23.01.29
  const handleInputAndTextArea = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setWriteData({ ...writeData, [name]: value });
  };

  // 메이트 모집상태, 성별, 나이 select값 상태관리_박예선_23.01.28
  const handleSelect = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    name: string
  ) => {
    const value = e.currentTarget.textContent;
    if (name === "status" || name === "mateGender") {
      setWriteData({
        ...writeData,
        [name]: value,
      });
      return;
    }
    if (name === "minimum" || name === "maximum") {
      setAgeRange({ ...ageRange, [name]: value });
      // 연령무관 아닐 때는 writeData에 반영하기 추가
    }
  };

  // 연령 무관 체크박스 클릭함수_박예선_23.01.28
  const clickAgeRegardless = () => {
    const { minimum, maximum } = ageRange;
    if (!isAgeRegardless) setWriteData({ ...writeData, mateAge: "연령 무관" });
    if (isAgeRegardless)
      setWriteData({ ...writeData, mateAge: `${minimum} ~ ${maximum}` });
    setIsAgeRegardless(!isAgeRegardless);
  };

  // 관람일 미정 체크박스 클릭함수_박예선_23.01.28
  // 달력과 연결해야 함
  const clickDateRegardless = () => {
    if (!isDateRegardless)
      setWriteData({ ...writeData, availableDate: "미정" });
    if (isDateRegardless)
      setWriteData({ ...writeData, availableDate: "YYYY-MM-DD" });
    setIsDateRegardless(!isDateRegardless);
  };

  return (
    <>
      <MateWriteContainer>
        <TitleInput
          type="text"
          name="title"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={handleInputAndTextArea}
          maxLength={30}
        />
        <Section>
          <SubTitle text="모집 상태" />
          <Selectbox
            placeholder={status}
            options={["모집 중", "모집 완료"]}
            width="130px"
            name="status"
            onClick={handleSelect}
          />
        </Section>
        <Section>
          <SubTitle text="원하는 메이트 성별" />
          <Selectbox
            placeholder={mateGender}
            options={["성별 무관", "남", "여"]}
            width="130px"
            name="mateGender"
            onClick={handleSelect}
          />
        </Section>
        <SubTitle text="원하는 메이트 나이" />
        <Section className="flex">
          <div className="flex">
            <SelectLabel>최소</SelectLabel>
            <Selectbox
              placeholder={ageRange.minimum || "선택하기"}
              options={MATE_AGE_ARRAY}
              width="130px"
              name="minimum"
              onClick={handleSelect}
            />
          </div>
          <div className="flex maximum-age">
            <SelectLabel>최대</SelectLabel>
            <Selectbox
              placeholder={ageRange.maximum || "선택하기"}
              options={MATE_AGE_ARRAY}
              width="130px"
              name="maximum"
              onClick={handleSelect}
            />
          </div>
          <CheckLabel
            label="연령 무관"
            checked={isAgeRegardless}
            onClick={clickAgeRegardless}
          />
        </Section>
        <Section className="flex">
          <div className="exhb-choice">
            <SubTitle text="전시회" />
            <ExhbChoiceBtn type="button">
              <img src={plus} alt="전시회 선택하기" />
            </ExhbChoiceBtn>
          </div>
          <div>
            <SubTitle text="관람일" />
            <CheckLabel
              label="미정"
              checked={isDateRegardless}
              onClick={clickDateRegardless}
            />
            <CalenderContainer>
              <Calender />
            </CalenderContainer>
          </div>
        </Section>
        <Section>
          <SubTitle text="메이트 설명글" />
          <Editor>
            <Editor.TextInputArea
              value={content}
              name="content"
              textChangeHandler={handleInputAndTextArea}
            />
          </Editor>
        </Section>
        <Section>
          <SubTitle text="연락망" />
          <ContactInput
            name="contact"
            placeholder="오픈채팅방, 메신저 아이디, 메신저 링크 등 연락 수단을 남겨주세요"
            value={contact}
            onChange={handleInputAndTextArea}
            maxLength={100}
          />
        </Section>
      </MateWriteContainer>
      <BtnContainer>
        <Button variant="text" size="small">
          취소하기
        </Button>
        <Button
          variant="primary"
          size="small"
          onClick={() => {
            if (!isModifyPage) clickApplyBtn("post");
            if (isModifyPage) clickApplyBtn("put");
          }}
        >
          {isModifyPage ? "수정" : "등록"}하기
        </Button>
      </BtnContainer>
    </>
  );
};

export default MateWrite;

const MATE_AGE_ARRAY = [
  "20대 초반",
  "20대 중반",
  "20대 후반",
  "30대 초반",
  "30대 중반",
  "30대 후반",
  "40대 초반",
  "40대 중반",
  "40대 후반",
];

const MateWriteContainer = styled.div`
  width: 83vw;
  margin: 50px auto 30px;
  padding: 30px;
  border: 1px solid ${theme.colors.greys40};
`;

const TitleInput = styled.input`
  width: 100%;
  margin-bottom: 30px;
  padding-bottom: 14px;
  border-bottom: 1px solid ${theme.colors.greys40};
  border-radius: 0;
  font-size: 28px;
  font-weight: 700;
  line-height: 36px;
  ::placeholder {
    color: ${theme.colors.greys90};
  }
`;

const Section = styled.div`
  margin-bottom: 30px;
  &.flex,
  .flex {
    display: flex;
  }
  .exhb-choice {
    margin-right: 30px;
  }
  .maximum-age {
    margin: 0px 20px 0px;
  }
`;

const SelectLabel = styled.span`
  margin-right: 4px;
  color: ${theme.colors.greys60};
  font-size: 14px;
  font-weight: 500;
  line-height: 36px;
`;

const ExhbChoiceBtn = styled.button`
  position: relative;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 386px;
  /* width: 19.3vw; 비율 맞춰 줄어들게 리팩토링하기 */
  /* padding-bottom: 33.2%; */
  background-color: #f9f9f9;
  cursor: pointer;
  img {
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
    width: 70px;
    height: 70px;
  }
`;

const CalenderContainer = styled.div`
  margin-top: 10px;
`;

const ContactInput = styled.input`
  width: 100%;
  padding: 8px 20px;
  border: 1px solid ${theme.colors.greys40};
  color: ${theme.colors.greys90};
  ::placeholder {
    color: ${theme.colors.greys60};
  }
  :hover {
    border: 1px solid ${theme.colors.primry60};
    box-shadow: 0px 4px 30px rgba(79, 55, 139, 0.05);
  }
`;

const BtnContainer = styled.div`
  margin-bottom: 50px;
  text-align: center;
  button {
    width: 153px;
    :nth-child(1) {
      margin-right: 30px;
    }
  }
`;
