import { BASE_URL } from "./Utils";
const handleResponse = (response) => {
  if (response.ok) return response.json();
  else return Promise.reject(response.status);
};

export const getToken = () => {
  return `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjg5NjFkNjE0MGE0YjQ3NTQwMjFhNjgiLCJpYXQiOjE2NTMxNzExNTUsImV4cCI6MTY1Mzc3NTk1NX0.nBJXoTVgXNcQDPhoHh3XoR97D4wspvWSR_yeY6hNlhU'`;
}

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => handleResponse(res));
};
export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => handleResponse(res));
};
export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
  }).then((res) => handleResponse(res));
};
