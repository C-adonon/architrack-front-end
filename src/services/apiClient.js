const BASE_URL = import.meta.env.VITE_API_URL;

const defaultHeaders = {
  "Content-Type": "application/json",
};

async function request(endpoint, method, data = null, token = null) {
  const config = {
    method,
    headers: {
      ...defaultHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(data && { body: JSON.stringify(data) }),
  };

  console.log(`${BASE_URL}${endpoint}`, config);
  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json();
    console.error(error);
    // TODO: Handle error properly ie show toast
    throw new Error(error.error || "Something went wrong");
  }

  return response.json();
}

export default {
  get(endpoint, token) {
    return request(endpoint, "GET", null, token);
  },
  post(endpoint, data, token) {
    return request(endpoint, "POST", data, token);
  },
  put(endpoint, data, token) {
    return request(endpoint, "PUT", data, token);
  },
  delete(endpoint, token) {
    return request(endpoint, "DELETE", null, token);
  },
};
