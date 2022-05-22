import { getAuthToken } from "./utiles";

const BASE_URL = "https://student-json-api.lidemy.me";
export const getPosts = async (page, limit) => {
  const res = await fetch(
    `${BASE_URL}/posts?_page=${page}&_limit=${limit}&_sort=createdAt&_order=desc`
  );
  const totalPage = Number(res.headers.get("x-total-count"));
  const json = await res.json();
  return [json, totalPage];
};

export const getSinglePost = async (id) => {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  const json = await res.json();
  return json;
};

export const login = async (username, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const json = await res.json();
  return json;
};

export const signUp = async (username, password, nickname) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      nickname,
    }),
  });
  const json = await res.json();
  return json;
};

export const getMe = async () => {
  const token = getAuthToken();
  const res = await fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();
  return json;
};

export const addPost = async (title, body) => {
  const token = getAuthToken();
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      body,
    }),
  });
  const json = await res.json();
  return json;
};
