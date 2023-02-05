import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import blogReviewApis from "../apis/blogReviewApis";
import BlogReviewDetailPresentation from "../components/blogreview/presentation/BlogReviewDetailPresentation";
import BlogReviewDetailContainer from "../components/blogreview/container/BlogReviewDetailContainer";
import Button from "../components/atom/Button";

interface LocationState {
  state: number;
}

const BlogReviewDetail = () => {
  const location: LocationState = useLocation();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["blogReviewDetail"],
    queryFn: () => blogReviewApis.readDetailBlogReview(location?.state),
  });
  const memberInfo = data?.memberInfo ?? {
    memberId: 0,
    memberImage: "",
    nickname: "",
  };

  if (isLoading) return <div>...loading</div>;

  if (isError) return <div>에러가 발생했습니다</div>;

  return (
    <Container>
      <BlogReviewDetailContainer
        id={data?.exhibitionInfo.id as number}
        memberInfo={memberInfo}
        blogReviewId={data?.id as number}
      />
      <div>
        {data ? (
          <BlogReviewDetailPresentation
            id={data.id}
            title={data.title}
            content={data.content}
            congestion={data.congestion}
            transportation={data.transportation}
            revisit={data.revisit}
            memberInfo={data.memberInfo}
            createdAt={data.createdAt}
            time={data.time}
            viewCount={data.viewCount}
            viewDate={data.viewDate}
            likeCount={data.likeCount}
            bookmarkCount={data.bookmarkCount}
            bookmarkStatus={data.bookmarkStatus}
            likeStatus={data.likeStatus}
            imageInfo={data.imageInfo}
            exhibitionInfo={data.exhibitionInfo}
          />
        ) : null}
      </div>
    </Container>
  );
};

export default BlogReviewDetail;

const Container = styled.div`
  width: 100dvw;
  width: 100vw;
  text-align: center;
  border-radius: 0px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  & > div {
    gap: 10px;
  }
`;
