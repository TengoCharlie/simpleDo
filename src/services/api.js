const API_URL = "http://localhost:5000/api";

export const todoApi = {
  async getAllTodos() {
    const response = await fetch(`${API_URL}/todos`);
    return response.json();
  },

  async addTodo({ title, content }) {
    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
    return response.json();
  },

  async updateTodo(id, updates) {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    return response.json();
  },

  async deleteTodo(id) {
    await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    });
  },
};
