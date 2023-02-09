import axios, { AxiosInstance } from "axios";
import apiInstance from "../utils/apiInstance";

const bloglikeApis = {
  like: async (blogId: number) => {
    const response = await apiInstance.post(`api/likes/blogs/${blogId}`);
    return response;
  },
  dislike: async (blogId: number) => {
    const response = await apiInstance.delete(`api/likes/blogs/${blogId}`);
    return response;
  },
};

export default bloglikeApis;
