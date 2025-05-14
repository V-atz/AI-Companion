import axios from "axios";
// const API_URL = "https://qrverse-backend.onrender.com/api/upload";
const API_URL = "http://localhost:3000/api/upload";

const uploadService = async (file, messageType) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileType", messageType);

    const response = await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Uploading failed", error);
    throw error;
  }
};

export default uploadService;