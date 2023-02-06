import React, {
  ChangeEvent,
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import returnkeys from "../utils/returnkeys";
import SubTitle from "./SubTitle";

interface EditorProps {
  children: ReactElement;
}

interface ImageProps {
  imageFiles: FileList | null;
  setImageFiles: Dispatch<SetStateAction<FileList | null>>;
}

interface TextInputAreaProps {
  name: string;
  value: string;
  textChangeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Editor = ({ children }: EditorProps) => <Container>{children}</Container>;

export default Editor;

function usePreviewImages(imageFiles: FileList) {
  const [previewImages, setPreviewImages] = useState<[] | string[]>([]);
  useEffect(() => {
    if (imageFiles) {
      setPreviewImages([]);
      for (let index = 0; index < imageFiles.length; index += 1) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFiles[index]);
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPreviewImages((prev) => [...prev, reader.result as string]);
          }
        };
      }
    }
  }, [imageFiles]);

  return { previewImages };
}

const ImageArea = ({ imageFiles, setImageFiles }: ImageProps) => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { previewImages } = usePreviewImages(imageFiles as FileList);
  const previewIds = returnkeys(previewImages.length);

  const ChangePictureHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const targetFiles = event.target.files;
      setImageFiles(targetFiles);
    }
  };

  return (
    <>
      <SubTitle text="오늘의 사진" />
      <PreviewContainer>
        {previewImages &&
          previewImages.map((each, index) => (
            <Preview key={previewIds[index]}>
              <PreviewImage src={each} alt="프리뷰 이미지" />
            </Preview>
          ))}
      </PreviewContainer>
      <FormBox>
        <label htmlFor="image-files">사진 올리기</label>
        <input
          onChange={ChangePictureHandler}
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          multiple
          id="image-files"
          ref={imageRef}
        />
      </FormBox>
    </>
  );
};

const TextInputArea = ({
  name,
  value,
  textChangeHandler,
}: TextInputAreaProps) => (
  <TextArea
    name={name}
    value={value}
    onChange={textChangeHandler}
    placeholder="내용을 입력해주세요."
  />
);

Editor.ImageArea = ImageArea;
Editor.TextInputArea = TextInputArea;

const Container = styled.div``;

const PreviewContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 15px 0;
  flex-flow: row wrap;
`;

const Preview = styled.div`
  display: inline-block;
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

const FormBox = styled.div`
  display: inline-block;
  height: 40px;
  margin: 10px auto;
  & > label {
    padding: 10px 20px;
    border: 1px solid ${theme.colors.greys40};
    border-radius: 30px;
    color: ${theme.colors.greys60};
  }
  & > input {
    display: none;
  }
`;

// const SubTitle = styled.h2`
//   font-weight: bold;
//   font-size: 14px;
//   color: #333;
//   margin-bottom: 10px;
// `;

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  /* aspect-ratio: 1 / 0.7; */
  border-radius: 1rem;
  padding: 20px;
  border-color: ${theme.colors.greys40};
  outline: none;
  /* outline-color: ${theme.colors.greys60}; */
  resize: none;
  :hover {
    border: 1px solid ${theme.colors.primry60};
    box-shadow: 0px 4px 30px rgba(79, 55, 139, 0.05);
  }
  ::-webkit-scrollbar {
    display: block;
    width: 14px;
  }
  ::-webkit-scrollbar-thumb {
    display: block;
    width: 14px;
    background-color: #d9d9d9;
    border-radius: 1000px;
    background-clip: padding-box;
    border: 5px solid transparent;
  }
  :focus-visible {
    outline: none;
  }
`;
