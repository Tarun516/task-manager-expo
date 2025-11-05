import fs from "fs/promises";
import path from "path";
import { Task } from "./task";

const FILE_PATH = path.join(__dirname, "tasks.json");

let taskCache: Task[] | null = [];
export async function readTasks(): Promise<Task[]> {
  try {
    if (taskCache) return taskCache;
    const text = await fs.readFile(FILE_PATH, "utf8");
    const trimmed = text.trim();
    taskCache = trimmed ? (JSON.parse(trimmed) as Task[]) : [];
    return taskCache;
  } catch (err: any) {
    if (err.code === "ENOENT") {
      return [];
    }
    throw err;
  }
}

export async function writeTasks(tasks: Task[]): Promise<void> {
  taskCache = tasks;
  await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), "utf8");
}
