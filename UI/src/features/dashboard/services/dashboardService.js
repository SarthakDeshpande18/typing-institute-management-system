import axiosInstance from "../../../api/axiosConfig";

export const getDashboard = async () => {
    return await axiosInstance.get("/dashboard");
};