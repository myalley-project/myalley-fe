import React from "react";
import { Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

const Carousel = () => (
  <StyledSwiper
    scrollbar
    navigation
    modules={[Navigation, Scrollbar]}
    className="mySwiper"
  >
    <SwiperSlide>Slide 1</SwiperSlide>
    <SwiperSlide>Slide 2</SwiperSlide>
    <SwiperSlide>Slide 3</SwiperSlide>
  </StyledSwiper>
);

export default Carousel;

const StyledSwiper = styled(Swiper)`
  .swiper-wrapper {
    width: 1440px;
    height: 678px;
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
`;

// const StyledSwiperSlide = styled(SwiperSlide)`
//   & > .swiper--sli

// `
