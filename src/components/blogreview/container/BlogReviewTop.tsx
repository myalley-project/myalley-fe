import React from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { exhbApi } from "../../../apis/exhibition";
import blogReviewApis from "../../../apis/blogReviewApis";
import Button from "../../atom/Button";
import ExhbCard from "../../mate/ExhbCard";

interface BlogReviewTopProps {
  id: number;
  memberInfo: {
    memberId: number;
    nickname: string;
    memberImage: string;
  };
  blogReviewId: number;
  exhibitionInfo: {
    id: number;
    title: string;
    posterUrl: string;
    duration: string;
    space: string;
    type: string;
  };
}

const BlogReviewTop = ({
  id,
  memberInfo,
  exhibitionInfo,
  blogReviewId,
}: BlogReviewTopProps) => {
  const navigate = useNavigate();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["blogCard"],
    queryFn: () => exhbApi(id),
  });
  const exhbData = data?.data;
  const memeberId = localStorage.getItem("memberId") ?? "";

  const deleteReviewMutation = useMutation({
    mutationFn: () => blogReviewApis.deleteReview(blogReviewId),
    onSuccess: () => {
      alert("삭제되었습니다.");
      navigate("/blogreview-list");
    },
  });

  const handleDeleteReview = () => {
    if (window.confirm("정말로 삭제하시겠습니까?"))
      deleteReviewMutation.mutate();
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
            onClick={() => navigate("/blogreview-list")}
          >
            목록
          </Button>
          {/* <Button
            variant="text"
            size="small"
            onClick={() => alert("준비 중인 기능입니다.")}
          >
            이전글
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => alert("준비 중인 기능입니다.")}
          >
            다음글
          </Button> */}
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
      {exhbData && (
        <ExhbCard
          exhbData={{
            exhibitionId: exhbData.id,
            exhibitionTitle: exhbData.title,
            exhibitionSpace: exhbData.space,
            posterUrl: exhbData.posterUrl,
            exhibitionDuration: exhbData.duration,
            type: exhbData.type,
          }}
        />
      )}
    </Container>
  );
};
export default BlogReviewTop;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  button {
    border: 1px solid ${theme.colors.greys40};
  }
  & > div {
    display: flex;
    gap: 10px;
  }
`;
