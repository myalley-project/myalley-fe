import { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";
import { OnelineReviewCardType } from "../types/oneLineReview";

interface CreateReviewBody {
  exhibitionId: number;
  viewDate: string;
  time: string;
  congestion: string;
  rate: number;
  content: string;
}

interface PatchOnelineReviewBody {
  viewDate: string;
  time: string;
  congestion: string;
  rate: number;
  content: string;
}

const oneLineReviewApis = {
  createReview: async (body: CreateReviewBody) => {
    const response: AxiosResponse = await apiInstance.post(
      `/api/simple-reviews`,
      body
    );
    return response;
  },
  getReviews: async (exhibitionId = 0, pageNo = 0, Type = "Recent") => {
    const response: AxiosResponse<OnelineReviewCardType> =
      await apiInstance.get(
        `simple-reviews/exhibitions/${exhibitionId}?page=${pageNo}&order=${Type}`
      );
    return response.data;
  },
  updateReview: async (simpleId: number, body: PatchOnelineReviewBody) => {
    const response = await apiInstance.put(
      `/api/simple-reviews/${simpleId}`,
      body
    );
    return response;
  },
  deleteReview: async (simpleId: number) => {
    const response = await apiInstance.delete(
      `/api/simple-reviews/${simpleId}`
    );
    return response;
  },
};

export default oneLineReviewApis;
