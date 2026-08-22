import { useState, type FormEvent } from "react";
import { X } from "lucide-react";

const PRIORITIES = ["Low", "Medium", "High"] as const;

const STATUSES = ["Pending", "In Progress", "Completed"] as const;

type FollowUpPriority = (typeof PRIORITIES)[number];

type FollowUpStatus = (typeof STATUSES)[number];

interface FollowUpTask {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  relatedTo?: string;
  dueDate?: string;
  priority?: FollowUpPriority;
  status?: FollowUpStatus;
}

interface FollowUpForm {
  title: string;
  description: string;
  relatedTo: string;
  dueDate: string;
  priority: FollowUpPriority;
  status: FollowUpStatus;
}

interface FollowUpPayload {
  title: string;
  description: string;
  relatedTo: string;
  dueDate: string;
  priority: FollowUpPriority;
  status: FollowUpStatus;
}

interface FollowUpModalProps {
  task?: FollowUpTask;
  onClose: () => void;
  onSubmit: (payload: FollowUpPayload) => Promise<void>;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "response" in error) {
    const apiError = error as ApiError;

    return (
      apiError.response?.data?.message ||
      "Something went wrong. Please try again."
    );
  }

  return "Something went wrong. Please try again.";
}

export const FollowUpModal = ({
  task,
  onClose,
  onSubmit,
}: FollowUpModalProps) => {
  const [form, setForm] = useState<FollowUpForm>({
    title: task?.title || "",
    description: task?.description || "",
    relatedTo: task?.relatedTo || "",
    dueDate: task?.dueDate ? task.dueDate.slice(0, 10) : "",
    priority: task?.priority || "Medium",
    status: task?.status || "Pending",
  });

  const [error, setError] = useState<string>("");

  const [saving, setSaving] = useState<boolean>(false);

  function setField<K extends keyof FollowUpForm>(
    field: K,
    value: FollowUpForm[K],
  ): void {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Task title is required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await onSubmit({
        ...form,
        title: form.title.trim(),
      });

      onClose();
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <h2>{task ? "Edit Task" : "New Task"}</h2>

            <p className="modal-subtitle">
              {task
                ? "Update this commitment."
                : "Add a follow-up so nothing slips through."}
            </p>
          </div>

          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={submit}>
          {error && <p className="modal-error">{error}</p>}

          <div className="field">
            <label htmlFor="task-title">Task title</label>

            <input
              id="task-title"
              value={form.title}
              onChange={(event) => setField("title", event.target.value)}
              placeholder="Send proposal follow-up"
            />
          </div>

          <div className="field">
            <label htmlFor="task-description">Description</label>

            <textarea
              id="task-description"
              value={form.description}
              onChange={(event) => setField("description", event.target.value)}
              placeholder="Optional context for this task"
            />
          </div>

          <div className="field">
            <label htmlFor="task-related">Related to</label>

            <input
              id="task-related"
              value={form.relatedTo}
              onChange={(event) => setField("relatedTo", event.target.value)}
              placeholder="Contact or company"
            />
          </div>

          <div className="two-col">
            <div className="field">
              <label htmlFor="task-due-date">Due date</label>

              <input
                id="task-due-date"
                type="date"
                value={form.dueDate}
                onChange={(event) => setField("dueDate", event.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="task-priority">Priority</label>

              <select
                id="task-priority"
                value={form.priority}
                onChange={(event) =>
                  setField("priority", event.target.value as FollowUpPriority)
                }
              >
                {PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="task-status">Status</label>

            <select
              id="task-status"
              value={form.status}
              onChange={(event) =>
                setField("status", event.target.value as FollowUpStatus)
              }
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-footer">
            <button type="button" className="outline-button" onClick={onClose}>
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button small"
              disabled={saving}
            >
              {saving ? (
                <span className="spinner dark" />
              ) : task ? (
                "Save changes"
              ) : (
                "Add Task"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
