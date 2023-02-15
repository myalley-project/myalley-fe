import apiInstance from "../utils/apiInstance";

const blogDetailbookmarkApis = {
  addbookmark: async (blogId: number) => {
    const response = await apiInstance.post(
      `api/blog-bookmarks/blogs/${blogId}`
    );
    return response;
  },
  deletebookmark: async (blogId: number) => {
    const response = await apiInstance.delete(
      `api/blog-bookmarks/blogs/${blogId}`
    );
    return response;
  },
};

export default blogDetailbookmarkApis;
