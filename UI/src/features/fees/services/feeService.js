import axiosInstance from "../../../api/axiosConfig";

export const getFeeSummary = async (studentId) => {
    return await axiosInstance.get(
        `/fees/student/${studentId}`
    );
};

export const getFeeHistory = async (studentId) => {
    return await axiosInstance.get(
        `/fees/history/${studentId}`
    );
};

export const payFee = async (payload) => {
    return await axiosInstance.post(
        "/fees/pay",
        payload
    );
};

export const getPendingFees = async (
    page = 0,
    size = 10,
    filters = {}
) => {

    return await axiosInstance.post(
        "/fees/pending",
        {
            currentPage: page,
            pageSize: size,
            sortBy: "id",
            filters,
        }
    );
};
