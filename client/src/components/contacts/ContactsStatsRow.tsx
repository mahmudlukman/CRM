import { Building2, Star, Tag, Users } from "lucide-react";
import type { ContactStats } from "../../utils/contactHelpers";

interface ContactsStatsRowProps {
  stats: ContactStats;
}

const ContactsStatsRow = ({ stats }: ContactsStatsRowProps) => {
  return (
    <div className="stat-row">
      <div className="stat-card">
        <span className="stat-icon blue">
          <Users size={20} />
        </span>
        <div>
          <span>Total contacts</span>
          <b>{stats.total}</b>
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-icon amber-icon">
          <Star size={20} />
        </span>
        <div>
          <span>Favorites</span>
          <b>{stats.favorites}</b>
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-icon teal">
          <Building2 size={20} />
        </span>
        <div>
          <span>Companies</span>
          <b>{stats.companies}</b>
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-icon purple">
          <Tag size={20} />
        </span>
        <div>
          <span>Tagged</span>
          <b>{stats.tagged}</b>
        </div>
      </div>
    </div>
  );
};

export default ContactsStatsRow;
