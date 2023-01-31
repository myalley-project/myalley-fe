import axios, { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";
import apiMultipartInstance from "../utils/apimultipartInstance";
import {
  BlogReviewPost,
  BlogReviewResponse,
  BlogReviewDetailResponse,
  BlogReviewPatch,
} from "../types/blogReview";

const blogReviewApis = {
  // createReview: async (body: BlogReviewPost) => {
  createReview: async (body: FormData) => {
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
  readDetailBlogReview: async (blogId: string) => {
    const response: AxiosResponse<BlogReviewDetailResponse> =
      await apiInstance.get(`/blogs/${blogId}`, {
        headers: {
          memberId: localStorage.getItem("memberId"),
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
  updateReviewText: async (blogId: string, body: BlogReviewPatch) => {
    const response = await apiInstance.patch(`/api/blogs/${blogId}`, body);
    return response;
  },
  updateReviewImage: async (blogId: string, images: FormData) => {
    const response = await apiMultipartInstance.post(
      `/api/blogs/images/${blogId}`,
      images
    );
    return response;
  },
  updateReviewImageDelete: async () => {},
  deleteImage: async (blogId: string, imageId: string) => {
    const response = await apiInstance.delete(
      `api/blogs/images/${blogId}/${imageId}`
    );
    return response;
  },
  deleteReview: async (blogId: number) => {
    const response = await apiInstance.patch(`/api/blogs/${blogId}`);
    return response;
  },
};

export default blogReviewApis;
