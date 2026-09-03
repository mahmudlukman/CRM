import { useState } from "react";
import { useSelector } from "react-redux";
import { Loader2, AlertCircle } from "lucide-react";
import {
  useCreateLeadMutation,
  useGetOverviewQuery,
} from "../../redux/features/lead/leadApi";
import type { LeadPayload } from "../../@types/crm";

import LeadModal from "../ui/LeadModal";
import DashboardHeader from "./DashboardHeader";
import PipelineGoalCard from "./cards/PipelineGoalCard";
import WeeklyRevenueCard from "./cards/WeeklyRevenueCard";
import ConversionCard from "./cards/ConversionCard";
import UpcomingFollowUpsCard from "./cards/UpcomingFollowUpsCard";
import TopContactsCard from "./cards/TopContactsCard";
import PipelineEngagementCard from "./cards/PipelineEngagementCard";
import LeadActivityTable from "./cards/LeadActivityTable";
import PipelineByStageCard from "./cards/PipelineStageCard";
import RevenueGoalCard from "./cards/RevenueGoalCard";
import AiInsightsCard from "./cards/AiInsightsCard";
import LeadsBySourceCard from "./cards/LeadsBySourceCard";
import TopOpenDealsCard from "./cards/TopOpenDealsCard";
import type { RootState } from "../../redux/store";

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data, isLoading, isError } = useGetOverviewQuery();
  const [createLead] = useCreateLeadMutation();
  const [showLeadModal, setShowLeadModal] = useState(false);

  const handleCreateLead = async (payload: LeadPayload) => {
    await createLead(payload).unwrap();
    setShowLeadModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50/50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
          <p className="text-xs font-semibold text-slate-500">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="m-6 rounded-2xl border border-rose-200 bg-rose-50/50 p-6 text-rose-800 shadow-xs">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
          <div>
            <h4 className="text-sm font-bold">Unable to display dashboard</h4>
            <p className="text-xs text-rose-600/90 mt-0.5">
              Couldn't load your dashboard overview right now. Please refresh or
              try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const {
    metrics,
    stages,
    sources,
    topOpenDeals,
    topContacts,
    leadActivity,
    engagement,
    followUps,
  } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/60 to-slate-50 p-4 sm:p-6 lg:p-8 space-y-6">
      {showLeadModal && (
        <LeadModal
          onClose={() => setShowLeadModal(false)}
          onSubmit={handleCreateLead}
        />
      )}

      {/* Top Header */}
      <DashboardHeader
        userName={user?.name}
        onAddLead={() => setShowLeadModal(true)}
      />

      {/* Dashboard Main Grid - 12 Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* Left Column Stack */}
        <div className="lg:col-span-3 space-y-6">
          <PipelineGoalCard pipelineValue={metrics.pipelineValue} />
          <WeeklyRevenueCard
            weeklyRevenue={metrics.weeklyRevenue}
            growth={engagement.growth}
          />
          <ConversionCard
            conversionRate={metrics.conversionRate}
            totalLeads={metrics.totalLeads}
            openTasks={metrics.openTasks}
          />
          <UpcomingFollowUpsCard followUps={followUps} />
          <TopContactsCard
            contacts={topContacts}
            totalLeads={metrics.totalLeads}
          />
        </div>

        {/* Center Column Stack */}
        <div className="lg:col-span-5 space-y-6">
          <PipelineEngagementCard engagement={engagement} />
          <LeadActivityTable leadActivity={leadActivity} />
          <PipelineByStageCard stages={stages} />
        </div>

        {/* Right Column Stack */}
        <div className="lg:col-span-4 space-y-6">
          <RevenueGoalCard
            revenueWon={metrics.revenueWon}
            onAddLead={() => setShowLeadModal(true)}
          />
          <AiInsightsCard />
          <LeadsBySourceCard sources={sources} />
          <TopOpenDealsCard deals={topOpenDeals} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
