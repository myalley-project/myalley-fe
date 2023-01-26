import React, { useCallback, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MainCard from "../components/exhibition/MainCard";
import ContentCard from "../components/exhibition/ContentCard";
import ToggleSwitch from "../components/exhibition/ToggleSwitch";
import exhibitionApi, { ExhibitionRes } from "../apis/exhibition";
import isApiError from "../utils/isApiError";

const Exhibition = () => {
  const params = useParams();
  const [exhbDetail, setExhbDetail] = useState<ExhibitionRes>();
  const getExhbDetail = useCallback(async (id: number) => {
    try {
      const res: AxiosResponse<ExhibitionRes> = await exhibitionApi(id);
      const { data } = res;
      setExhbDetail(data);
    } catch (err) {
      isApiError(err);
    }
  }, []);

  useEffect(() => {
    getExhbDetail(Number(params.id));
  }, [getExhbDetail, params]);

  const [state, setState] = useState("info");
  return (
    <ExhibitionContainer>
      <MainCard
        title={exhbDetail?.title ?? ""}
        date={exhbDetail?.duration ?? ""}
        place={exhbDetail?.space ?? ""}
        charge={exhbDetail?.adultPrice ?? 0}
      />
      <ToggleSwitch setState={setState} />
      {state === "info" && (
        <>
          <ContentCard title="전시 내용" content={exhbDetail?.content ?? ""} />
          <ContentCard title="작가 정보" content={exhbDetail?.author ?? ""} />
        </>
      )}
    </ExhibitionContainer>
  );
};

export default Exhibition;

const ExhibitionContainer = styled.div`
  width: 100vw;
  text-align: center;
  border-radius: 0px;
`;
