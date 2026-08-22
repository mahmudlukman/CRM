import { Download, Plus } from "lucide-react";

interface LeadsHeaderProps {
  exporting: boolean;
  onExport: () => void;
  onAddLead: () => void;
}

const LeadsHeader = ({ exporting, onExport, onAddLead }: LeadsHeaderProps) => {
  return (
    <div className="page-heading">
      <div>
        <h1>Leads</h1>

        <p className="card-subtitle">Track and qualify every opportunity.</p>
      </div>

      <div className="leads-heading-actions">
        <button
          type="button"
          className="outline-button"
          onClick={onExport}
          disabled={exporting}
        >
          {exporting ? (
            <span className="spinner dark" />
          ) : (
            <>
              <Download size={17} />
              Export
            </>
          )}
        </button>

        <button
          type="button"
          className="primary-button small"
          onClick={onAddLead}
        >
          <Plus size={18} />
          Add Lead
        </button>
      </div>
    </div>
  );
};

export default LeadsHeader;
