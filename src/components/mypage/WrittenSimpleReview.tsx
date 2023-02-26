import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { isEditable } from "@testing-library/user-event/dist/utils";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import Pagination from "../Pagination";
import MypageOnelineCard from "../onelineReview/presentation/MypageOnelineCard";
import { MySimpleReviewRes, mySimpleReviewsApi } from "../../apis/member";
import useGetNewTokenApi from "../../apis/getRefreshToken";
import isApiError from "../../utils/isApiError";
import NoList from "../NoList";

const WrittenSimpleReview = () => {
  const getNewTokenApi = useGetNewTokenApi;
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });
  // 한줄 리뷰 목록 조회 컴포넌트 붙여야함
  // 페이지네이션과 연결하는 로직 짜야함

  // 내가 쓴 한줄 리뷰 목록 조회
  const getSimpleReview = async (pageNo: number) => {
    const res: AxiosResponse<MySimpleReviewRes> = await mySimpleReviewsApi(
      pageNo
    );
    return res.data;
  };

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["mypageonelineReview", { pages }],
    queryFn: () => getSimpleReview(pages.selected),
  });

  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <>
      <OnelineDisplay>
        {data?.simpleInfo.length === 0 ? (
          <NoList notice="아직 작성한 한줄 리뷰가 없습니다" />
        ) : (
          data?.simpleInfo.map((each) => (
            <MypageOnelineCard
              key={each.id}
              id={each.id}
              viewDate={each.viewDate}
              time={each.time}
              congestion={each.congestion}
              rate={each.rate}
              content={each.content}
              exhibitionInfo={each.exhibitionInfo}
            />
          ))
        )}
      </OnelineDisplay>
      <Pagination
        pages={pages}
        setPages={setPages}
        totalPage={data?.pageInfo.totalPage as number}
      />
    </>
  );
};

export default WrittenSimpleReview;

const OnelineDisplay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
