import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { mbtiDescriptions } from "../data/mbtiDescriptions";

const API_URL = "https://obvious-foremost-midnight.glitch.me";

export const getTestResults = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTestResult = async (resultData, userId) => {
  const newResult = {
    id: uuidv4(),
    type: resultData,
    description:
      mbtiDescriptions[resultData] || "해당 성격 유형에 대한 설명이 없습니다.",
    userId,
    created_at: new Date().toISOString(),
    visibility: false,
  };
  const response = await axios.post(API_URL, newResult);
  return response.data;
};

export const deleteTestResult = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const updateTestResultVisibility = async (id, visibility) => {
  const response = await axios.patch(`${API_URL}/${id}`, { visibility });
  return response.data;
};
