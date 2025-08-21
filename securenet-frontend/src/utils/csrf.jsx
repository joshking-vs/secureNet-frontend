
// src/utils/csrf.js
import api from "../api/axios";

export const getCSRFToken = async () => {
  try {
    const response = await api.get("auth/csrf/");
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch CSRF token");
  }
};
