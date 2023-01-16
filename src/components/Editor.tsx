import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useRef, useState } from "react";

const Editor = () => {
  const [files, setFiles] = useState<FileList | null>(null);

  const onChangePic = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(() => event.target?.files);
  };

  const onSubmitHandler = () => {};

  return (
    <div>
      <form>
        <label htmlFor="image-file">사진 올리기</label>
        <input
          onChange={onChangePic}
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          multiple
          id="image-file"
        />
        <button onClick={onSubmitHandler} type="button">
          제출
        </button>
      </form>
    </div>
  );
};

export default Editor;

// // function useFiles(files: []) {
// //   const [base64, setBase64] = useState();

// //   useEffect(() => {
// //     if (files.length <= 5) {
// //       for (let i = 0; i < files.length; i++) {
// //         // console.log(files[i].name);
// //         if (fileValidation(files[i])) {
// //           const reader = new FileReader();
// //           reader.readAsDataURL(files[i]);
// //           reader.onload = () => {
// //             if (reader.readyState === 2) {
// //               setBase64s((prev) => [...prev, reader.result]);
// //             }
// //           };
// //         }
// //       }
// //     } else {
// //       imageRef.current.value = "";
// //       alert("사진 첨부는 5장까지 가능합니다.");
// //     }
// //   }, [files]);
// // }

// interface FileObj {
//   name: string;
//   size: number;
//   length: number;
// }

// function fileValidationCheck(obj: FileObj) {
//   const arrowedfileTypes = ["image/jpg", "image/jpeg", "image/png"];
//   const fileType = getFileType();

//   if (obj.size > 5 * 1024 * 1024) return false;
//   if (obj.length > 3) return false;
//   if (!arrowedfileTypes.includes(fileType)) return false;

//   function getFileType() {
//     return obj.name.substring(obj.name.lastIndexOf(".") + 1);
//   }
//   return true;

//   // if (obj.name?.length > 100) {
//   //   alert("파일명이 100자 이상인 파일은 첨부할 수 없습니다.");
//   //   imageRef.current.value = "";
//   //   return false;
//   // }
//   // if (obj.size > 10 * 1024 * 1024) {
//   //   alert("용량이 10MB를 초과한 파일은 첨부할 수 없습니다.");
//   //   imageRef.current.value = "";
//   //   return false;
//   // }
//   // if (obj.name.lastIndexOf(".") === -1) {
//   //   alert("확장자가 없는 파일은 첨부할 수 없습니다.");
//   //   imageRef.current.value = "";
//   //   return false;
//   // }
//   // if (!fileTypes.includes(obj.type)) {
//   //   alert("해당 파일은 첨부할 수 없습니다.");
//   //   imageRef.current.value = "";
//   //   return false;
//   // }
//   // if (!fileTypesName.includes(objExactType)) {
//   //   alert("해당 파일은 첨부할 수 없습니다.");
//   //   imageRef.current.value = "";
//   //   return false;
//   // }
//   // if (imageKeys.length + files.length - deleteImgTray.length > 5) {
//   //   imageRef.current.value = "";
//   //   alert("사진은 총 5장까지 게시할 수 있습니다.");
//   //   return false;
//   // }
//   // return true;
// }
