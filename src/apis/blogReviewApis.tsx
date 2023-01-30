import { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";
import apiMultipartInstance from "../utils/apimultipartInstance";
import {
  BlogReviewPost,
  BlogReviewResponse,
  BlogReviewDetailResponse,
} from "../types/blogReview";

const blogReviewApis = {
  createReview: async (body: BlogReviewPost) => {
    const response = await apiMultipartInstance.post(`api/blogs`, body);
    return response;
  },
  readBlogReviews: async (
    pageNo: number,
    orderType: "Recent" | "ViewCount"
  ) => {
    const response: AxiosResponse<BlogReviewResponse> = await apiInstance.get(
      `/blogs?page=${pageNo}&order=${orderType}`
    );
    return response.data;
  },
  // readDetailBlogReview: async (blogId: number) => {
  //   const response: AxiosResponse<BlogReviewDetailResponse> =
  //     await apiInstance.get(`/blogs/${blogId}`, {
  //       headers: {
  //         memberId: localStorage.getItem("memberId"),
  //       },
  //     });
  //   return response;
  // },
  readExhibitionReviews: async (
    exhibitionId = 0,
    pageNo = 0,
    orderType = "Recent"
  ) => {
    const response: AxiosResponse<BlogReviewResponse> = await apiInstance.get(
      `/blogs/exhibitions/${exhibitionId}?page=${pageNo}&order=${orderType}`
    );
    return response.data;
  },
  updateReviewText: async (blogId: number, body: BlogReviewPost) => {
    const response = await apiInstance.patch(`/api/blogs/${blogId}`, body);
    return response;
  },
  updateReviewImage: async () => {},
  updateReviewImageDelete: async () => {},
  deleteReview: async (blogId: number) => {
    const response = await apiInstance.patch(`/api/blogs/${blogId}`);
    return response;
  },
};

export default blogReviewApis;
