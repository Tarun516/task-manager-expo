import { Request, Response } from "express";
import { Task } from "../task";
import { readTasks, writeTasks } from "../storage";
import { v4 as uuidv4 } from "uuid";

export async function getTasks(req: Request, res: Response) {
  try {
    const { status, keyword } = req.query;
    let tasks = await readTasks();

    // Filter by status
    if (status && (status === "Pending" || status === "Completed")) {
      tasks = tasks.filter((t) => t.status === status);
    }

    // Filter by keyword
    if (keyword && typeof keyword === "string") {
      tasks = tasks.filter((t) =>
        t.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Get Tasks Error:", error);
    return res.status(500).json({ error: "Failed to fetch tasks" });
  }
}


export async function createTask(req: Request, res: Response) {
  try {
    const { title, description } = req.body;

    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ error: "Title is required and must be a string" });
    }

    const newTask: Task = {
      id: uuidv4(),
      title: title.trim(),
      description:
        description && typeof description === "string"
          ? description.trim()
          : "",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const tasks = await readTasks();
    tasks.push(newTask);
    await writeTasks(tasks);

    return res.status(201).json(newTask);
  } catch (error) {
    console.error("Create Task Error:", error);
    return res.status(500).json({ error: "Failed to create task" });
  }
}

export async function markCompleted(req: Request, res: Response) {
  const { id } = req.params;
  const status = req.body?.status;

  try {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Validate provided status
    if (status && !["Pending", "Completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Toggle or set explicitly
    task.status = status ?? (task.status === "Pending" ? "Completed" : "Pending");
    await writeTasks(tasks);

    return res.status(200).json(task);
  } catch (error) {
    console.error("Mark Completed Error:", error);
    return res.status(500).json({ error: "Failed to update task status" });
  }
}


export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const tasks = await readTasks();
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    tasks.splice(index, 1);
    await writeTasks(tasks);

    return res.status(204).send();
  } catch (error) {
    console.error("Delete Task Error:", error);
    return res.status(500).json({ error: "Failed to delete task" });
  }
}
