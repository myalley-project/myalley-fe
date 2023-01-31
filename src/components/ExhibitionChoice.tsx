import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import exhbListApi, { ExhbListRes } from "../apis/getExhbList";
import { theme } from "../styles/theme";
import ExhbCardList from "./exhibitionList/ExhbCardList";
import Button from "./atom/Button";
import { FilterType, Exhibition } from "../types/exhbList";
import { StatusType } from "./exhibitionList/Filters";

const ExhibitionChoice = () => {
  const [exhbStatus, setExhbStatus] = useState<StatusType>("현재");
  // const [type, setType] = useState<FilterType>("전체");
  const [pageInfo, setPageInfo] = useState(1);
  // const [exhbList, setExhbList] = useState<Exhibition[] | []>([]);

  const getexhbListApi = async (
    status: StatusType,
    type: FilterType,
    page: number
  ) => {
    if (type === "전체") {
      const res: AxiosResponse<ExhbListRes> = await axios.get(
        "/data/exhbList.json"
      ); // 테스트용 목데이터
      //   await apiInstance.get(
      //   `/main/exhibitions/?status=${status}전시&page=${page}`
      // );
      return res.data;
    }
    const res: AxiosResponse<ExhbListRes> = await axios.get(
      "/data/exhbListFiltered.json"
    ); // 테스트용 목데이터
    //   await apiInstance.get(
    //   `/exhibitions/?status=${status}전시&type=${type}전시&page=${page}`
    // );
    return res.data;
  };

  const { isLoading, isError, error, data } = useQuery<ExhbListRes, Error>({
    queryKey: ["exhbList", { pageInfo, exhbStatus }],
    queryFn: () => getexhbListApi(exhbStatus, "전체", pageInfo),
  });

  if (isLoading) return <div>...loading</div>;

  if (isError) return <div>에러가 발생했습니다! {error.message}</div>;

  return (
    <Container>
      <Infowrapper>
        <h1>전시회 목록</h1>
        <ButtonGroup>
          <Button size="small" variant="primary">
            현재 전시
          </Button>
          <Button size="small" variant="text">
            예정 전시
          </Button>
        </ButtonGroup>
      </Infowrapper>
      {data ? (
        <ExhbCardList exhbList={data.exhibitions} type="exhbList" />
      ) : null}
    </Container>
  );
};

export default ExhibitionChoice;

const Container = styled.div`
  width: 80vw;
  padding: 30px;
  margin-inline: auto;
`;

const Infowrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  & > h1 {
    color: ${theme.colors.greys90};
    font-weight: 700;
    font-size: 28px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;
