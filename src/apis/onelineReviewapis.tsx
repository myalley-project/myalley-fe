import apiInstance from "../utils/apiInstance";

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
  createReview: (body: CreateReviewBody) =>
    apiInstance.post(`/api/simple-reviews`, body),
  getReviews: async (exhibitionId = "", pageNo = 1, Type = "Recent") => {
    const response = await apiInstance.get(
      `simple-reviews/exhibitions/${exhibitionId}?page=${pageNo}&order=${Type}`
    );
    return response;
  },
  updateReview: (simpleId: string, body: PatchOnelineReviewBody) =>
    apiInstance.patch(`/api/simple-reviews/${simpleId}`, body),
  deleteReview: (simpleId: string) =>
    apiInstance.patch(`/api/simple-reviews/${simpleId}`),
};

export default onelineReviewApis;
