import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import exhbListApi, { ExhbListRes } from "../apis/getExhbList";
import { theme } from "../styles/theme";
import ExhbCardListModal from "./exhibitionList/ExhbCardListModal";
import Button from "./atom/Button";
import { FilterType, Exhibition } from "../types/exhbList";
import { StatusType } from "./exhibitionList/Filters";

interface ChoiceProps {
  getImgAndId: (
    imgUrl: string,
    exhbId: number,
    exhbtitle: string,
    duration: string,
    exhbstatus: string
  ) => void;
}

// 이런 형태의 state와
// const [selectedExhb, setSelectedExhb] = useState({
//   imageUrl: "",
//   exhbitionId: 0,
// });

// 이런 형식의 함수를 상위 컴포넌트에서 내려주는걸로 생각하고 있습니다.
// const getImgAndId = (imgUrl: string, exhbId: number) => {
//   setSelectedExhb({ imageUrl: imgUrl, exhbitionId: exhbId });
// };

const ExhibitionChoice = ({ getImgAndId }: ChoiceProps) => {
  const [exhbStatus, setExhbStatus] = useState<StatusType>("현재");
  const [pageInfo, setPageInfo] = useState(1);

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
          <Button
            onClick={() => setExhbStatus("현재")}
            size="small"
            variant="primary"
          >
            현재 전시
          </Button>
          <Button
            onClick={() => setExhbStatus("예정")}
            size="small"
            variant="text"
          >
            예정 전시
          </Button>
        </ButtonGroup>
      </Infowrapper>

      {data ? (
        <ExhbCardListModal
          exhbList={data.exhibitions}
          type="exhbList"
          getImgAndId={getImgAndId}
        />
      ) : null}
    </Container>
  );
};

export default ExhibitionChoice;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  background-color: #fff;
  z-index: 1000;
  width: 1507px;
  margin-inline: auto;
`;

const Infowrapper = styled.div`
  display: flex;
  flex-flow: column;
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
  margin-bottom: 28px;
`;
