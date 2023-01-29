import { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";
import apiMultipartInstance from "../utils/apimultipartInstance";
import { BlogReviewPost } from "../types/blogReview";

type ImageInfo = {
  id: string;
  url: string;
};

type BlogReviewInfo = {
  id: number;
  title: string;
  writer: string;
  viewDate: string;
  viewCount: number;
  imageInfo: ImageInfo[];
};

type PageInfo = {
  page: number;
  size: number;
  totalElement: number;
  totalPage: number;
};

interface BlogReviewResponse {
  blogInfo: BlogReviewInfo[];
  pageInfo: PageInfo;
}

const blogReviewApis = {
  createReview: async (body: BlogReviewPost) => {
    const response = await apiMultipartInstance.post(`api/blogs`, body);
    return response;
  },
  readReviews: async (exhibitionId = 0, pageNo = 0, orderType = "Recent") => {
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
