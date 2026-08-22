import { ArrowUpRight } from "lucide-react";
import type { OverviewTopContact } from "../../../@types/crm";
import Card from "../../ui/Card";

interface TopContactsCardProps {
  contacts: OverviewTopContact[];
  totalLeads: number;
}

const TopContactsCard = ({ contacts, totalLeads }: TopContactsCardProps) => {
  return (
    <Card className="contacts-card">
      <button className="corner-button">
        <ArrowUpRight size={18} />
      </button>
      <h3 className="card-title">Top Contacts</h3>
      <p className="card-subtitle">Your key relationships</p>
      <div className="avatar-stack">
        {contacts.map((c) => (
          <span key={c.id} title={`${c.name} · ${c.company}`}>
            {c.initials}
          </span>
        ))}
        <b>+{Math.max(totalLeads - contacts.length, 0)}</b>
        <a>View all</a>
      </div>
    </Card>
  );
};

export default TopContactsCard;
