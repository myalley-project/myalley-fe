import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import ReviewTitle from "../components/blogreview/ReviewTitle";
import ExhibitionSelect from "../components/blogreview/ExhibitionSelect";
import Calender from "../components/Calendar";
import SubTitle from "../components/SubTitle";
import Editor from "../components/Editor";
import Selectbox from "../components/atom/Selectbox";
import { theme } from "../styles/theme";
import getTimeOptions from "../utils/timeSelector";
import Button from "../components/atom/Button";
import blogReviewApis from "../apis/blogReviewApis";
import returnkeys from "../utils/returnkeys";
import xBtn from "../assets/icons/xBtn.svg";
import Modal from "../Modal";
import ExhibitionChoice from "../components/ExhibitionChoice";
import { ImageInfo } from "../types/blogReview";

// 차후 reducer로 일괄 조절예정
// interface BlogReviewPost {a
//   blogInfo: {
//     title: string;
//     viewDate: string;
//     time: {
//       enter: string;
//       exit: string;
//     };
//     transportation: string;
//     revisit: string;
//     congestion: string;
//     content: string;
//     exhibition: number;
//   };
//   images: FormData[] | [];
// }

// const initialState: BlogReviewPost = {
//   blogInfo: {
//     title: "",
//     viewDate: "",
//     time: {
//       enter: "",
//       exit: "",
//     },
//     transportation: "",
//     revisit: "",
//     congestion: "",
//     content: "",
//     exhibition: 0,
//   },
//   images: [],
// };

// const enum ReducerActionType {
//   Title,
//   ViewDate,
//   EnterTime,
//   ExitTime,
//   TransporTation,
//   Revisit,
//   Congestion,
//   Content,
//   Exhibition,
//   Images,
// }

// type ReducerAction = {
//   type: ReducerActionType;
//   payload?: string;
//   fileList?: FormData;
// };

// const reducer = (
//   state: typeof initialState,
//   action: ReducerAction
// ): typeof initialState => {
//   switch (action.type) {
//     case ReducerActionType.Title:
//       return {
//         ...state,
//         blogInfo: { ...state.blogInfo, title: action.payload ?? "" },
//       };
//     case ReducerActionType.ViewDate:
//       return {
//         ...state,
//         blogInfo: { ...state.blogInfo, viewDate: action.payload ?? "" },
//       };
//     case ReducerActionType.EnterTime:
//       return {
//         ...state,
//         blogInfo: {
//           ...state.blogInfo,
//           time: { ...state.blogInfo.time, enter: action.payload ?? "" },
//         },
//       };
//     case ReducerActionType.ExitTime:
//       return {
//         ...state,
//         blogInfo: {
//           ...state.blogInfo,
//           time: { ...state.blogInfo.time, exit: action.payload ?? "" },
//         },
//       };
//     case ReducerActionType.TransporTation:
//       return {
//         ...state,
//         blogInfo: { ...state.blogInfo, transportation: action.payload ?? "" },
//       };
//     case ReducerActionType.Revisit:
//       return {
//         ...state,
//         blogInfo: { ...state.blogInfo, revisit: action.payload ?? "" },
//       };
//     case ReducerActionType.Congestion:
//       return {
//         ...state,
//         blogInfo: { ...state.blogInfo, congestion: action.payload ?? "" },
//       };
//     case ReducerActionType.Content:
//       return {
//         ...state,
//         blogInfo: { ...state.blogInfo, content: action.payload ?? "" },
//       };
//     case ReducerActionType.Exhibition:
//       return {
//         ...state,
//         blogInfo: {
//           ...state.blogInfo,
//           exhibition: Number(action.payload),
//         },
//       };
//     case ReducerActionType.Images:
//       return {
//         ...state,
//         images: [action.fileList as FormData],
//       };
//     default:
//       return state;
//   }
// };

interface LocationState {
  state: number;
}

