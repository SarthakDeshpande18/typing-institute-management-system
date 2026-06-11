import axiosInstance from "../../../api/axiosConfig";

export const loginApi = async (credentials) => {
  const response = await axiosInstance.post(
    "/auth/login",
    credentials
  );

  return response.data;
};