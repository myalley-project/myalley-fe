import React, { useState, Dispatch, SetStateAction } from "react";
import { useQuery, UseQueryResult } from "react-query";
import styled from "styled-components";
import { OnelineReviewReadType } from "../../../types/oneLineReview";
import ReviewSearchBar from "../../reviewCommon/ReviewSearchBar";
import Pagination from "../../Pagination";
import BlogReviewCard from "../presentation/BlogReviewCard";
import blogReviewApis from "../../../apis/blogReviewApis";
import { BlogReviewResponse } from "../../../types/blogReview";

type OrderType = "Recent" | "ViewCount";

interface BlogReadProps {
  id: string;
  orderType: OrderType;
  filter: "oneline" | "blog";
  setFilter: Dispatch<SetStateAction<"oneline" | "blog">>;
  setOrderType: Dispatch<SetStateAction<"Recent" | "ViewCount">>;
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
    started: 0,
    selected: 0,
  });

  const { isLoading, isError, error, data } = useQuery<
    BlogReviewResponse,
    Error
  >({
    queryKey: ["blogReviews"],
    queryFn: () =>
      blogReviewApis.readExhibitionReviews(
        Number(id),
        pages.selected,
        orderType
      ),
  });

  if (isLoading) return <div>...loading</div>;

  if (isError) return <div>에러가 발생했습니다. {error.message}</div>;

  return (
    <>
      <ReviewSearchBar
        totalElement={data ? data?.pageInfo.totalElement : 0}
        filter={filter}
        setFilter={setFilter}
        setOrderType={setOrderType}
        handleReviewModal={handleReviewModal}
      />
      <Container>
        <CardWrapper>
          {data?.blogInfo.map((each) => (
            <BlogReviewCard
              key={each.id}
              id={each.id}
              title={each.title}
              writer={each.writer}
              viewDate={each.viewDate}
              viewCount={each.viewCount}
              imageInfo={each.imageInfo}
            />
          ))}
        </CardWrapper>
        {data?.pageInfo ? (
          <Pagination
            pages={pages}
            setPages={setPages}
            totalPage={data.pageInfo.totalElement}
          />
        ) : null}
      </Container>
    </>
  );
};

export default BlogReviewReadContainer;

const Container = styled.div`
  width: 62.5vw;
  margin-inline: auto;
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 380px);
  grid-template-rows: auto;
  gap: 30px;
  margin-bottom: 120px;
`;
