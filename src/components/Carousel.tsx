import React from "react";
import { Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

import firstSlideImage from "../assets/images/firstSlideImage.jpg";
import secondSlideImage from "../assets/images/secondSlideImage.jpg";
import thirdSlideImage from "../assets/images/thirdSlideImage.jpg";

const Carousel = () => {
  const firstSlideStyle = {
    backgroundImage: `url(${firstSlideImage})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `top center`,
    backgroundSize: `cover`,
    backgroundAttachment: `fixed`,
    // filter: `blur(5px)`,
    // webkitFilter: `blur(5px)`,
  };

  const secondSlideStyle = {
    backgroundImage: `url(${secondSlideImage})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `top center`,
    backgroundSize: `cover`,
    backgroundAttachment: `fixed`,
  };

  const thirdSlideStyle = {
    backgroundImage: `url(${thirdSlideImage})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `top center`,
    backgroundSize: `cover`,
    backgroundAttachment: `fixed`,
  };

  return (
    <Container>
      <StyledSwiper
        scrollbar
        navigation
        modules={[Navigation, Scrollbar]}
        className="mySwiper"
      >
        <SwiperSlide style={firstSlideStyle}>
          <Slide />
          <Text>
            <div>최근 뜨고 있는 전시</div>
            <div>
              Beyond The City:
              <br /> Cultural Monuments
            </div>
          </Text>
        </SwiperSlide>
        <SwiperSlide style={secondSlideStyle}>
          <Slide />
          <Text>
            <div>최근 뜨고 있는 전시</div>
            <div>
              Beyond The City:
              <br /> Cultural Monuments
            </div>
          </Text>
        </SwiperSlide>
        <SwiperSlide style={thirdSlideStyle}>
          <Slide />
          <Text>
            <div>최근 뜨고 있는 전시</div>
            <div>
              Beyond The City:
              <br /> Cultural Monuments
            </div>
          </Text>
        </SwiperSlide>
      </StyledSwiper>
    </Container>
  );
};

export default Carousel;

const Container = styled.div`
  display: flex;
`;

const StyledSwiper = styled(Swiper)`
  .swiper-wrapper {
    width: 1440px;
    height: 678px;
  }
  & .swiper-slide {
    position: relative;
  }
  & .swiper-scrollbar {
    display: block !important;
    width: 210px;
    margin-inline: auto;
    left: 0;
    right: 0;
    bottom: 2.5rem;
    background: #9c9c9c;
  }
  & .swiper-scrollbar-drag {
    background-color: #fff;
  }
  & > .swiper-button-prev,
  & > .swiper-button-next {
    color: #9c9c9c;
  }
`;

const Slide = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(5px);
`;

const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
  & > div:first-child {
    color: #9c9c9c;
    font-size: 28px;
  }
  & > div:nth-child(2) {
    color: #333;
    font-size: 68px;
  }
`;
