import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { theme } from "../styles/theme";
import Button from "../components/atom/Button";
import Selectbox from "../components/atom/Selectbox";
import SearchInput from "../components/atom/SearchInput";
import ReviewCardList from "../components/blogReviewList/ReviewCardList";
import Pagination from "../components/Pagination";
import { alertPreparing } from "../utils/alerts";
import { BlogReviewResponse } from "../types/blogReview";
import blogReviewApis from "../apis/blogReviewApis";

const BlogReviewList = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });
  const [orderType, setOrderType] = useState<"Recent" | "ViewCount">("Recent");
  const [inputLength, setInputLength] = useState(0);

  const handleOrderType = (
    event: React.MouseEvent<HTMLElement>,
    name = "정렬 필터"
  ) => {
    if (event.currentTarget.textContent === "최신 순") {
      setOrderType("Recent");
    } else {
      setOrderType("ViewCount");
    }
  };

  const handleInputLength = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLength(event.target.value.length);
  };

  const { isLoading, isError, error, data } = useQuery<
    BlogReviewResponse,
    Error
  >({
    queryKey: ["blogReviews", { page: pages.selected, orderType }],
    queryFn: () => blogReviewApis.readBlogReviews(pages.selected, orderType),
  });
  const totalPageNumber = data?.pageInfo.totalPage ?? 0;

  if (isLoading) return <div>...loading</div>;

  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <Container>
      <Title>전시 리뷰</Title>
      <Divider />
      <SelectContainer>
        <Flex>
          <Selectbox
            placeholder="최신 순"
            options={["최신 순", "인기 순"]}
            width="130px"
            name="정렬 필터"
            onClick={handleOrderType}
          />
        </Flex>
        <Flex style={{ gap: "10px" }}>
          <SearchInput
            placeholder="검색"
            onClick={() => {}}
            onKeyDown={(e) => {
              if (e.key === "Enter") alertPreparing();
            }}
          />
          <Button
            onClick={() => navigate("/blogreview-write")}
            style={{ padding: "8px 20px" }}
            size="large"
            variant="primary"
          >
            리뷰 등록
          </Button>
        </Flex>
      </SelectContainer>
      {data && (
        <ReviewCardList blogInfo={data.blogInfo} pageInfo={data.pageInfo} />
      )}
      <Pagination
        pages={pages}
        setPages={setPages}
        totalPage={totalPageNumber}
      />
    </Container>
  );
};

export default BlogReviewList;

const Container = styled.div`
  max-width: 1200px;
  margin-inline: auto;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 28px;
  color: ${theme.colors.greys90};
  text-align: center;
  margin: 40px 0 50px;
`;

const Divider = styled.div`
  border-radius: 0px;
  border-bottom: 1px solid ${theme.colors.greys40};
  margin-bottom: 14px;
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  margin-bottom: 30px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
