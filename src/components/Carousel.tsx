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
    <SwiperSlide>
      <Slide>
        <div>최근 뜨고 있는 전시</div>
        <div>
          Beyond The City:
          <br /> Cultural Monuments
        </div>
      </Slide>
    </SwiperSlide>
    <SwiperSlide>
      <Slide>
        <div>최근 뜨고 있는 전시</div>
        <div>
          Beyond The City:
          <br />
          Cultural Monuments
        </div>
      </Slide>
    </SwiperSlide>
    <SwiperSlide>
      <Slide>
        <div>최근 뜨고 있는 전시</div>
        <div>
          Beyond The City:
          <br />
          Cultural Monuments
        </div>
      </Slide>
    </SwiperSlide>
  </StyledSwiper>
);

export default Carousel;

const StyledSwiper = styled(Swiper)`
  .swiper-wrapper {
    width: 1440px;
    height: 678px;
  }
  & .swiper-slide {
    display: grid;
    justify-content: center;
    align-items: center;
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
  & .swiper-button-prev,
  & .swiper-button-next {
    color: #9c9c9c;
  }
`;

const Slide = styled.div`
  & > div:first-child {
    font-size: 28px;
    color: #9c9c9c;
  }
  & > div:nth-child(2) {
    font-size: 68px;
    color: #333;
  }
`;
