import React from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import onelineReviewApis from "../../../apis/onelineReviewapis";

type PatchOnelineReviewBody = {
  simpleId: string;
  body: {
    exhibitionId: number;
    writer: string;
    date: string;
    time: string;
    congestion: string;
    rate: number;
    content: string;
  };
};

const OnelineTempQuery = () => {
  // Read function
  // const onelineReaqFunction = onelineReviewApis.getReviews;
  // const { params }=useParams();
  // const [page, setPage] = useState(1);
  // const [orderType, setOrderType ] =useState("");

  // const { error, data, isPreviousData } = useQuery({
  //   queryKey: ["simpleReviews", { page }],
  //   keepPreviousData: true,
  //   queryFn: () => onelineReaqFunction(params, page, orderType)
  // })
  // data.map()

  // update function
  const onelineUpdateFunction = onelineReviewApis.updateReview;
  const patchMutation = useMutation({
    mutationFn: ({ simpleId, body }: PatchOnelineReviewBody) =>
      onelineUpdateFunction(simpleId, body),
  });
  // patchMutation.mutate({ simpleId, body })

  // delete function
  const onelineDeleteFunction = onelineReviewApis.deleteReview;
  const deleteMutation = useMutation({
    mutationFn: (simpleId: string) => onelineDeleteFunction(simpleId),
  });
  // deleteMutation.mutate(simpleId)

  return <div>OnelineTempQuery</div>;
};

export default OnelineTempQuery;
