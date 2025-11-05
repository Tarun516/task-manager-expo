const API_URL = "http://192.168.0.104:4000";

export const api = {
  // fetch all tasks with optional filters (status or keyword)
  getTasks: async (filters?: { status?: string; keyword?: string }) => {
    const params = new URLSearchParams(filters || {});
    const res = await fetch(`${API_URL}/tasks?${params}`);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  },

  // create a new task
  addTask: async (title: string, description: string) => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    if (!res.ok) throw new Error("Failed to add task");
    return res.json();
  },

  // update an existing task's status
  updateTask: async (id: string, status: string) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
  },

  // delete a task by ID
  deleteTask: async (id: string) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete task");

    // only parse JSON if content exists
    const text = await res.text();
    return text ? JSON.parse(text) : {};
  },
};
