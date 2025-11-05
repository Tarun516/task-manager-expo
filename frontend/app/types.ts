export interface Task {
  id: string;
  title: string;
  description: string;
  status: "Pending" | "Completed";
  createdAt: string;
}
