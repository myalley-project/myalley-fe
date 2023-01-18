import axios, { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";

const exhbBookmarkApi = async (id: number) => {
  const res: AxiosResponse =
    //         await apiInstance.put(
    //     `/api/exhibitions/bookmarks/${id}`
    //   );
    await axios.get("/data/exhbBookmark.json"); // 테스트용 목데이터

  return res;
};

export default exhbBookmarkApi;
