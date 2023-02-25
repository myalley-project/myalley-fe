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
  putlike: async (blogId: number) => {
    const response = await apiInstance.put(`/api/blogs/likes/${blogId}`);
    return response;
  },
};

export default bloglikeApis;
