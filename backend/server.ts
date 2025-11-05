import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// 👇 Mount your task routes BEFORE any fallback routes
app.use("/tasks", taskRoutes);

app.listen(4000, () => {
  console.log("✅ Server running on port 4000");
});
