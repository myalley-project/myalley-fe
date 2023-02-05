import React from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { exhbApi } from "../../../apis/exhibition";
import MainCard from "../../exhibition/MainCard";
import Button from "../../atom/Button";
import blogReviewApis from "../../../apis/blogReviewApis";

interface BlogReviewDetailContainerProps {
  id: number;
  memberInfo: {
    memberId: number;
    nickname: string;
    memberImage: string;
  };
  blogReviewId: number;
}

const BlogReviewDetailContainer = ({
  id,
  memberInfo,
  blogReviewId,
}: BlogReviewDetailContainerProps) => {
  const navigate = useNavigate();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["blogCard"],
    queryFn: () => exhbApi(id),
  });
  const memeberId = localStorage.getItem("memberId") ?? "";

  const deleteReviewMutation = useMutation({
    mutationFn: () => blogReviewApis.deleteReview(blogReviewId),
  });

  const handleDeleteReview = () => {
    deleteReviewMutation.mutate();
    navigate("/");
  };

  if (isLoading) return <div>...loading</div>;

  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <Container>
      <ButtonGroup>
        <div>
          <Button variant="text" size="small">
            목록
          </Button>
          <Button variant="text" size="small">
            이전글
          </Button>
          <Button variant="text" size="small">
            다음글
          </Button>
        </div>
        <div>
          {String(memberInfo.memberId) === memeberId && (
            <>
              <Button
                onClick={() =>
                  navigate("/blogreview-edit", { state: blogReviewId })
                }
                variant="text"
                size="small"
              >
                수정
              </Button>
              <Button onClick={handleDeleteReview} variant="text" size="small">
                삭제
              </Button>
            </>
          )}
        </div>
      </ButtonGroup>
      {data ? (
        <MainCard
          id={data?.data.id}
          posterUrl={data?.data.posterUrl}
          title={data?.data.title}
          duration={data?.data.duration}
          place={data?.data.space}
          charge={data?.data.adultPrice}
          webLink={data?.data.webLink}
          bookmarked={data?.data.bookmarked as boolean}
        />
      ) : null}
    </Container>
  );
};
export default BlogReviewDetailContainer;

const Container = styled.div`
  position: relative;
  width: 1240px;
  margin-inline: auto;
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