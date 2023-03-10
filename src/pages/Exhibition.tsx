import React, { useCallback, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import MainCard from "../components/exhibition/MainCard";
import ContentCard from "../components/exhibition/ContentCard";
import ToggleSwitch from "../components/exhibition/ToggleSwitch";
import { exhbApi, ExhibitionRes } from "../apis/exhibition";
import isApiError from "../utils/isApiError";
import ExhbMateList from "../components/exhibition/ExhbMateList";
import ReviewWrapper from "../components/reviewCommon/ReviewWrapper";

const Exhibition = () => {
  const params = useParams();
  const [exhbDetail, setExhbDetail] = useState<ExhibitionRes>();
  const [state, setState] = useState("info");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const id = Number(params.id);

  const getExhbDetail = useCallback(async () => {
    try {
      const res: AxiosResponse<ExhibitionRes> = await exhbApi(id);
      const { data } = res;
      setExhbDetail(data);
      setIsLoading(false);
    } catch (err) {
      const errorRes = isApiError(err);
      if (typeof errorRes !== "object") return;
      const { errorCode, errorMsg } = errorRes;
      if (errorCode === 404 && errorMsg === "전시회 정보를 찾을 수 없습니다.") {
        navigate(-1);
        alert("해당 전시회 정보를 찾을 수 없습니다.");
      }
    }
  }, [navigate, id]);

  useEffect(() => {
    getExhbDetail();
  }, [getExhbDetail]);

  return (
    <ExhibitionContainer>
      <MainCard
        posterUrl={exhbDetail?.posterUrl ?? ""}
        title={exhbDetail?.title ?? ""}
        duration={exhbDetail?.duration ?? ""}
        place={exhbDetail?.space ?? ""}
        charge={exhbDetail?.adultPrice ?? 0}
        webLink={exhbDetail?.webLink ?? ""}
        id={exhbDetail?.id ?? 0}
        bookmarked={exhbDetail?.bookmarked ?? false}
        type={exhbDetail?.type ?? ""}
        viewCount={exhbDetail?.viewCount ?? 0}
        isLoading={isLoading}
      />
      <ToggleSwitch setState={setState} />
      {state === "info" && (
        <>
          <ContentCard title="전시 내용" content={exhbDetail?.content ?? ""} />
          <ContentCard title="작가 정보" content={exhbDetail?.author ?? ""} />
        </>
      )}
      {state === "review" && <ReviewWrapper />}
      {state === "mate" && <ExhbMateList />}
    </ExhibitionContainer>
  );
};

export default Exhibition;

const ExhibitionContainer = styled.div`
  width: 100vw;
  text-align: center;
  border-radius: 0px;
`;
