import apiInstance from "../utils/apiInstance";

const bookmarkApis = {
  toggle: async (exhibitionId: number) => {
    const response = await apiInstance.put(
      `api/exhibitions/bookmarks/${exhibitionId}`
    );
    return response;
  },
};

export default bookmarkApis;
