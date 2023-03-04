import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Pagination from "../Pagination";
import { Exhibition } from "../../types/exhbList";
import { theme } from "../../styles/theme";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

interface ExhbCardListType {
  exhbList: Exhibition[];
  type: "myPage" | "exhbList";
  getExhbInfo: (
    url: string,
    id: number,
    title: string,
    duration: string,
    status: string
  ) => void;
  handleModal: () => void;
  pages: {
    started: number;
    selected: number;
  };
  setPages: React.Dispatch<
    React.SetStateAction<{
      started: number;
      selected: number;
    }>
  >;
  totalPage: number;
}
const ExhbCardListModal = ({
  exhbList,
  type,
  getExhbInfo,
  handleModal,
  pages,
  setPages,
  totalPage,
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
    <Container>
      {exhbList.map((exhb) => {
        const { id, title, space, duration, posterUrl, viewCount, status } =
          exhb;
        return (
          <ExhibitionCard
            key={exhb.id}
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
        );
      })}
      <PageContainer>
        <Pagination pages={pages} setPages={setPages} totalPage={totalPage} />
      </PageContainer>
    </Container>
  );
};

export default ExhbCardListModal;

const Container = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-height: calc(100vh - 400px);
  overflow-y: auto;
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const ExhibitionCard = styled.div`
  border: 2px solid ${theme.colors.greys40};
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
    line-height: 21px;
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

const PageContainer = styled.div`
  grid-column: 1/-1;
`;
