import { Mail, Phone, Star } from "lucide-react";
import type { Contact } from "../../@types/crm";
import { colorFor, initialsOf } from "../../utils/leadHelpers";
import RowMenu, { type RowMenuItem } from "../ui/RowMenu";

interface ContactsGridProps {
  contacts: Contact[];
  loading: boolean;
  onCardClick: (contact: Contact) => void;
  onToggleFavorite: (contact: Contact) => void;
  rowMenuItems: (contact: Contact) => RowMenuItem[];
}

const ContactsGrid = ({
  contacts,
  loading,
  onCardClick,
  onToggleFavorite,
  rowMenuItems,
}: ContactsGridProps) => {
  return (
    <div className="contact-grid">
      {contacts.map((contact) => (
        <section
          className="card contact-card-rich"
          key={contact._id}
          onClick={() => onCardClick(contact)}
        >
          <div className="contact-card-head">
            <div className="flex items-center gap-3">
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
            </div>
            <div
              className="contact-card-actions"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="icon-btn star-toggle"
                onClick={() => onToggleFavorite(contact)}
                aria-label="Toggle favorite"
              >
                <Star
                  size={16}
                  fill={contact.favorite ? "#f5b013" : "none"}
                  color={contact.favorite ? "#f5b013" : "#c3cad6"}
                />
              </button>
              <RowMenu items={rowMenuItems(contact)} />
            </div>
          </div>
          {contact.tags?.length > 0 && (
            <div className="contact-tags">
              {contact.tags.map((tag) => (
                <span className="pill" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="contact-card-info">
            {contact.email && (
              <div>
                <Mail size={14} /> {contact.email}
              </div>
            )}
            {contact.phone && (
              <div>
                <Phone size={14} /> {contact.phone}
              </div>
            )}
          </div>
        </section>
      ))}
      {!loading && contacts.length === 0 && (
        <p className="empty-state">No contacts match your search.</p>
      )}
    </div>
  );
};

export default ContactsGrid;
