import axios, { AxiosInstance } from "axios";
import apiInstance from "../utils/apiInstance";

const bloglikeApis = {
  putlike: async (blogId: number) => {
    const response = await apiInstance.put(`/api/blogs/likes/${blogId}`);
    return response;
  },
};

export default bloglikeApis;
