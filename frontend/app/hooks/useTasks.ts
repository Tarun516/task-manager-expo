import { useEffect, useState } from "react";
import { Task } from "../types";

const API_URL = "http://192.168.0.104:4000";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append("status", statusFilter);
      if (searchKeyword) params.append("keyword", searchKeyword);

      const res = await fetch(`${API_URL}/tasks?${params.toString()}`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Fetch tasks failed:", err);
    }
  };

  // Add a new task
  const addTask = async (title: string, description: string) => {
    if (!title.trim()) return alert("Title is required");

    const tempTask: Task = {
      id: Math.random().toString(),
      title,
      description,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    // Optimistically update UI
    setTasks((prev) => [tempTask, ...prev]);

    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) throw new Error("Failed to add task");
      const savedTask = await res.json();

      setTasks((prev) =>
        prev.map((t) => (t.id === tempTask.id ? savedTask : t))
      );

      return true;  
    } catch (err) {
      console.error("Add failed:", err);
      // rollback if failed
      setTasks((prev) => prev.filter((t) => t.id !== tempTask.id));
      return false;
    }

    // always refetch actual backend data
    fetchTasks();
  };

  // Update task status
  const updateTaskStatus = async (
    id: string,
    status: "Pending" | "Completed"
  ) => {
    // optimistic update
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));

    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
    } catch (err) {
      console.error("Update failed:", err);
    }

    fetchTasks(); // sync again
  };

  // Delete task
  const deleteTask = async (id: string) => {
    const oldTasks = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete task");
    } catch (err) {
      console.error("Delete failed:", err);
      setTasks(oldTasks); // rollback if failed
    }

    // resync with backend
    fetchTasks();
  };

  // auto-fetch when filters change
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchTasks();
    }, 300);
    return () => clearTimeout(timeout);
  }, [statusFilter, searchKeyword]);

  return {
    tasks,
    statusFilter,
    searchKeyword,
    setStatusFilter,
    setSearchKeyword,
    addTask,
    updateTaskStatus,
    deleteTask,
  };
}
