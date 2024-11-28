import axios from "axios";
import { toast } from "react-toastify";
const API_URL = "https://moneyfulpublicpolicy.co.kr";

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    if (error) {
      toast.error("회원정보가 올바르게 입력되지않았습니다.");
    }
  }
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  const localData = response.data;

  if (localData.success) {
    const userInfo = {
      accessToken: localData.accessToken,
      userId: localData.userId,
    };
    localStorage.setItem("user", JSON.stringify(userInfo));
  }
  1;

  return localData;
};

export const getUserProfile = async (formData, token) => {
  const response = await axios.post(`${API_URL}/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProfile = async (formData, updateToken) => {
  const response = await axios.patch(`${API_URL}/profile`, formData, {
    headers: {
      Authorization: `Bearer ${updateToken}`,
    },
  });
  return response.data;
};
