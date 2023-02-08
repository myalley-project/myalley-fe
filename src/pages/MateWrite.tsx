/* eslint-disable @typescript-eslint/no-shadow */
import { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../styles/theme";
import plus from "../assets/icons/plus.svg";
import Button from "../components/atom/Button";
import CheckLabel from "../components/atom/CheckLabel";
import Selectbox from "../components/atom/Selectbox";
import Calender from "../components/Calendar";
import SubTitle from "../components/SubTitle";
import Editor from "../components/Editor";
import SimpleDialog from "../components/SimpleDialog";
import { MateRes, MateWriteType } from "../types/mate";
import { mateApi, mateWriteApi, MateWriteRes } from "../apis/mate";
import useRefreshTokenApi from "../apis/useRefreshToken";
import isApiError, { errorAlert } from "../utils/isApiError";
import ExhibitionChoice from "../components/ExhibitionChoice";
import Modal from "../Modal";

// 메이트글 작성/수정 페이지_박예선_23.02.08
const MateWrite = () => {
  const refreshTokenApi = useRefreshTokenApi();
  const location = useLocation();
  const navigate = useNavigate();
  const urlSearch = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const memberId = Number(localStorage.getItem("memberId"));
  const mateId = Number(urlSearch.get("mateId"));
  const [writeData, setWriteData] = useState<MateWriteType>({
    title: "",
    status: "모집 중",
    mateGender: "성별 무관",
    mateAge: "",
    availableDate: "",
    content: "",
    contact: "",
    exhibitionId: 0,
  });
  const [ageRange, setAgeRange] = useState({
    minimum: "",
    maximum: "",
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [openExhbModal, setOpenExhbModal] = useState(false);
  const [exhbData, setExhbData] = useState({
    thumbnail: "",
    status: "",
    title: "",
    duration: "",
  });
  const [isThumbnailHovered, setIsThumbnailHovered] = useState(false);
  const [openCancleModal, setOpenCancleModal] = useState(false);
  const [isDiabledApplyBtn, setIsDisabledApplyBtn] = useState(true);
  const {
    title,
    status,
    mateGender,
    mateAge,
    availableDate,
    content,
    contact,
    exhibitionId,
  } = writeData;

  // 전시회 선택 모달 연결하기

  // 토큰 없을 때 접속하면 로그인페이지로 리다이렉트_박예선_23.01.29
  useEffect(() => {
    if (!memberId) {
      alert("로그인이 필요한 기능입니다.");
      navigate("/login");
    }
  }, [memberId, navigate]);

  // 기존 메이트글 정보 조회 api 호출_박예선_23.02.08
  const getMate = useCallback(async () => {
    try {
      const res: AxiosResponse<MateRes> = await mateApi(mateId, memberId);
      const { data } = res;
      const { exhibition } = data;
      if (memberId !== data.member.memberId) {
        alert("본인이 작성한 메이트글만 수정할 수 있습니다.");
        navigate("/mate-list");
        return;
      }
      setWriteData({
        title: data.title,
        status: data.status,
        mateGender: data.mateGender,
        mateAge: data.mateAge,
        availableDate: data.availableDate,
        content: data.content,
        contact: data.contact,
        exhibitionId: data.exhibition.exhibitionId,
      });
      setExhbData({
        thumbnail: exhibition.posterUrl,
        status: exhibition.status,
        title: exhibition.exhibitionTitle,
        duration: exhibition.exhibitionDuration,
      });
      if (data.mateAge !== "연령 무관")
        setAgeRange({
          minimum: data.mateAge.split(" ~ ")[0],
          maximum: data.mateAge.split(" ~ ")[1],
        });
    } catch (err) {
      errorAlert();
      navigate("/");
    }
  }, [mateId, memberId, navigate]);

  // 메이트글 작성/수정 api 호출_박예선_23.02.08
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
        try {
          refreshTokenApi();
          const res: AxiosResponse<MateWriteRes> = await mateWriteApi(
            type,
            writeData,
            mateId
          );
          alert(res.data);
          navigate(-1);
        } catch {
          errorAlert();
          navigate("/mate-list");
        }
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
      getMate();
    }
  }, [getMate, mateId]);

  // 작성/등록 버튼 활성화 여부_박예선_23.02.02
  useEffect(() => {
    const { minimum, maximum } = ageRange;
    if (
      title &&
      availableDate &&
      mateAge &&
      content &&
      contact &&
      exhibitionId
    ) {
      setIsDisabledApplyBtn(false);
      if (mateAge !== "연령 무관") {
        if (minimum && maximum) setIsDisabledApplyBtn(false);
      }
      return;
    }
    setIsDisabledApplyBtn(true);
  }, [ageRange, availableDate, contact, content, exhibitionId, mateAge, title]);

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
    if (!value) return;
    if (name === "status" || name === "mateGender") {
      setWriteData({
        ...writeData,
        [name]: value,
      });
      return;
    }
    if (name === "minimum") {
      setAgeRange({ ...ageRange, minimum: value });
      if (mateAge !== "연령 무관")
        setWriteData({
          ...writeData,
          mateAge: `${value} ~ ${ageRange.maximum}`,
        });
      return;
    }
    if (name === "maximum") {
      setAgeRange({ ...ageRange, maximum: value });
      if (mateAge !== "연령 무관")
        setWriteData({
          ...writeData,
          mateAge: `${ageRange.minimum} ~ ${value}`,
        });
    }
  };

  // 연령 무관 체크박스 클릭함수_박예선_23.01.28
  const clickAgeRegardless = () => {
    const { minimum, maximum } = ageRange;
    if (mateAge !== "연령 무관")
      setWriteData({ ...writeData, mateAge: "연령 무관" });
    if (mateAge === "연령 무관")
      setWriteData({ ...writeData, mateAge: `${minimum} ~ ${maximum}` });
  };

  // 관람일 미정 체크박스 클릭함수_박예선_23.01.28
  const clickDateRegardless = () => {
    if (availableDate !== "미정")
      setWriteData({ ...writeData, availableDate: "미정" });
    if (availableDate === "미정")
      setWriteData({ ...writeData, availableDate: selectedDate });
  };

  // 달력 클릭 함수_박예선_23.01.31
  const clickCalendar = (date: string) => {
    setSelectedDate(date);
    if (availableDate !== "미정")
      setWriteData({ ...writeData, availableDate: date });
  };

  // 전시회 선택 함수_박예선_23.02.08
  const handleExhbModal = (
    url: string,
    id: number,
    title: string,
    duration: string,
    status: string
  ) => {
    setWriteData({ ...writeData, exhibitionId: id });
    setExhbData({
      title,
      thumbnail: url,
      status,
      duration,
    });
    setOpenExhbModal(false);
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
            options={["성별 무관", "남성", "여성"]}
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
            checked={mateAge === "연령 무관"}
            onClick={clickAgeRegardless}
          />
        </Section>
        <Section className="flex">
          <div className="exhb-choice">
            <SubTitle text="전시회" />
            <ExhbChoiceBtn
              onClick={() => {
                if (writeData.exhibitionId === 0) setOpenExhbModal(true);
              }}
              onMouseOver={() => setIsThumbnailHovered(true)}
              onMouseOut={() => setIsThumbnailHovered(false)}
            >
              {!exhibitionId && <img src={plus} alt="전시회 선택하기" />}
              {exhibitionId !== 0 && (
                <img
                  className="thumbnail"
                  src={exhbData.thumbnail}
                  alt="선택된 전시회"
                />
              )}
              {exhibitionId !== 0 && isThumbnailHovered && (
                <ThumbnailHover>
                  <Button variant="primary" size="small" className="status">
                    {exhbData.status}
                  </Button>
                  <button
                    type="button"
                    className="x-btn"
                    onClick={() => {
                      setWriteData({ ...writeData, exhibitionId: 0 });
                    }}
                  >
                    X
                  </button>
                  <div className="title">{exhbData.title}</div>
                  <div className="duration">{exhbData.duration}</div>
                </ThumbnailHover>
              )}
            </ExhbChoiceBtn>
            <Modal
              open={openExhbModal}
              handleModal={() => setOpenExhbModal(!openExhbModal)}
            >
              <ExhibitionChoice
                getExhbInfo={handleExhbModal}
                handleModal={() => setOpenExhbModal(!openExhbModal)}
              />
            </Modal>
          </div>
          <div>
            <SubTitle text="관람일" />
            <CheckLabel
              label="미정"
              checked={availableDate === "미정"}
              onClick={clickDateRegardless}
            />
            <CalenderContainer>
              <Calender handleSelectedDate={clickCalendar} />
            </CalenderContainer>
          </div>
        </Section>
        <Section>
          <SubTitle text="본문 내용" />
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
        <Button
          variant="text"
          size="small"
          onClick={() => setOpenCancleModal(true)}
        >
          취소하기
        </Button>
        <Modal
          open={openCancleModal}
          handleModal={() => setOpenCancleModal(!openCancleModal)}
        >
          <SimpleDialog
            message={`${mateId ? "수정" : "작성"}을 취소하시겠습니까?`}
            cancelMessage={`계속 ${mateId ? "수정" : "작성"}하기`}
            confirmMessage={`${mateId ? "수정" : "작성"} 취소하기`}
            clickCancleBtn={() => setOpenCancleModal(false)}
            clickConfirmBtn={() => {
              navigate("/mate-list", { replace: true });
            }}
          />
        </Modal>
        <Button
          variant="primary"
          size="small"
          onClick={() => {
            if (!mateId) clickApplyBtn("post");
            if (mateId) clickApplyBtn("put");
          }}
          disabled={isDiabledApplyBtn}
        >
          {mateId ? "수정" : "등록"}하기
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
  max-width: 1200px;
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

const ExhbChoiceBtn = styled.div`
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
  .thumbnail {
    width: inherit;
    height: inherit;
    object-fit: cover;
  }
`;

const ThumbnailHover = styled.div`
  width: inherit;
  height: inherit;
  background-color: #000000;
  color: ${theme.colors.white100};
  opacity: 80%;
  .x-btn {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 16px;
    padding: 0;
    background: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 4L20 20' stroke='%23FFFF' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M20 4L4 20' stroke='%23FFFF' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E%0A")
      no-repeat;
    color: transparent;
    cursor: pointer;
  }
  .status {
    position: absolute;
    top: 92px;
    right: 50%;
    transform: translate(50%);
  }
  .title {
    position: absolute;
    top: 162px;
    right: 50%;
    transform: translate(50%);
    font-size: 14px;
  }
  .duration {
    position: absolute;
    top: 252px;
    right: 50%;
    transform: translate(50%);
    font-size: 12px;
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
    padding: 10px 0;
    :nth-child(1) {
      margin-right: 30px;
    }
  }
`;
