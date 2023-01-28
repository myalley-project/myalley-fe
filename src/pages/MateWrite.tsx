import React from "react";
import styled from "styled-components";
import plus from "../assets/icons/plus.svg";
import Button from "../components/atom/Button";
import CheckLabel from "../components/atom/CheckLabel";
import Selectbox from "../components/atom/Selectbox";
import Calender from "../components/Calendar";
// import Editor, { EditTextArea } from "../components/Editor";
import SubTitle from "../components/SubTitle";
import { theme } from "../styles/theme";

const MateWrite = () => {
  const a = 3;
  const onClick = () => {};

  return (
    <>
      <MateWriteContainer>
        <TitleInput type="text" placeholder="제목을 입력해주세요" />
        <Section>
          <SubTitle text="모집 상태" />
          <Selectbox
            placeholder="모집 중"
            options={["모집 중", "모집 완료"]}
            width="130px"
            name="mateStatus"
            onClick={onClick}
          />
        </Section>
        <Section>
          <SubTitle text="원하는 메이트 성별" />
          <Selectbox
            placeholder="성별 무관"
            options={["성별 무관", "남", "여"]}
            width="130px"
            name="mateGender"
            onClick={onClick}
          />
        </Section>
        <SubTitle text="원하는 메이트 나이" />
        <Section className="flex">
          <div className="flex">
            <SelectLabel>최소</SelectLabel>
            <Selectbox
              placeholder="선택하기"
              options={["20대 초반", "20대 중반", "20대 후반"]}
              width="130px"
              name="minimumAge"
              onClick={onClick}
            />
          </div>
          <div className="flex maximum-age">
            <SelectLabel>최대</SelectLabel>
            <Selectbox
              placeholder="선택하기"
              options={["20대 초반", "20대 중반", "20대 후반"]}
              width="130px"
              name="maximumAge"
              onClick={onClick}
            />
          </div>
          <CheckLabel label="연령 무관" onClick={onClick} />
        </Section>
        <Section className="flex">
          <div className="exhb-choice">
            <SubTitle text="전시회" />
            <ExhbChoice type="button">
              <img src={plus} alt="전시회 선택하기" />
            </ExhbChoice>
          </div>
          <div>
            <SubTitle text="관람일" />
            <CheckLabel label="미정" onClick={onClick} />
            <CalenderContainer>
              <Calender />
            </CalenderContainer>
          </div>
        </Section>
        <Section>
          <SubTitle text="메이트 설명글" />
          {/* <EditTextArea /> */}
          {/* 임시 텍스트박스 */}
          {/* <Editor /> */}
        </Section>
        <Section>
          <SubTitle text="연락망" />
          <ContactInput placeholder="오픈채팅방, 메신저 아이디, 메신저 링크 등 연락 수단을 남겨주세요" />
        </Section>
      </MateWriteContainer>
      <BtnContainer>
        <Button variant="text" size="small">
          취소하기
        </Button>
        <Button variant="primary" size="small">
          등록하기
        </Button>
      </BtnContainer>
    </>
  );
};

export default MateWrite;

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

const ExhbChoice = styled.button`
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
