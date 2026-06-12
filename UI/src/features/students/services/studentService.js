import axiosInstance from "../../../api/axiosConfig";

export const getStudents = async (request) => {
  const response = await axiosInstance.post(
    "/students/list",
    request
  );

  return response.data;
};

export const getStudentById = async (id) => {
  const response = await axiosInstance.get(
    `/students/${id}`
  );

  return response.data;
};

export const updateStudent = async (
  id,
  request
) => {
  const response = await axiosInstance.put(
    `/students/${id}`,
    request
  );

  return response.data;
};

export const createStudent = async (request) => {
  const response = await axiosInstance.post(
    "/students/createStudent",
    request
  );

  return response.data;
};