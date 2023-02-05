const fileValidataionCheck = (files: FileList) => {
  const arrowedFileType = ["gif", "jpg", "jpeg"];

  if (files.length > 3) {
    alert("이미지 파일은 최대 3개까지 첨부할 수 있습니다.");
    return false;
  }

  for (let index = 0; index < files.length; index += 1) {
    const file = files.item(index);
    if (!file) return false;

    const fileType = file.name.substring(file.name.lastIndexOf(".") + 1);

    if (!arrowedFileType.includes(fileType)) {
      alert("해당 파일 형식은 첨부할 수 없습니다!");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("5MB 이하의 파일만 첨부할 수 있습니다.");
      return false;
    }
  }
  return true;
};

export default fileValidataionCheck;
