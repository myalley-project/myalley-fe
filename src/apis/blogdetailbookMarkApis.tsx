import apiInstance from "../utils/apiInstance";

const blogDetailbookmarkApis = {
  putbookmark: async (blogId: number) => {
    const response = await apiInstance.put(`/api/blogs/bookmarks/${blogId}`);
    return response;
  },
};

export default blogDetailbookmarkApis;
