import type { FollowUp, FollowUpGroup, FollowUpStatus } from "../@types/crm";

export const idOf = (task: FollowUp): string => {
  return task._id || "";
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

export interface FollowUpStats {
  total: number;
  pending: number;
  overdue: number;
  completed: number;
}

export const computeFollowUpStats = (tasks: FollowUp[]): FollowUpStats => {
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pending = tasks.filter((t) => t.status === "Pending").length;
  const overdue = tasks.filter(isOverdue).length;
  return { total: tasks.length, pending, overdue, completed };
};

export const groupFollowUps = (tasks: FollowUp[]): FollowUpGroup[] => {
  const overdue = [...tasks.filter(isOverdue)].sort(
    (a, b) =>
      new Date(a.dueDate || 0).getTime() - new Date(b.dueDate || 0).getTime(),
  );
  const upcoming = [
    ...tasks.filter((t) => t.status !== "Completed" && !isOverdue(t)),
  ].sort(
    (a, b) =>
      new Date(a.dueDate || 0).getTime() - new Date(b.dueDate || 0).getTime(),
  );
  const completed = [...tasks.filter((t) => t.status === "Completed")].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  const groups: FollowUpGroup[] = [
    { key: "OVERDUE", items: overdue },
    { key: "UPCOMING", items: upcoming },
    { key: "COMPLETED", items: completed },
  ];

  return groups.filter((group) => group.items.length > 0);
};
