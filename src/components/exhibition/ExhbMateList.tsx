import { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { exhbMateApi } from "../../apis/exhibition";
import { MateRes } from "../../apis/member";
import { theme } from "../../styles/theme";
import { Mate } from "../../types/mateList";
import isApiError from "../../utils/isApiError";
import Button from "../atom/Button";
import MateCard from "../mate/MateCard";
import NoList from "../NoList";
import Pagination from "../Pagination";

const ExhbMateList = () => {
  const params = useParams();
  const id = Number(params.id);
  const [mateList, setMateList] = useState<Mate[] | []>([]);
  const [totalElementNum, setTotalElementNum] = useState(0);
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });

  // 상세페이지 메이트 목록 api 호출
  const getMateList = useCallback(async () => {
    try {
      const res: AxiosResponse<MateRes> = await exhbMateApi(id, pages.selected);
      const { mates, totalElement, totalPage } = res.data;
      setMateList(mates);
      setTotalElementNum(totalElement);
      setTotalPageNum(totalPage);
    } catch (err) {
      isApiError(err);
    }
  }, [id, pages]);

  useEffect(() => {
    getMateList();
  }, [getMateList]);

  return (
    <ExhbMateContainer>
      <Header>
        <Text>
          <span>{totalElementNum}</span> 개의 메이트 모집글을 확인해보세요!
        </Text>
        <a href="/mate-write">
          <Button variant="primary" size="small">
            메이트 모집하기
          </Button>
        </a>
      </Header>
      {mateList.length === 0 ? (
        <NoList notice="아직 등록된 메이트 모집글이 없습니다" />
      ) : (
        mateList.map((mate) => <MateCard key={mate.mateId} mate={mate} />)
      )}
      <Pagination pages={pages} setPages={setPages} totalPage={totalPageNum} />
    </ExhbMateContainer>
  );
};

export default ExhbMateList;

const ExhbMateContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 30px auto 50px auto;
  text-align: left;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 30px;
  padding-bottom: 14px;
  border-bottom: 1px solid ${theme.colors.greys40};
  border-radius: 0px;
`;

const Text = styled.p`
  height: 38px;
  line-height: 38px;
  color: ${theme.colors.greys90};
  font-weight: 700;
  font-size: 20px;
  > span {
    color: ${theme.colors.primry60};
  }
`;
