import { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";
import {
  OnelineReviewReadType,
  OnelineReviewCardType,
} from "../types/OnelineReview";

interface CreateReviewBody {
  exhibitionId: number;
  date: string;
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
    const response = await apiInstance.post(`/api/simple-reviews`, body);
    return response;
  },
  getReviews: async (exhibitionId = "", pageNo = 1, Type = "Recent") => {
    const response = await apiInstance.get(
      `simple-reviews/exhibitions/${exhibitionId}?page=${pageNo}&order=${Type}`
    );
    return response;
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
