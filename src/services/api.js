const API_URL = "http://localhost:5000/api";

// Shared fetch helper that injects auth headers and surfaces API errors
const request = async (path, { method = "GET", body } = {}, token) => {
  const options = {
    method,
    headers: {},
  };

  if (body !== undefined) {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json";
  }

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_URL}${path}`, options);
  } catch (error) {
    throw new Error("Unable to reach the server. Please try again.");
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
};

export const authApi = {
  register(details) {
    return request("/auth/register", { method: "POST", body: details });
  },
  login(credentials) {
    return request("/auth/login", { method: "POST", body: credentials });
  },
  getProfile(token) {
    return request("/auth/profile", {}, token);
  },
  updateProfile(token, updates) {
    return request("/auth/profile", { method: "PUT", body: updates }, token);
  },
};

export const todoApi = {
  getAllTodos(token) {
    return request("/todos", {}, token);
  },
  addTodo(token, payload) {
    return request("/todos", { method: "POST", body: payload }, token);
  },
  updateTodo(token, id, updates) {
    return request(`/todos/${id}`, { method: "PUT", body: updates }, token);
  },
  async deleteTodo(token, id) {
    await request(`/todos/${id}`, { method: "DELETE" }, token);
  },
};
