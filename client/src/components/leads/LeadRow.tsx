import type {
  Lead,
  RowMenuItem,
  SortDirection,
  SortField,
} from "../../@types/lead";
import RowMenu from "../ui/RowMenu";
import { colorFor, idOf, initialsOf, relativeTime } from "./utils";

interface LeadRowProps {
  lead: Lead;

  selected: boolean;
  onSelect: (id: string) => void;

  onOpen: (lead: Lead) => void;

  menuItems: RowMenuItem[];

  sortField: SortField;
  sortDir: SortDirection;
}

const LeadRow = ({
  lead,
  selected,
  onSelect,
  onOpen,
  menuItems,
}: LeadRowProps) => {
  const id = idOf(lead);

  return (
    <tr className={selected ? "selected" : ""} onClick={() => onOpen(lead)}>
      <td onClick={(event) => event.stopPropagation()}>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(id)}
          aria-label={`Select ${lead.name}`}
        />
      </td>

      <td>
        <span className={`initial ${colorFor(id)}`}>
          {initialsOf(lead.name)}
        </span>

        <div>
          <b>{lead.name}</b>

          <small>{lead.company}</small>
        </div>
      </td>

      <td>
        <span className={`badge ${lead.status.toLowerCase()}`}>
          {lead.status}
        </span>
      </td>

      <td>
        <span className={`badge ${(lead.priority || "Medium").toLowerCase()}`}>
          {lead.priority || "Medium"}
        </span>
      </td>

      <td>
        <span className="pill">{lead.source}</span>
      </td>

      <td>
        <b>${Number(lead.value || 0).toLocaleString("en-US")}</b>
      </td>

      <td>{relativeTime(lead.updatedAt || lead.createdAt)}</td>

      <td onClick={(event) => event.stopPropagation()}>
        <RowMenu items={menuItems} />
      </td>
    </tr>
  );
};

export default LeadRow;
