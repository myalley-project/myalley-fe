import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { theme } from "../styles/theme";
import "../styles/carouselStyle.css";
import firstSlideImage from "../assets/images/firstSlideImage.jpg";
import secondSlideImage from "../assets/images/secondSlideImage.jpg";
import thirdSlideImage from "../assets/images/thirdSlideImage.jpg";

const NewCarousel = () => (
  <CarousalContainer>
    <Slider dots infinite speed={800} slidesToShow={1} slidesToScroll={1}>
      <SlideCard image={`${firstSlideImage}`}>
        <TextBox>
          <Title>최근 뜨고 있는 전시</Title>
          <SubTitle>
            Beyond The City: <br /> Cultural Monuments
          </SubTitle>
        </TextBox>
      </SlideCard>
      <SlideCard image={`${secondSlideImage}`}>
        <TextBox>
          <Title>최근 뜨고 있는 전시</Title>
          <SubTitle>
            Beyond The City: <br /> Cultural Monuments
          </SubTitle>
        </TextBox>
      </SlideCard>
      <SlideCard image={`${thirdSlideImage}`}>
        <TextBox>
          <Title>Wellcome to MyAlley</Title>
          <SubTitle>
            국내 모든 전시 <br /> 정보를 한 곳에서 보세요!
          </SubTitle>
        </TextBox>
      </SlideCard>
    </Slider>
  </CarousalContainer>
);

export default NewCarousel;

const CarousalContainer = styled.div`
  width: 100vw;
  max-width: 1440px;
  height: 618px;
  margin: 40px auto 30px auto;
`;

const SlideCard = styled.div<{ image: string }>`
  height: 618px;
  border-radius: 0px;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${(props) => props.image});
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  transition: all 0.6s ease-in-out;
  &:hover {
    background: url(${(props) => props.image});
    background-size: 130%;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

const TextBox = styled.div`
  text-align: center;
  margin-top: 190px;
  font-weight: 500;
`;

const Title = styled.h3`
  font-size: 28px;
  line-height: 36px;
  letter-spacing: 0px;
  text-shadow: 0px 0px 20px rgba(56, 30, 114, 0.1);
  color: ${theme.colors.white100};
  opacity: 0.8;
`;

const SubTitle = styled.p`
  font-size: 68px;
  line-height: 76px;
  letter-spacing: -1px;
  text-shadow: 0px 0px 20px rgba(56, 30, 114, 0.1);
  color: ${theme.colors.white100};
`;
