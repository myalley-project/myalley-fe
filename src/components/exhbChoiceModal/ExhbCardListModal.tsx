import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeConsumer } from "styled-components";
import { Exhibition } from "../../types/exhbList";
import { theme } from "../../styles/theme";
import "swiper/css";

interface ExhbCardListType {
  exhbList: Exhibition[]; // 전시회 목록 데이터
  type: "myPage" | "exhbList";
  getExhbInfo: (
    url: string,
    id: number,
    title: string,
    duration: string,
    status: string
  ) => void;
  handleModal: () => void;
}
const ExhbCardListModal = ({
  exhbList,
  type,
  getExhbInfo,
  handleModal,
}: ExhbCardListType) => {
  const navigate = useNavigate();

  const HandleClick = (
    url: string,
    id: number,
    title: string,
    duration: string,
    status: string
  ) => {
    if (type === "myPage") {
      navigate(`/exhibition/${id}`);
    } else {
      getExhbInfo(url, id, title, duration, status);
    }
  };

  return (
    <div>
      <Swiper slidesPerView={4} spaceBetween={30} className="mySwiper">
        {exhbList.map((exhb) => {
          const { id, title, space, duration, posterUrl, viewCount, status } =
            exhb;
          return (
            <SwiperSlide key={exhb.id}>
              <ExhibitionCard
                onClick={() => {
                  HandleClick(posterUrl, id, title, duration, status);
                  handleModal();
                }}
              >
                <Thumbnail>
                  <img alt="thumbnail" src={posterUrl} />
                </Thumbnail>
                <ContentBox>
                  <ContentTop>
                    <h2>{title}</h2>
                    <p>{space}</p>
                  </ContentTop>
                  <ContentFooter>
                    <div className="exhb-period">{duration}</div>
                    <span className="viewCount">조회수 {viewCount}</span>
                  </ContentFooter>
                </ContentBox>
              </ExhibitionCard>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ExhbCardListModal;

const ExhibitionCard = styled.div`
  width: 338px;
  height: fit-content;
  border: 2px solid ${theme.colors.greys40};
  /* border-radius: 30px; */
  cursor: pointer;
  :hover {
    border: 2px solid ${theme.colors.primry60};
    box-shadow: 0px 0px 20px #381e7218;
  }
`;

const Thumbnail = styled.div`
  height: 450px;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 20px;
`;

const ContentTop = styled.div`
  & > h2 {
    color: ${theme.colors.greys90};
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 6px;
    white-space: nowrap;
    line-height: 21px;
    overflow: clip;
  }
  & > p {
    color: ${theme.colors.greys60};
    font-size: 12px;
  }
`;

const ContentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  .exhb-period {
    color: ${theme.colors.greys80};
  }
  .viewCount {
    color: ${theme.colors.greys60};
  }
`;
