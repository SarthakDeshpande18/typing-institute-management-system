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
export const deleteStudent = async (id) => {
  const response = await axiosInstance.delete(
    `/students/${id}`
  );

  return response.data;
};


export const uploadStudentPhoto = async (
  id,
  file
) => {

  const formData = new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await axiosInstance.post(
      `/students/${id}/photo`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
};

export const uploadStudentDocument = async (
  id,
  documentType,
  file
) => {

  const formData = new FormData();

  formData.append(
    "documentType",
    documentType
  );

  formData.append(
    "file",
    file
  );

  const response =
    await axiosInstance.post(
      `/students/${id}/documents`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
};