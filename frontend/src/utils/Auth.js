import { baseUrl } from "./Utils";
const handleResponse = (response) => {
  if (response.ok) return response.json();
  else return Promise.reject(response.status);
};

export const getToken = () => {
  return `Bearer ${localStorage.getItem('jwt')}`;
}

export const register = ({ email, password }) => {
  return fetch(`${baseUrl}/signup`, {
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
  return fetch(`${baseUrl}/signin`, {
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
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
  }).then((res) => handleResponse(res));
};
