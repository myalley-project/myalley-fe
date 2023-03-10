import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import styled from "styled-components";
import oneLineReviewApis from "../../../apis/oneLineReviewApis";
import { OnelineReviewReadType } from "../../../types/oneLineReview";
import NoList from "../../NoList";
import Pagination from "../../Pagination";
import ReviewSearchBar from "../../reviewCommon/ReviewSearchBar";
import OnelineCard from "../presentation/OnelineCard";

type OrderType = "Recent" | "ViewCount" | "StarScore";

interface OneLineReadProps {
  id: string;
  orderType: OrderType;
  filter: "oneline" | "blog";
  setFilter: Dispatch<SetStateAction<"oneline" | "blog">>;
  setOrderType: Dispatch<SetStateAction<"Recent" | "StarScore" | "ViewCount">>;
  handleReviewModal: () => void;
}

const OneLineReadContainer = ({
  id,
  orderType,
  filter,
  setFilter,
  setOrderType,
  handleReviewModal,
}: OneLineReadProps) => {
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });

  useEffect(() => {
    if (orderType === "ViewCount") {
      setOrderType("Recent");
    }
  });

  const { isError, error, data }: UseQueryResult<OnelineReviewReadType, Error> =
    useQuery({
      queryKey: ["simpleReviews", { page: pages, orderType }],
      queryFn: () =>
        oneLineReviewApis.getReviews(Number(id), pages.selected, orderType),
    });

  if (isError) return <div>에러가 발생했습니다. {error.message}</div>;

  return (
    <>
      <ReviewSearchBar
        totalElement={data ? data?.pageInfo.totalElement : 0}
        filter={filter}
        setFilter={setFilter}
        orderType={orderType}
        setOrderType={setOrderType}
        handleReviewModal={handleReviewModal}
      />
      <OnelineDisplay>
        {(data?.pageInfo.totalElement as number) > 0 ? (
          data?.simpleInfo.map((each) => (
            <OnelineCard
              key={each.id}
              id={each.id}
              viewDate={each.viewDate}
              time={each.time}
              congestion={each.congestion}
              memberInfo={each.memberInfo}
              rate={each.rate}
              content={each.content}
            />
          ))
        ) : (
          <NoList notice="아직 작성된 블로그 리뷰가 없습니다." />
        )}
      </OnelineDisplay>
      {data?.pageInfo ? (
        <Pagination
          pages={pages}
          setPages={setPages}
          totalPage={data.pageInfo.totalPage}
        />
      ) : null}
    </>
  );
};

export default OneLineReadContainer;

const OnelineDisplay = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1rem;
`;
