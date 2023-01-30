import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { theme } from "../../styles/theme";
import ProfileImage from "../../assets/icons/profileImg.svg";
import Button from "../atom/Button";

const BlogReviewDetail = () => (
  <Container>
    <DetailTitle>진달래 박우혁: 코스모스</DetailTitle>
    <Divider />
    <DetailInformation>
      <DetailDiv>
        <span>관람일</span>
        <p>2022년 12월 14일</p>
      </DetailDiv>
      <DetailDiv>
        <span>관람 시간</span>
        <p>2022년 12월 14일</p>
      </DetailDiv>
      <DetailDiv>
        <span>혼잡도</span>
        <p>2022년 12월 14일</p>
      </DetailDiv>
      <DetailDiv>
        <span>주차공간</span>
        <p>2022년 12월 14일</p>
      </DetailDiv>
      <DetailDiv>
        <span>재방문 의향</span>
        <p>2022년 12월 14일</p>
      </DetailDiv>
    </DetailInformation>
    <MainPart>
      <StyledSWiper>
        <SwiperSlide>그림 1</SwiperSlide>
        <SwiperSlide>그림 2</SwiperSlide>
        <SwiperSlide>그림 3</SwiperSlide>
      </StyledSWiper>
      <p>
        저술과 디자인을 하나로 엮는 〈스위스디자인여행〉이나 《제1회
        안양공공예술프로젝트》와 《베니스건축비엔날레 한국관》의 그래픽 등
        한국의 그래픽디자인계에 새로운 단서를 제시한 초기 작업에서부터 전위적
        디자인 실험의 〈테이크아웃드로잉 신문〉 연작, 주요 미술 행사의 전시
        그래픽, 현실을 그들만의 언어로 번역하고 기록하는 〈아카이브안녕〉,
        그래픽을 설치, 사운드, 영상, 퍼포먼스로 확장한 〈마스터 플랜: 화합과
        전진〉(국립현대미술관 과천, 2020)에 이르기까지 진달래&박우혁의 주요
        그래픽 작업들을 한 자리에 모았다. 타이포그래피란 무엇인가. 본질에 대해
        묻는 그들의 작업은 가장 작고 유일한 타이포그래피 요소인 ‘활자’를
        움직이는 것에서부터 시작한다. 텍스트의 체계와 구조를 낱낱이 쪼개 분석한
        후, 공간 위에 새로운 질서의 배열을 시도한다. 진달래&박우혁의 텍스트와
        이미지는 이동한다. 타이포그래피란 글자를 공간에 움직일 때 비로소
        성립하므로, 동일한 원리에 따라 이미지를 움직여 타이포그래피한다. 그들이
        이미지를 대하는 태도는 글자를 바라볼 때와 동일하다. 작업에 등장하는
        추상적 기호, 패턴, 상징을 타이포그래피의 일부로 간주하는 것은 글자와
        유사한 형태라서가 아니라, 글자처럼 움직이기 때문이다. 이번 전시에서는
        활자의 배열이 두드러지는 작품뿐만 아니라, 이미지적 해석이 두드러지는
        타이포그래피 작업을 만나볼 수 있다. *전시 오픈 당일 12월 9일 오후 6시,
        진달래&박우혁의 전시 도슨트가 진행됩니다.
      </p>
    </MainPart>
    <UserInfo>
      <img src={ProfileImage} alt="프로필 이미지" />
      <h3>닉네임</h3>
      <DateandView>
        <p>
          <span>작성일</span> 2023-01-31
        </p>
        <p>
          <span>조회수</span> 99
        </p>
      </DateandView>
    </UserInfo>
    <ButtonGroup>
      <Button size="small" variant="text" type="button">
        유익해요
      </Button>
      <Button size="small" variant="text" type="button">
        저장하기
      </Button>
    </ButtonGroup>
  </Container>
);

export default BlogReviewDetail;

const Container = styled.div`
  width: 1095px;
  padding: 30px;
  margin-inline: auto;
`;

const DetailTitle = styled.h2`
  font-weight: 700;
  font-size: 28px;
  color: ${theme.colors.greys90};
`;

const Divider = styled.div`
  border-bottom: 1px solid ${theme.colors.greys40};
  margin: 14px 0;
`;

const DetailInformation = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 30px;
  font-weight: 500;
  font-size: 12px;
  color: ${theme.colors.greys80};
  margin-bottom: 50px;
`;

const DetailDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  & span {
    padding: 2px 16px;
    border-radius: 30px;
    background-color: ${theme.colors.primry60};
    color: ${theme.colors.white100};
  }
`;

const MainPart = styled.div`
  margin-bottom: 50px;
`;

const StyledSWiper = styled(Swiper)`
  width: 100%;
  height: 383px;
  background-color: ${theme.colors.primry60};
  margin-bottom: 30px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;
  margin-bottom: 50px;
`;

const DateandView = styled.div`
  display: flex;
  color: ${theme.colors.greys90};
  gap: 20px;
  & > img {
    width: 64px;
    margin-bottom: 14px;
  }
  & > h3 {
    font-weight: 700;
    font-size: 20px;
  }
  & > p {
    font-weight: 500;
    font-size: 12px;
    & > span {
      color: ${theme.colors.greys60};
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;
