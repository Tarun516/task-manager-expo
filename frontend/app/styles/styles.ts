// components/TaskCard/styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#6a5acd", // violet accent
  },

  completedCard: {
    backgroundColor: "#e7f9ec", // light green for completed
    borderLeftColor: "#2e8b57",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },

  status: {
    fontSize: 14,
    color: "#888",
  },

  description: {
    fontSize: 15,
    color: "#555",
    marginVertical: 6,
  },

  date: {
    fontSize: 12,
    color: "#999",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },

  button: {
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 8,
    minWidth: 100,
    alignItems: "center",
  },

  completeButton: {
    backgroundColor: "#4caf50",
  },

  pendingButton: {
    backgroundColor: "#2196f3",
  },

  deleteButton: {
    backgroundColor: "#f44336",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
