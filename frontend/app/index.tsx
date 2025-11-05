import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTasks } from "./hooks/useTasks";
import { TaskCard } from "./components/TaskCard";

export default function Index() {
  const {
    tasks,
    statusFilter,
    searchKeyword,
    setStatusFilter,
    setSearchKeyword,
    addTask,
    updateTaskStatus,
    deleteTask,
  } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task Manager</Text>

      {/* Input Form */}
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={async () => {
          const success = await addTask(title, description);
          if (success) {
            setTitle("");
            setDescription("");
          }
        }}
      >
        <Text style={styles.addBtnText}>Add Task</Text>
      </TouchableOpacity>

      {/* Filters */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            statusFilter === "Pending" && styles.activeFilter,
          ]}
          onPress={() =>
            setStatusFilter(statusFilter === "Pending" ? "" : "Pending")
          }
        >
          <Text>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            statusFilter === "Completed" && styles.activeFilter,
          ]}
          onPress={() =>
            setStatusFilter(statusFilter === "Completed" ? "" : "Completed")
          }
        >
          <Text>Completed</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Search..."
          value={searchKeyword}
          onChangeText={setSearchKeyword}
        />
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            item={item}
            onComplete={(id: string) => updateTaskStatus(id, "Completed")}
            onPending={(id: string) => updateTaskStatus(id, "Pending")}
            onDelete={deleteTask}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 6 },
  addBtn: {
    backgroundColor: "#46459f",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  addBtnText: { color: "#fff", fontWeight: "bold" },
  filterRow: { flexDirection: "row", marginVertical: 10 },
  filterBtn: { padding: 8, borderWidth: 1, borderRadius: 5, marginRight: 8 },
  activeFilter: { backgroundColor: "#ddd" },
});
