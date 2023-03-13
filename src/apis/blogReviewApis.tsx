import axios, { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";
// import apiMultipartInstance from "../utils/apimultipartInstance";
import {
  BlogReviewPost,
  BlogReviewResponse,
  BlogReviewDetailResponse,
  BlogReviewPatch,
} from "../types/blogReview";

const blogReviewApis = {
  createReview: async (body: FormData) => {
    const response = await apiInstance.post(`api/blogs`, body);
    return response;
  },
  readBlogReviews: async (
    pageNo = 1,
    orderType: "Recent" | "ViewCount" = "Recent"
  ) => {
    const response: AxiosResponse<BlogReviewResponse> = await apiInstance.get(
      `/blogs?page=${pageNo}&order=${orderType}`
    );
    return response.data;
  },
  readDetailBlogReview: async (blogId: number) => {
    const response: AxiosResponse<BlogReviewDetailResponse> =
      await apiInstance.get(`/blogs/${blogId}`, {
        headers: {
          memberId: localStorage.getItem("memberId") ?? 0,
        },
      });
    return response.data;
  },
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
  updateReviewText: async (blogId: number, body: BlogReviewPatch) => {
    const response = await apiInstance.put(`/api/blogs/${blogId}`, body);
    return response;
  },
  updateReviewImage: async (blogId: number, images: FormData) => {
    const response = await apiInstance.post(
      `/api/blogs/images/${blogId}`,
      images
    );
    return response;
  },
  updateReviewImageDelete: async () => {},
  deleteImage: async (blogId: number, imageId: string) => {
    const response = await apiInstance.delete(
      `api/blogs/images/${blogId}/${imageId}`
    );
    return response;
  },
  deleteReview: async (blogId: number) => {
    const response = await apiInstance.delete(`/api/blogs/${blogId}`);
    return response;
  },
};

export default blogReviewApis;
