import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import ProfileImg from "../../assets/icons/profileImg.svg";
import StarIcon from "../../assets/icons/starIcon.svg";

const OnelineCard = () => (
  <Container>
    <Review>
      <img src={ProfileImg} alt="사람 이미지" />
      <ReviewInfo>
        <div>
          <img src={StarIcon} alt="별점" />
          <img src={StarIcon} alt="별점" />
          <img src={StarIcon} alt="별점" />
          <img src={StarIcon} alt="별점" />
          <img src={StarIcon} alt="별점" />
        </div>
        <div>
          <span>별명</span> | <span>2022-12-14</span> |{" "}
          <span>13~14시 사이</span> | <span>원활</span>
        </div>
        <p>가상의 세계는 상상 속</p>
      </ReviewInfo>
    </Review>
    <ButtonItems>
      <button type="button">수정</button>
      <Spliter />
      <button type="button">삭제</button>
    </ButtonItems>
  </Container>
);

export default OnelineCard;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 30px;
  border: 1px solid ${theme.colors.greys40};
`;

const Review = styled.div`
  display: flex;
  gap: 30px;
  & > img {
    width: 86px;
    aspect-ratio: 1 / 1;
  }
`;

const ReviewInfo = styled.div`
  & > img {
    margin-bottom: 10px;
  }
  & > div {
    color: ${theme.colors.greys60};
    font-size: 12px;
    margin-bottom: 20px;
  }
  & > p {
    color: ${theme.colors.greys90};
    font-weight: 700;
    font-size: 14px;
  }
`;

const ButtonItems = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: first baseline;
  padding: 0px;
  & > button {
    color: ${theme.colors.greys60};
    border: 0;
  }
`;

const Spliter = styled.div`
  width: 1px;
  height: 20px;
  border-right: 1px solid ${theme.colors.greys10};
`;
