import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useQuery, UseQueryResult } from "react-query";
import styled from "styled-components";
import { OnelineReviewReadType } from "../../../types/oneLineReview";
import ReviewSearchBar from "../../reviewCommon/ReviewSearchBar";
import Pagination from "../../Pagination";
import BlogReviewCard from "../../blogReviewList/ReviewCard";
import blogReviewApis from "../../../apis/blogReviewApis";
import { BlogReviewResponse } from "../../../types/blogReview";
import NoList from "../../NoList";

type OrderType = "Recent" | "ViewCount" | "StarScore";

interface BlogReadProps {
  id: string;
  orderType: OrderType;
  filter: "oneline" | "blog";
  setFilter: Dispatch<SetStateAction<"oneline" | "blog">>;
  setOrderType: Dispatch<SetStateAction<"Recent" | "StarScore" | "ViewCount">>;
  handleReviewModal: () => void;
}

const BlogReviewReadContainer = ({
  id,
  orderType,
  filter,
  setFilter,
  setOrderType,
  handleReviewModal,
}: BlogReadProps) => {
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });

  useEffect(() => {
    if (orderType === "StarScore") {
      setOrderType("Recent");
    }
  });

  const { isLoading, isError, error, data } = useQuery<
    BlogReviewResponse,
    Error
  >({
    queryKey: ["blogReviews", { pages, orderType }],
    queryFn: () =>
      blogReviewApis.readExhibitionReviews(
        Number(id),
        pages.selected,
        orderType
      ),
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
      <Container>
        <CardWrapper>
          {(data?.pageInfo.totalElement as number) > 0 ? (
            data?.blogInfo.map((each) => (
              <BlogReviewCard
                key={each.id}
                id={each.id}
                title={each.title}
                writer={each.writer}
                viewDate={each.viewDate}
                viewCount={each.viewCount}
                imageInfo={each.imageInfo}
              />
            ))
          ) : (
            <FlexCenter>
              <NoList notice="아직 작성된 블로그 리뷰가 없습니다." />
            </FlexCenter>
          )}
        </CardWrapper>
        <MarginAuto>
          {data && (
            <Pagination
              pages={pages}
              setPages={setPages}
              totalPage={data.pageInfo.totalPage}
            />
          )}
        </MarginAuto>
      </Container>
    </>
  );
};

export default BlogReviewReadContainer;

const Container = styled.div`
  width: 62.5vw;
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 380px);
  grid-template-rows: auto;
  gap: 30px;
  text-align: left;
  margin-bottom: 30px;
`;

const FlexCenter = styled.div`
  grid-column: 2;
`;

const MarginAuto = styled.div`
  width: 1200px;
  margin: 0 auto;
`;
