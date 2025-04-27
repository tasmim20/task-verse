import { jwtDecode } from "jwt-decode";

export const verifyToken = () => {
  return jwtDecode(token);
};