import apiInstance from "../utils/apiInstance";

interface CreateReviewBody {
  exhibitionId: number;
  date: string;
  time: string;
  congestion: string;
  rate: number;
  content: string;
}

interface GetOnelineReviewType {
  exhibitionId: string;
  pageNo: string;
  orderType: string;
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
  getReviews: ({ exhibitionId, pageNo, orderType }: GetOnelineReviewType) =>
    apiInstance.get(
      `/blogs/exhibitions/${exhibitionId}?page=${pageNo}&order=${orderType}`
    ),
  updateReview: (simpleId: string, body: PatchOnelineReviewBody) =>
    apiInstance.patch(`/api/simple-reviews/${simpleId}`, body),
  deleteReview: (simpleId: string) =>
    apiInstance.patch(`/api/simple-reviews/${simpleId}`),
};

export default onelineReviewApis;
