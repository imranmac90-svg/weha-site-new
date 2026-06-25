import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export async function submitAuditRequest(payload) {
  const { data } = await axios.post(`${API}/audit-requests`, payload);
  return data;
}
