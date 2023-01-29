import { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";
import {
  OnelineReviewReadType,
  OnelineReviewCardType,
} from "../types/OnelineReview";

interface CreateReviewBody {
  exhibitionId: number;
  viewDate: string;
  time: string;
  congestion: string;
  rate: number;
  content: string;
}

interface PatchOnelineReviewBody {
  exhibitionId: number;
  writer: string;
  date: string;
  time: string;
  congestion: string;
  rate: number;
  content: string;
}

const onelineReviewApis = {
  createReview: async (body: CreateReviewBody) => {
    const response: AxiosResponse = await apiInstance.post(
      `/api/simple-reviews`,
      body
    );
    return response;
  },
  getReviews: async (exhibitionId = "", pageNo = 1, Type = "Recent") => {
    const response: AxiosResponse<OnelineReviewCardType> =
      await apiInstance.get(
        `simple-reviews/exhibitions/${exhibitionId}?page=${pageNo}&order=${Type}`
      );
    return response.data;
  },
  updateReview: async (simpleId: string, body: PatchOnelineReviewBody) => {
    const response = await apiInstance.patch(
      `/api/simple-reviews/${simpleId}`,
      body
    );
    return response;
  },
  deleteReview: async (simpleId: number) => {
    const response = await apiInstance.patch(`/api/simple-reviews/${simpleId}`);
    return response;
  },
};

export default onelineReviewApis;
