import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Task } from "../types";
import { styles } from "../styles/styles";

interface TaskCardProps {
  item: Task;
  onComplete: (id: string) => void;
  onPending: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({
  item,
  onComplete,
  onPending,
  onDelete,
}: TaskCardProps) {
  return (
    <View
      style={[styles.card, item.status === "Completed" && styles.completedCard]}
    >
      {/* Header section */}
      <View style={styles.header}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.status}>
          {item.status === "Pending" ? "⏳ Pending" : "✅ Done"}
        </Text>
      </View>

      {/* Body */}
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.date}>
        Created: {new Date(item.createdAt).toLocaleString()}
      </Text>

      {/* Actions */}
      <View style={styles.actions}>
        {item.status === "Pending" ? (
          <TouchableOpacity
            style={[styles.button, styles.completeButton]}
            onPress={() => onComplete(item.id)}
          >
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.button, styles.pendingButton]}
              onPress={() => onPending(item.id)}
            >
              <Text style={styles.buttonText}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={() => onDelete(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
