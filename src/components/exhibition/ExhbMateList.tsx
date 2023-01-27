import { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { exhbMateApi } from "../../apis/exhibition";
import { MateRes } from "../../apis/member";
import { theme } from "../../styles/theme";
import { Mate } from "../../types/mate";
import isApiError from "../../utils/isApiError";
import Button from "../atom/Button";
import MateCard from "../mate/MateCard";
import Pagination from "../Pagination";

const ExhbMateList = () => {
  const [mateList, setMateList] = useState<Mate[] | []>([]);
  const [pageInfoData, setPageInfoData] = useState({
    page: 0,
    size: 0,
    totalElement: 0,
    totalPage: 0,
  });
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });

  // 상세페이지 메이트 목록 api 호출
  const getMateList = useCallback(async () => {
    try {
      const res: AxiosResponse<MateRes> = await exhbMateApi(1, 1);
      const { mates, pageInfo } = res.data;
      setMateList(mates);
      setPageInfoData(pageInfo);
    } catch (err) {
      isApiError(err);
    }
  }, []);

  useEffect(() => {
    getMateList();
  }, [getMateList]);

  return (
    <ExhbMateContainer>
      <Header>
        <Text>
          <span>{pageInfoData.size}</span> 개의 리뷰를 확인해보세요!
        </Text>
        <Button variant="primary" size="small">
          메이트 모집하기
        </Button>
      </Header>

      {mateList.length === 0
        ? "아직 작성한 글이 없어요!"
        : mateList.map((mate) => <MateCard key={mate.mateId} mates={mate} />)}
      {pageInfoData.totalPage > 0 && (
        <Pagination
          pages={pages}
          setPages={setPages}
          totalPage={pageInfoData.totalPage}
        />
      )}
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
