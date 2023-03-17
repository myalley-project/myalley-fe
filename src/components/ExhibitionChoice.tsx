import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import exhbListApi, { ExhbListRes } from "../apis/exhbList";
import { theme } from "../styles/theme";
import ExhbCardListModal from "./exhbChoiceModal/ExhbCardListModal";
import Button from "./atom/Button";
import { StatusType } from "./exhibitionList/Filters";

interface ChoiceProps {
  getExhbInfo: (
    url: string,
    id: number,
    title: string,
    duration: string,
    status: string
  ) => void;
  handleModal: () => void;
}

const ExhibitionChoice = ({ getExhbInfo, handleModal }: ChoiceProps) => {
  const [exhbStatus, setExhbStatus] = useState<StatusType>("현재");
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });

  const { data } = useQuery<ExhbListRes, Error>({
    queryKey: ["exhbList", { pages, exhbStatus }],
    queryFn: () =>
      exhbListApi(exhbStatus, "전체 전시", "최신순", pages.selected).then(
        (res) => res.data
      ),
  });

  return (
    <Container>
      <Infowrapper>
        <h1>전시회 목록</h1>
        <ButtonGroup>
          <Button
            onClick={() => setExhbStatus("현재")}
            size="small"
            variant={exhbStatus === "현재" ? "primary" : "text"}
          >
            현재 전시
          </Button>
          <Button
            onClick={() => setExhbStatus("예정")}
            size="small"
            variant={exhbStatus === "예정" ? "primary" : "text"}
          >
            예정 전시
          </Button>
        </ButtonGroup>
      </Infowrapper>

      {data && (
        <ExhbCardListModal
          handleModal={handleModal}
          exhbList={data.exhibitions}
          type="exhbList"
          getExhbInfo={getExhbInfo}
          pages={pages}
          setPages={setPages}
          totalPage={data.totalPage ?? 0}
        />
      )}
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
  width: 90vw;
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
