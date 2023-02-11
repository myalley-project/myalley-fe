import React, { useEffect, useReducer } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import OnelineWrite from "../presentation/OnelineWrite";
import { OnelineReviewPostType } from "../../../types/oneLineReview";
import oneLineReviewApis from "../../../apis/oneLineReviewApis";
import isApiError from "../../../utils/isApiError";
import useRefreshTokenApi from "../../../apis/useRefreshToken";
import OnelineModify from "../presentation/OnelineModify";
import { ModifyPlaceholder } from "../../../types/modifyPlaceholder";

const initialState: OnelineReviewPostType = {
  exhibitionId: 0,
  date: {
    year: "",
    month: "",
    day: "",
  },
  time: "",
  congestion: "",
  rate: 0,
  content: "",
};

const ReducerActionType = {
  YEAR: "YEAR",
  MONTH: "MONTH",
  DAY: "DAY",
  TIME: "TIME",
  CONGESTION: "CONGESTION",
  RATE: "RATE",
  CONTENT: "CONTENT",
};

type ReducerAction = {
  type: string;
  payload?: string;
  payloadToNumber?: number;
};

const reducer = (
  state: typeof initialState,
  action: ReducerAction
): typeof initialState => {
  switch (action.type) {
    case ReducerActionType.YEAR:
      return {
        ...state,
        date: { ...state.date, year: action.payload ?? "" },
      };
    case ReducerActionType.MONTH:
      return {
        ...state,
        date: { ...state.date, month: action.payload ?? "" },
      };
    case ReducerActionType.DAY:
      return {
        ...state,
        date: { ...state.date, day: action.payload ?? "" },
      };
    case ReducerActionType.TIME:
      return {
        ...state,
        time: action.payload ?? "",
      };
    case ReducerActionType.CONGESTION:
      return {
        ...state,
        congestion: action.payload ?? "",
      };
    case ReducerActionType.RATE:
      return {
        ...state,
        rate: action.payloadToNumber ?? 0,
      };
    case ReducerActionType.CONTENT:
      return {
        ...state,
        content: action.payload ?? "",
      };
    default:
      return state;
  }
};

type Payload = {
  exhibitionId: number;
  viewDate: string;
  time: string;
  congestion: string;
  rate: number;
  content: string;
};

interface OnelineModifyProps {
  handleModal: () => void;
  simpleId: number;
  modifyInfo: ModifyPlaceholder;
}

const OnelineModifyContainer = ({
  simpleId,
  handleModal,
  modifyInfo,
}: OnelineModifyProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { id } = useParams();
  const refreshTokenApi = useRefreshTokenApi();
  const queryClient = useQueryClient();

  const yearHandler = (e: React.MouseEvent) => {
    if (e !== undefined) {
      if (e.currentTarget.textContent !== null) {
        dispatch({
          type: ReducerActionType.YEAR,
          payload: e.currentTarget.textContent,
        });
      }
    }
  };

  const monthHandler = (e: React.MouseEvent) => {
    if (e !== undefined) {
      if (e.currentTarget.textContent !== null) {
        dispatch({
          type: ReducerActionType.MONTH,
          payload: e.currentTarget.textContent,
        });
      }
    }
  };

  const dayHandler = (e: React.MouseEvent) => {
    if (e !== undefined) {
      if (e.currentTarget.textContent !== null) {
        dispatch({
          type: ReducerActionType.DAY,
          payload: e.currentTarget.textContent,
        });
      }
    }
  };

  const timeHandler = (e: React.MouseEvent) => {
    if (e !== undefined) {
      if (e.currentTarget.textContent !== null) {
        dispatch({
          type: ReducerActionType.TIME,
          payload: e.currentTarget.textContent,
        });
      }
    }
  };

  const congestionHandler = (e: React.MouseEvent) => {
    if (e !== undefined) {
      if (e.currentTarget.textContent !== null) {
        dispatch({
          type: ReducerActionType.CONGESTION,
          payload: e.currentTarget.textContent,
        });
      }
    }
  };

  const rateHandler = (e: React.MouseEvent) => {
    if (e !== undefined) {
      if (e.currentTarget.textContent !== null) {
        const { textContent } = e.currentTarget;
        const textToNumber = parseInt(textContent, 10);
        dispatch({
          type: ReducerActionType.RATE,
          payloadToNumber: textToNumber,
        });
      }
    }
  };

  const contentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e !== undefined) {
      if (e.target.value !== null) {
        dispatch({
          type: ReducerActionType.CONTENT,
          payload: e.target.value,
        });
      }
    }
  };

  const modifyMutation = useMutation({
    mutationFn: ({
      reviewId,
      payload,
    }: {
      reviewId: number;
      payload: {
        viewDate: string;
        time: string;
        congestion: string;
        rate: number;
        content: string;
      };
    }) => oneLineReviewApis.updateReview(reviewId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["simpleReviews"]);
      handleModal();
    },
  });

  const SubmitHandler = () => {
    const body = getPayload(id as string, state);

    if (Object.values(body).includes("") || Object.values(body).includes(0)) {
      return alert("빈 칸으로 남겨진 값이 있습니다.");
    }
    if (body.content.length < 10) return alert("본문 내용이 너무 짧습니다");
    if (body.content.length >= 60) return alert("본문 내용이 너무 깁니다");

    const reviewId = simpleId;
    const payload = {
      viewDate: body.viewDate,
      time: body.time,
      congestion: body.congestion,
      rate: body.rate,
      content: body.content,
    };
    try {
      modifyMutation.mutate({ reviewId, payload });
      handleModal();
    } catch (err) {
      const errResponese = isApiError(err);
      if (errResponese === "accessToken 만료") refreshTokenApi();
      modifyMutation.mutate({ reviewId, payload });
    }
    return null;
  };

  return (
    <OnelineModify
      state={state}
      modifyPlaceholder={modifyInfo}
      handleModal={handleModal}
      yearHandler={yearHandler}
      monthHandler={monthHandler}
      dayHandler={dayHandler}
      timeHandler={timeHandler}
      congestionHandler={congestionHandler}
      rateHandler={rateHandler}
      contentHandler={contentHandler}
      submitHandler={SubmitHandler}
    />
  );
};

export default OnelineModifyContainer;

function getPayload(
  exhibitionId: string,
  state: OnelineReviewPostType
): Payload {
  const BIRTHDAY = `${state.date.year}-${state.date.month}-${state.date.day}`;
  const ID = Number(exhibitionId);

  return {
    exhibitionId: ID,
    viewDate: BIRTHDAY,
    time: state.time,
    congestion: state.congestion,
    rate: state.rate,
    content: state.content,
  };
}
