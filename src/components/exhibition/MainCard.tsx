import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  BookMarkRes,
  exhbBookMarkApi,
  exhbDeleteApi,
} from "../../apis/exhibition";
import { theme } from "../../styles/theme";
import isApiError from "../../utils/isApiError";
import BookMark from "../atom/BookMark";
import useRefreshTokenApi from "../../apis/useRefreshToken";

export interface MainCardType {
  posterUrl: string;
  title: string;
  duration: string;
  place: string;
  charge: number;
  webLink: string;
  id: number;
  bookmarked: boolean;
  type: string;
  viewCount: number;
}
const MainCard = ({
  posterUrl,
  title,
  duration,
  place,
  charge,
  webLink,
  id,
  bookmarked,
  type,
  viewCount,
}: MainCardType) => {
  const auth = localStorage.getItem("authority");
  const navigate = useNavigate();
  const refreshTokenApi = useRefreshTokenApi();
  const [imgHeight, setImgHeight] = useState(52);

  // 전시글 삭제
  const handleDelete = async () => {
    try {
      await exhbDeleteApi(id);
      alert("전시글 삭제가 완료되었습니다.");
      navigate("/");
    } catch (err) {
      const errorRes = isApiError(err);
      if (errorRes === "accessToken 만료") {
        await refreshTokenApi();
        await exhbDeleteApi(id);
        alert("전시글 삭제가 완료되었습니다.");
        navigate("/");
      }
    }
  };

  // 북마크 버튼
  const toggleBookMark = async () => {
    if (!localStorage.getItem("accessToken")) return;
    try {
      const res: AxiosResponse<BookMarkRes> = await exhbBookMarkApi(id);
      const { msg } = res.data;
      alert(msg);
    } catch (err) {
      isApiError(err);
      const errorRes = isApiError(err);
      if (errorRes === "accessToken 만료") {
        await refreshTokenApi();
        const reRes = await exhbBookMarkApi(id);
        const { msg } = reRes.data;
        alert(msg);
      }
      if (typeof errorRes !== "object") return;
      const { errorCode, errorMsg } = errorRes;
      if (errorCode === 404 && errorMsg === "회원 정보 없음") {
        alert("유효하지 않은 토큰입니다. 다시 로그인해주세요.");
      }
    }
  };

  // 공유하기 버튼
  const copyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("주소가 복사되었습니다.");
      })
      .catch(() => {
        alert(
          "주소 복사에 실패했습니다. 다시 시도해주세요. (해당 기능은 현재 크롬에서만 가능합니다.)"
        );
      });
  };

  useEffect(() => {
    const titleHeight =
      localStorage.getItem("authority") === "ROLE_ADMIN" ? 318 : 258;
    setTimeout(() => {
      const height = document.querySelector(".titleHeight")?.clientHeight;
      setImgHeight(height! + titleHeight);
    }, 100);
  }, []);

  return (
    <CardContainer height={auth === "ROLE_ADMIN" ? "520px" : "462px"}>
      <Card>
        <PosterImg
          src={posterUrl}
          alt="poster-img"
          style={{ height: imgHeight }}
        />
        <InfoContainer>
          {auth === "ROLE_ADMIN" && (
            <EditButtons>
              <Button onClick={() => navigate("edit")}>수정</Button>
              <Button onClick={handleDelete}>삭제</Button>
            </EditButtons>
          )}
          <ViewCount>
            <dt>조회수</dt>
            <dd>{viewCount}</dd>
          </ViewCount>
          <TitleContainer>
            <Title className="titleHeight">{title}</Title>
          </TitleContainer>
          <div style={{ padding: "30px 0" }}>
            <InfoDetail>
              <dt>일정</dt>
              <dd>{duration}</dd>
            </InfoDetail>
            <InfoDetail>
              <dt>장소</dt>
              <dd>{place}</dd>
            </InfoDetail>
            <InfoDetail>
              <dt>전시 유형</dt>
              <dd>{type}</dd>
            </InfoDetail>
            <InfoDetail style={{ marginBottom: "0px" }}>
              <dt>관람비용</dt>
              <dd>
                {charge > 0
                  ? `${charge
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`
                  : "무료"}
              </dd>
            </InfoDetail>
          </div>
          <Footer>
            <WebLink href={webLink} target="_blank" rel="noopener noreferrer">
              사이트 방문
            </WebLink>
            {localStorage.getItem("authority") !== "ROLE_ADMIN" && (
              <BookMarkBtn>
                <BookMark onClick={toggleBookMark} marked={bookmarked} />
              </BookMarkBtn>
            )}
            <ShareBtn type="button" onClick={copyLink} />
          </Footer>
        </InfoContainer>
      </Card>
    </CardContainer>
  );
};

export default MainCard;

const CardContainer = styled.div<{ height: string }>`
  display: flex;
  width: 100%;
  height: fit-content;
  padding: 50px 0;
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
  box-shadow: 0px 4px 30px rgba(79, 55, 139, 0.05);
`;

const PosterImg = styled.img`
  width: 380px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  position: relative;
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
  font-size: 16px;
  cursor: pointer;
  &:hover {
    font-weight: 700;
    color: ${theme.colors.greys100};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
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
  font-size: 16px;
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

const ViewCount = styled(InfoDetail)`
  margin-left: auto;
  margin-bottom: 8px;
  font-size: 14px;
  dt {
    width: 38px;
    margin-right: 8px;
  }
`;

const Footer = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  bottom: 30px;
  right: 30px;
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
  font-size: 16px;
  text-decoration: none;
  color: ${theme.colors.primry70};
  &:hover {
    background-color: ${theme.colors.greys10};
    color: ${theme.colors.greys100};
  }
`;

const BookMarkBtn = styled.div`
  margin-top: 5px;
`;

const ShareBtn = styled.button`
  width: 24px;
  height: 24px;
  padding: 0px;
  margin-top: 5px;
  border-radius: 0px;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='18' cy='5' r='3' stroke='%236750A4' stroke-width='2'/%3E%3Ccircle cx='6' cy='12' r='3' stroke='%236750A4' stroke-width='2'/%3E%3Ccircle cx='18' cy='19' r='3' stroke='%236750A4' stroke-width='2'/%3E%3Cpath d='M9 10L15 6' stroke='%236750A4' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M9 14L15 18' stroke='%236750A4' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E%0A");
  &:hover {
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='18' cy='5' r='3' fill='%236750A4' stroke='%236750A4' stroke-width='2'/%3E%3Ccircle cx='6' cy='12' r='3' fill='%236750A4' stroke='%236750A4' stroke-width='2'/%3E%3Ccircle cx='18' cy='19' r='3' fill='%236750A4' stroke='%236750A4' stroke-width='2'/%3E%3Cpath d='M9 10L15 6' stroke='%236750A4' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M9 14L15 18' stroke='%236750A4' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  }
`;
