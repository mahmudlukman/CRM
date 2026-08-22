import type { FollowUp, FollowUpStatus } from "../@types/followUp";

export const idOf = (task: FollowUp): string => {
  return task._id || task.id || "";
};

export const formatDate = (dateStr?: string): string => {
  if (!dateStr) return "—";

  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const isOverdue = (task: FollowUp): boolean => {
  if (task.status === "Completed") {
    return false;
  }

  if (!task.dueDate) {
    return false;
  }

  return new Date(task.dueDate).getTime() < Date.now();
};

export const getNextStatus = (status: FollowUpStatus): FollowUpStatus => {
  if (status === "Pending") {
    return "In Progress";
  }

  if (status === "In Progress") {
    return "Completed";
  }

  return "Pending";
};
