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

export const getPendingFees = async (payload) => {
    return await axiosInstance.post(
        "/fees/pending",
        payload
    );
};
