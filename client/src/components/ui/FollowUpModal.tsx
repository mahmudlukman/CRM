import { useState, type FormEvent } from "react";
import { X, AlertCircle, Loader2 } from "lucide-react";

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

const getErrorMessage = (error: unknown): string => {
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
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {task ? "Edit Task" : "New Task"}
            </h2>

            <p className="text-xs text-slate-500 font-normal">
              {task
                ? "Update this commitment."
                : "Add a follow-up so nothing slips through."}
            </p>
          </div>

          <button
            type="button"
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100/80 transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={submit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-600 text-xs font-medium">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="task-title"
              className="text-xs font-semibold text-slate-700"
            >
              Task title <span className="text-rose-500">*</span>
            </label>

            <input
              id="task-title"
              value={form.title}
              onChange={(event) => setField("title", event.target.value)}
              placeholder="Send proposal follow-up"
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="task-description"
              className="text-xs font-semibold text-slate-700"
            >
              Description
            </label>

            <textarea
              id="task-description"
              rows={3}
              value={form.description}
              onChange={(event) => setField("description", event.target.value)}
              placeholder="Optional context for this task"
              className="w-full p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="task-related"
              className="text-xs font-semibold text-slate-700"
            >
              Related to
            </label>

            <input
              id="task-related"
              value={form.relatedTo}
              onChange={(event) => setField("relatedTo", event.target.value)}
              placeholder="Contact or company"
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="task-due-date"
                className="text-xs font-semibold text-slate-700"
              >
                Due date
              </label>

              <input
                id="task-due-date"
                type="date"
                value={form.dueDate}
                onChange={(event) => setField("dueDate", event.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="task-priority"
                className="text-xs font-semibold text-slate-700"
              >
                Priority
              </label>

              <select
                id="task-priority"
                value={form.priority}
                onChange={(event) =>
                  setField("priority", event.target.value as FollowUpPriority)
                }
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
              >
                {PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="task-status"
              className="text-xs font-semibold text-slate-700"
            >
              Status
            </label>

            <select
              id="task-status"
              value={form.status}
              onChange={(event) =>
                setField("status", event.target.value as FollowUpStatus)
              }
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5 mt-6">
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors shadow-xs cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Saving…</span>
                </>
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
