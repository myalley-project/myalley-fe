import React from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { exhbApi } from "../../../apis/exhibition";
import MainCard from "../../exhibition/MainCard";
import Button from "../../atom/Button";
import blogReviewApis from "../../../apis/blogReviewApis";
import { theme } from "../../../styles/theme";

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
    alert("삭제되었습니다.");
    navigate("/blogreview-list");
  };

  if (isLoading) return <div>...loading</div>;

  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <Container>
      <ButtonGroup>
        <div>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              navigate("/blogreview-list");
            }}
          >
            목록
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              alert("준비 중인 기능입니다.");
            }}
          >
            이전글
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              alert("준비 중인 기능입니다.");
            }}
          >
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
              <Button
                onClick={handleDeleteReview}
                variant="text"
                size="small"
                className="deleteBtn"
              >
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
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  button {
    margin-right: 10px;
    border: 1px solid ${theme.colors.greys40};
    &.deleteBtn {
      margin-right: 0;
    }
  }
  & > div {
    gap: 10px;
  }
`;
