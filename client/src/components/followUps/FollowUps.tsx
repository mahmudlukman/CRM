import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  useCreateFollowUpMutation,
  useDeleteFollowUpMutation,
  useGetAllFollowUpsQuery,
  useUpdateFollowUpMutation,
} from "../../redux/features/followUp/followUpApi";
import { computeFollowUpStats, groupFollowUps } from "../../utils/followUp";
import type { FollowUpTab } from "./constants";
import FollowUpsHeader from "./FollowUpsHeader";
import FollowUpsStatsRow from "./FollowUpsStatsRow";
import ProgressCard from "./ProgressCard";
import TabRow from "./TabRow";
import TaskList from "./TaskList";
import type {
  FollowUp,
  FollowUpPayload,
  FollowUpStatus,
} from "../../@types/crm";
import type { RowMenuItem } from "../../@types/lead";
import { FollowUpModal } from "../ui/FollowUpModal";

const FollowUps = () => {
  const { data, isLoading } = useGetAllFollowUpsQuery();
  const [createFollowUp] = useCreateFollowUpMutation();
  const [updateFollowUp] = useUpdateFollowUpMutation();
  const [deleteFollowUp] = useDeleteFollowUpMutation();

  const followUps = data?.followUps;
  const tasks = useMemo(() => followUps ?? [], [followUps]);

  const [tab, setTab] = useState<FollowUpTab>("All");
  const [modalTask, setModalTask] = useState<FollowUp | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);

  const stats = useMemo(() => computeFollowUpStats(tasks), [tasks]);
  const percentDone = stats.total
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  const tabFiltered = useMemo(
    () =>
      tab === "All" ? tasks : tasks.filter((t: FollowUp) => t.status === tab),
    [tasks, tab],
  );

  const groups = useMemo(() => groupFollowUps(tabFiltered), [tabFiltered]);

  function openCreate() {
    setModalTask(undefined);
    setShowModal(true);
  }

  function openEdit(task: FollowUp) {
    setModalTask(task);
    setShowModal(true);
  }

  async function handleSubmit(payload: FollowUpPayload) {
    if (modalTask) {
      await updateFollowUp({ id: modalTask._id, data: payload }).unwrap();
    } else {
      await createFollowUp(payload).unwrap();
    }
  }

  async function handleDelete(task: FollowUp) {
    if (!window.confirm("Delete this task?")) return;
    await deleteFollowUp(task._id).unwrap();
  }

  function setStatus(task: FollowUp, status: FollowUpStatus) {
    updateFollowUp({ id: task._id, data: { status } });
  }

  function cycleStatus(task: FollowUp) {
    const next: FollowUpStatus =
      task.status === "Pending"
        ? "In Progress"
        : task.status === "In Progress"
          ? "Completed"
          : "Pending";
    setStatus(task, next);
  }

  function rowMenuItems(task: FollowUp): RowMenuItem[] {
    return [
      {
        label: "Mark pending",
        icon: null,
        onClick: () => setStatus(task, "Pending"),
      },
      {
        label: "Mark in progress",
        icon: null,
        onClick: () => setStatus(task, "In Progress"),
      },
      {
        label: "Mark completed",
        icon: null,
        onClick: () => setStatus(task, "Completed"),
      },
      { label: "Edit", icon: null, onClick: () => openEdit(task) },
      {
        label: "Delete",
        icon: null,
        onClick: () => handleDelete(task),
        danger: true,
      },
    ];
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50/50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
          <p className="text-xs font-semibold text-slate-500">
            Loading follow-ups...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-[1320px] bg-gradient-to-br from-slate-50 via-slate-100/60 to-slate-50 p-4 sm:p-6 lg:p-8 space-y-6">
      {showModal && (
        <FollowUpModal
          task={modalTask}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}

      {/* Header */}
      <FollowUpsHeader onAddTask={openCreate} />

      {/* Stats Summary Grid */}
      <FollowUpsStatsRow stats={stats} />

      {/* Completion Progress Bar */}
      <ProgressCard
        completed={stats.completed}
        total={stats.total}
        percentDone={percentDone}
      />

      {/* Filter Tabs & Main Task List */}
      <div className="space-y-4">
        <TabRow tab={tab} onTabChange={setTab} />
        <TaskList
          groups={groups}
          loading={isLoading}
          onCycleStatus={cycleStatus}
          rowMenuItems={rowMenuItems}
        />
      </div>
    </div>
  );
};

export default FollowUps;
