export const API_VERSION = 1;
export const API_URL = `/api/v${API_VERSION}`;

export const Endpoints = {
  Callback: "/callback",
  Login: "/login",
  Logout: "/logout",
  User: (userID: string) => `${API_URL}/users/${userID}`,
};
