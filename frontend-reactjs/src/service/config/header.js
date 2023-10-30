export const header = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    return {
      Authorization: "Bearer " + token,
      ContentType: "application/json",
    };
  }
};
