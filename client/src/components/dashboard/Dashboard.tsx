import { useState } from "react";
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
import { useSelector } from "react-redux";
import type { RootState } from "../../@types";

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data, isLoading, isError } = useGetOverviewQuery();
  const [createLead] = useCreateLeadMutation();
  const [showLeadModal, setShowLeadModal] = useState(false);

  async function handleCreateLead(payload: LeadPayload) {
    // getOverview's providesTags cover Lead:LIST, so this refetches the
    // overview automatically — no manual reload needed.
    await createLead(payload).unwrap();
    setShowLeadModal(false);
  }

  if (isLoading) {
    return (
      <div className="loading-screen">
        <span className="spinner dark" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="error-banner">
        Couldn't load your dashboard. Please try again.
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
    <div className="dashboard-page">
      {showLeadModal && (
        <LeadModal
          onClose={() => setShowLeadModal(false)}
          onSubmit={handleCreateLead}
        />
      )}

      <DashboardHeader
        userName={user?.name}
        onAddLead={() => setShowLeadModal(true)}
      />

      <div className="dashboard-grid">
        <div className="left-stack">
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

        <div className="center-stack">
          <PipelineEngagementCard engagement={engagement} />
          <LeadActivityTable leadActivity={leadActivity} />
          <PipelineByStageCard stages={stages} />
        </div>

        <div className="right-stack">
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
