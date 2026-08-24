import { Star } from "lucide-react";
import type { Contact } from "../../@types/crm";
import { colorFor, initialsOf } from "../../utils/leadHelpers";
import type { RowMenuItem } from "./types";
import RowMenu from "../ui/RowMenu";

interface ContactsTableProps {
  contacts: Contact[];
  loading: boolean;
  onRowClick: (contact: Contact) => void;
  onToggleFavorite: (contact: Contact) => void;
  rowMenuItems: (contact: Contact) => RowMenuItem[];
}

const ContactsTable = ({
  contacts,
  loading,
  onRowClick,
  onToggleFavorite,
  rowMenuItems,
}: ContactsTableProps) => {
  return (
    <section className="card">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Contact</th>
              <th>Tags</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id} onClick={() => onRowClick(contact)}>
                <td onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className="icon-btn star-toggle"
                    onClick={() => onToggleFavorite(contact)}
                    aria-label="Toggle favorite"
                  >
                    <Star
                      size={15}
                      fill={contact.favorite ? "#f5b013" : "none"}
                      color={contact.favorite ? "#f5b013" : "#c3cad6"}
                    />
                  </button>
                </td>
                <td>
                  <span className={`initial ${colorFor(contact._id)}`}>
                    {initialsOf(contact.name)}
                  </span>
                  <div>
                    <b>{contact.name}</b>
                    <small>
                      {contact.title
                        ? `${contact.title} · ${contact.company}`
                        : contact.company}
                    </small>
                  </div>
                </td>
                <td>
                  {(contact.tags || []).map((tag) => (
                    <span className="pill" key={tag} style={{ marginRight: 4 }}>
                      {tag}
                    </span>
                  ))}
                </td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <RowMenu items={rowMenuItems(contact)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && contacts.length === 0 && (
          <p className="empty-state">No contacts match your search.</p>
        )}
      </div>
    </section>
  );
};

export default ContactsTable;
