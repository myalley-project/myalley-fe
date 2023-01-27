import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { exhbDeleteApi } from "../../apis/exhibition";
import { theme } from "../../styles/theme";
import isApiError from "../../utils/isApiError";

export interface MainCardType {
  posterUrl: string;
  title: string;
  date: string;
  place: string;
  charge: number;
  webLink: string;
  id: number;
}
const MainCard = ({
  posterUrl,
  title,
  date,
  place,
  charge,
  webLink,
  id,
}: MainCardType) => {
  const auth = localStorage.getItem("authority");
  const location = useLocation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await exhbDeleteApi(id);
      alert("전시글 삭제가 완료되었습니다.");
      navigate("/");
    } catch (err) {
      isApiError(err);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${location.pathname}`);
    alert("주소가 복사되었습니다.");
  };

  return (
    <CardContainer>
      <Card>
        <PosterImg src={posterUrl} alt="poster-img" />
        <InfoContainer>
          {auth === "ROLE_ADMIN" && (
            <EditButtons>
              <Button onClick={() => navigate("edit")}>수정</Button>
              <Button onClick={handleDelete}>삭제</Button>
            </EditButtons>
          )}
          <Title>{title}</Title>
          <div style={{ padding: "30px 0" }}>
            <InfoDetail>
              <dt>시간</dt>
              <dd>{date}</dd>
            </InfoDetail>
            <InfoDetail>
              <dt>장소</dt>
              <dd>{place}</dd>
            </InfoDetail>
            <InfoDetail style={{ marginBottom: "0px" }}>
              <dt>관람비용</dt>
              <dd>
                {charge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
              </dd>
            </InfoDetail>
          </div>
          <Footer>
            <WebLink href={webLink} target="_blank" rel="noopener noreferrer">
              사이트 방문
            </WebLink>
            <BookMarkBtn type="button" />
            <ShareBtn type="button" onClick={copyLink} />
          </Footer>
        </InfoContainer>
      </Card>
    </CardContainer>
  );
};

export default MainCard;

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 458px;
  align-items: center;
  justify-content: center;
  border-radius: 0px;
  background-color: rgba(149, 141, 165, 0.05);
`;

const Card = styled.div`
  display: flex;
  max-width: 1200px;
  width: 83vw;
  border: 1px solid rgba(127, 103, 190, 0.3);
  background-color: ${theme.colors.white100};
`;

const PosterImg = styled.img`
  width: 278px;
`;

const InfoContainer = styled.div`
  width: 922px;
  padding: 30px;
`;

const EditButtons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  height: 30px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  padding: 0;
  color: ${theme.colors.greys60};
  font-size: 14px;
  cursor: pointer;
  &:hover {
    font-weight: 700;
    color: ${theme.colors.greys100};
  }
`;

const Title = styled.h1`
  width: 100%;
  font-weight: 700;
  font-size: 42px;
  line-height: 52px;
  color: ${theme.colors.greys90};
  text-align: left;
  word-break: break-all;
`;

const InfoDetail = styled.dl`
  display: flex;
  width: fit-content;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${theme.colors.greys80};
  text-align: left;
  margin-bottom: 10px;
  dt {
    width: 72px;
    font-weight: 500;
    margin-right: 30px;
  }
  dd {
    font-weight: 400;
  }
`;

const Footer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  color: ${theme.colors.greys60};
  text-align: right;
`;

const WebLink = styled.a`
  padding: 4px 10px;
  border-radius: 10px;
  line-height: 24px;
  text-decoration: none;
  color: ${theme.colors.primry70};
  &:hover {
    background-color: ${theme.colors.greys10};
    color: ${theme.colors.greys100};
  }
`;

const BookMarkBtn = styled.button`
  width: 24px;
  height: 24px;
  padding: 0px;
  margin-top: 5px;
  border-radius: 0px;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.6556 5.46527L11.9709 7.60218L10.4492 5.5704C9.27909 4.00811 7.1253 3.56296 5.43005 4.53303C2.70435 6.09275 2.17049 9.79336 4.34455 12.0575L11.9709 20L19.6624 11.9896C21.8117 9.75126 21.3029 6.09626 18.6237 4.52777C16.9657 3.55709 14.8443 3.95739 13.6556 5.46527Z' stroke='%236750A4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  &:hover {
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.6556 5.46527L11.9709 7.60218L10.4492 5.5704C9.27909 4.00811 7.1253 3.56296 5.43005 4.53303C2.70435 6.09275 2.17049 9.79336 4.34455 12.0575L11.9709 20L19.6624 11.9896C21.8117 9.75126 21.3029 6.09626 18.6237 4.52777C16.9657 3.55709 14.8443 3.95739 13.6556 5.46527Z' fill='%236750A4' stroke='%236750A4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  }
`;

const ShareBtn = styled(BookMarkBtn)`
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='18' cy='5' r='3' stroke='%236750A4' stroke-width='2'/%3E%3Ccircle cx='6' cy='12' r='3' stroke='%236750A4' stroke-width='2'/%3E%3Ccircle cx='18' cy='19' r='3' stroke='%236750A4' stroke-width='2'/%3E%3Cpath d='M9 10L15 6' stroke='%236750A4' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M9 14L15 18' stroke='%236750A4' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E%0A");
  &:hover {
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='18' cy='5' r='3' fill='%236750A4' stroke='%236750A4' stroke-width='2'/%3E%3Ccircle cx='6' cy='12' r='3' fill='%236750A4' stroke='%236750A4' stroke-width='2'/%3E%3Ccircle cx='18' cy='19' r='3' fill='%236750A4' stroke='%236750A4' stroke-width='2'/%3E%3Cpath d='M9 10L15 6' stroke='%236750A4' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M9 14L15 18' stroke='%236750A4' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  }
`;
