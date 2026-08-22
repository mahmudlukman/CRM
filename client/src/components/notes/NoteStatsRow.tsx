import { FileText, Link2, Pin } from "lucide-react";
import type { NoteCounts } from "../../utils/noteHelpers";

interface NotesStatsRowProps {
  counts: NoteCounts;
}

const NotesStatsRow = ({ counts }: NotesStatsRowProps) => {
  return (
    <div className="stat-row">
      <div className="stat-card">
        <span className="stat-icon blue">
          <FileText size={20} />
        </span>
        <div>
          <span>Total notes</span>
          <b>{counts.total}</b>
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-icon amber-icon">
          <Pin size={20} />
        </span>
        <div>
          <span>Pinned</span>
          <b>{counts.pinned}</b>
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-icon teal">
          <Link2 size={20} />
        </span>
        <div>
          <span>Linked</span>
          <b>{counts.linked}</b>
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-icon purple">
          <FileText size={20} />
        </span>
        <div>
          <span>Unlinked</span>
          <b>{counts.unlinked}</b>
        </div>
      </div>
    </div>
  );
};

export default NotesStatsRow;
