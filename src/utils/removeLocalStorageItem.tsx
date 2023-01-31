function removeLocalStorageItem() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("memberId");
  localStorage.removeItem("email");
  localStorage.removeItem("nickname");
  localStorage.removeItem("memberImage");
  localStorage.removeItem("authority");
}

export default removeLocalStorageItem;
