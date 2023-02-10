import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import blogReviewApis from "../apis/blogReviewApis";
import BlogReviewDetailPresentation from "../components/blogreview/presentation/BlogReviewDetailPresentation";
import BlogReviewDetailContainer from "../components/blogreview/container/BlogReviewDetailContainer";

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
  const isMemberId = !!localStorage.getItem("memberId");

  if (isLoading) return <div>...loading</div>;

  if (isError) return <div>에러가 발생했습니다</div>;

  return (
    <Container>
      {data && (
        <BlogReviewDetailContainer
          id={data?.exhibitionInfo.id}
          memberInfo={memberInfo}
          blogReviewId={data?.id}
          exhibitionInfo={data?.exhibitionInfo}
        />
      )}
      <Divider />
      <div>
        {data && (
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
        )}
      </div>
    </Container>
  );
};

export default BlogReviewDetail;

const Container = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 50px auto;
`;

const Divider = styled.div`
  margin-bottom: 2rem;
`;