const BlogReviewUpdate = () => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [enterTime, setEnterTime] = useState("");
  const [exitTime, setExitTime] = useState("");
  const [congestion, setCongestion] = useState("");
  const [transportation, setTransportation] = useState("");
  const [revisit, setRevisit] = useState("");
  const [contents, setContents] = useState("");
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [displayImage, setDisplayImage] = useState<ImageInfo[] | []>([]);
  const [deleteimages, setDeleteImages] = useState<string[] | []>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExhb, setSelectedExhb] = useState({
    url: "",
    id: 0,
    title: "",
    duration: "",
    status: "",
  });
  const location: LocationState = useLocation();
  const [modifyDate, setModifyDate] = useState<Date>(new Date());
  console.log(
    "🚀 ~ file: BlogReviewModify.tsx:178 ~ BlogReviewUpdate ~ modifyDate:",
    modifyDate
  );

  const handleSelectorModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const getExhibitionInfo = (
    imgUrl: string,
    exhibitionId: number,
    exhibitionTitle: string,
    exhibitionDuration: string,
    exhibitionStatus: string
  ) => {
    const newState = {
      url: imgUrl,
      id: exhibitionId,
      title: exhibitionTitle,
      duration: exhibitionDuration,
      status: exhibitionStatus,
    };
    setSelectedExhb(newState);
  };

  const deleteExhibitionInfo = () => {
    setSelectedExhb({
      url: "",
      id: 0,
      title: "",
      duration: "",
      status: "",
    });
  };
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["blogDetail"],
    queryFn: () => blogReviewApis.readDetailBlogReview(location.state),
    onSuccess: (wholeData) => {
      const dateArray = wholeData.exhibitionInfo.duration.split(" ~ ");
      setDisplayImage(wholeData.imageInfo);
      setContents(wholeData.content);
      setTitle(wholeData.title);
      setSelectedExhb({
        id: wholeData.exhibitionInfo.id,
        url: wholeData.exhibitionInfo.posterUrl,
        title: wholeData.exhibitionInfo.title,
        duration: wholeData.exhibitionInfo.duration,
        status:
          new Date(dateArray[0]) < new Date() &&
          new Date() < new Date(dateArray[1])
            ? "현재 전시"
            : "예정 전시",
      });
      setModifyDate(new Date(wholeData.viewDate));
    },
  });

  const keys = returnkeys(data?.imageInfo.length as number);
  const times: string[] = data?.time.split("-") ?? ["00시", "24시"];

  const handleTitleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onCilckEnterTime = (
    event: React.MouseEvent<HTMLLIElement>,
    name = "enterTime"
  ) => {
    const value = event.currentTarget.textContent;
    setEnterTime(value as string);
  };

  const onCilckExitTime = (
    event: React.MouseEvent<HTMLLIElement>,
    name = "exitTime"
  ) => {
    const value = event.currentTarget.textContent;
    setExitTime(value as string);
  };

  const onCilckCongestion = (
    event: React.MouseEvent<HTMLLIElement>,
    name = "congestion"
  ) => {
    const value = event.currentTarget.textContent;
    setCongestion(value as string);
  };

  const onClickTransportation = (
    event: React.MouseEvent<HTMLLIElement>,
    name = "transpostation"
  ) => {
    const value = event.currentTarget.textContent;
    setTransportation(value as string);
  };

  const onClickRevisit = (
    event: React.MouseEvent<HTMLLIElement>,
    name = "revisit"
  ) => {
    const value = event.currentTarget.textContent;
    setRevisit(value as string);
  };

  const HandlerContents = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const HandleSubmit = () => {
    deleteimages.forEach((each) => {
      blogReviewApis.deleteImage(location.state, each);
    });

    const postData = {
      title,
      viewDate: selectedDate,
      time: `${enterTime}-${exitTime}`,
      transportation,
      revisit,
      congestion,
      content: contents,
    };

    const formData = new FormData();
    formData.append(
      "blogInfo",
      new Blob([JSON.stringify(postData)], { type: "application/json" })
    );

    blogReviewApis.updateReviewText(location.state, postData);

    if (imageFiles !== null) {
      const imageFormData = new FormData();
      Array.from(imageFiles).forEach((file) =>
        imageFormData.append("images", file)
      );

      blogReviewApis.updateReviewImage(location.state, imageFormData);
    }
  };

  function deleteExistingImg(imgInfo: ImageInfo) {
    if (data?.imageInfo) {
      for (let index = 0; index < data.imageInfo.length; index += 1) {
        if (data.imageInfo[index].url === imgInfo.url) {
          setDeleteImages([...deleteimages, imgInfo.id]);
        }
      }
      const newImageArray = displayImage.filter(
        (each) => each.id !== imgInfo.id
      );
      setDisplayImage(newImageArray);
    }
  }

  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <Container>
      <div style={{ marginBottom: "30px" }}>
        <ReviewTitle title={title} handleTitleInput={handleTitleInput} />
        <ExhibitionPicker>
          <ExhibitionSelect
            selectedExhibitonInfo={selectedExhb}
            handleSelecterModal={handleSelectorModal}
            deleteExhibitionInfo={deleteExhibitionInfo}
          />
          <div>
            <SubTitle text="관람일" />
            <Calender
              selectedDate={modifyDate}
              handleSelectedDate={setSelectedDate}
            />
          </div>
        </ExhibitionPicker>
        <SelectorConatiner>
          <SubTitle text="관람 시간" />
          <SelectContainer>
            <TimeSelector>
              <p>입장</p>
              <Selectbox
                onClick={onCilckEnterTime}
                options={getTimeOptions()}
                placeholder={times[0]}
                name="입장시간"
                width="130px"
              />
            </TimeSelector>
            <TimeSelector>
              <p>퇴장</p>
              <Selectbox
                onClick={onCilckExitTime}
                options={getTimeOptions()}
                placeholder={times[1]}
                name="퇴장시간"
                width="130px"
              />
            </TimeSelector>
          </SelectContainer>
        </SelectorConatiner>

        <ConvinenceSelector>
          <SelectorConatiner>
            <SubTitle text="혼잡도" />
            <SelectContainer>
              <TimeSelector>
                <Selectbox
                  onClick={onCilckCongestion}
                  options={["한산", "보통", "북적거림", "매우혼잡"]}
                  placeholder={data?.congestion as string}
                  name="혼잡도"
                  width="130px"
                />
              </TimeSelector>
            </SelectContainer>
          </SelectorConatiner>
          <SelectorConatiner>
            <SubTitle text="교통 수단" />
            <SelectContainer>
              <TimeSelector>
                <Selectbox
                  onClick={onClickTransportation}
                  options={["도보", "버스", "지하철", "차"]}
                  placeholder={data?.transportation as string}
                  name="교통 수단"
                  width="130px"
                />
              </TimeSelector>
            </SelectContainer>
          </SelectorConatiner>
          <SelectorConatiner>
            <SubTitle text="재방문 의향" />
            <SelectContainer>
              <TimeSelector>
                <Selectbox
                  onClick={onClickRevisit}
                  options={["모르겠다", "전혀 없다", "조금 있다", "재방문예정"]}
                  placeholder={data?.revisit as string}
                  name="재방문 의향"
                  width="130px"
                />
              </TimeSelector>
            </SelectContainer>
          </SelectorConatiner>
        </ConvinenceSelector>
        <Editor>
          <div>
            <SubTitle text="현재 저장된 이미지" />
            <PreviewContainer>
              {data
                ? displayImage.map((each, index) => (
                    <Preview key={keys[index]}>
                      <PreviewImage src={each.url} alt="현재 투고된 이미지" />
                      <XButton onClick={() => deleteExistingImg(each)}>
                        <img src={xBtn} alt="기존 이미지 삭제버튼" />
                      </XButton>
                    </Preview>
                  ))
                : null}
            </PreviewContainer>
            <Editor.ImageArea
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
            />
            <Editor.TextInputArea
              value={contents}
              name="텍스트 에어리어"
              textChangeHandler={HandlerContents}
            />
          </div>
        </Editor>
      </div>
      <ButtonContainer>
        <Button variant="text" size="large">
          취소하기
        </Button>
        <Button onClick={HandleSubmit} variant="primary" size="large">
          등록하기
        </Button>
      </ButtonContainer>
      <Modal open={isModalOpen} handleModal={handleSelectorModal}>
        <ExhibitionChoice
          getExhbInfo={getExhibitionInfo}
          handleModal={handleSelectorModal}
        />
      </Modal>
    </Container>
  );
};

export default BlogReviewUpdate;

const Container = styled.div`
  width: 75vw;
  padding: 30px;
  margin: 50px auto;
`;

const ExhibitionPicker = styled.div`
  display: grid;
  /* justify-content: flex-start;
  align-items: stretch; */
  grid-template-columns: repeat(auto-fit, minmax(280px, 320px));
  align-content: start;
  /* gap: 30px; */
  padding: 0px;
  margin-bottom: 30px;
`;

const SelectContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const TimeSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  & > p {
    color: ${theme.colors.greys60};
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

const ConvinenceSelector = styled.div`
  display: flex;
  gap: 20px;
`;

const SelectorConatiner = styled.div`
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 15px 0;
  flex-flow: row wrap;
`;

const Preview = styled.div`
  display: inline-block;
  position: relative;
  width: 250px;
  aspect-ratio: 1 /1;
  margin-inline: 1rem;
  margin-bottom: 2rem;
  object-fit: cover;
`;

const PreviewImage = styled.img`
  border: 1px solid ${theme.colors.greys40};
  border-radius: 4px;
  padding: 5px;
  width: 250px;
  aspect-ratio: 1 / 1;
  object-fit: fill;
  &:hover {
    box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
  }
`;

const XButton = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px;
`;
