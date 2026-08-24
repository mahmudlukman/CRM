import { Building2, Mail, Pencil, Phone, Star, Trash2, X } from "lucide-react";
import type { Contact } from "../../@types/crm";

interface ContactDrawerProps {
  contact: Contact;
  onClose: () => void;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void | Promise<void>;
  onToggleFavorite: (contact: Contact) => void | Promise<void>;
}

function initialsOf(name = ""): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

const ContactDrawer = ({
  contact,
  onClose,
  onEdit,
  onDelete,
  onToggleFavorite,
}: ContactDrawerProps) => {
  const formattedDate = contact.createdAt
    ? new Date(contact.createdAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Unknown";

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside className="drawer" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-header">
          <h2>Contact details</h2>

          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          <div className="drawer-identity">
            <span className="initial sky drawer-avatar">
              {initialsOf(contact.name)}
            </span>

            <div>
              <b className="flex items-center gap-2">
                {contact.name}

                <button
                  type="button"
                  className="star-toggle"
                  onClick={() => onToggleFavorite(contact)}
                  aria-label={
                    contact.favorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <Star
                    size={16}
                    fill={contact.favorite ? "#f5b013" : "none"}
                    color={contact.favorite ? "#f5b013" : "#c3cad6"}
                  />
                </button>
              </b>

              <p>
                {contact.title
                  ? `${contact.title} · ${contact.company}`
                  : contact.company}
              </p>
            </div>
          </div>

          {contact.favorite && (
            <span className="badge favorite-badge">Favorite</span>
          )}

          <div className="drawer-contact-list">
            {contact.email && (
              <div>
                <Mail size={16} />
                {contact.email}
              </div>
            )}

            {contact.phone && (
              <div>
                <Phone size={16} />
                {contact.phone}
              </div>
            )}

            <div>
              <Building2 size={16} />
              {contact.company}
            </div>
          </div>

          {contact.tags && contact.tags.length > 0 && (
            <div className="drawer-notes">
              <span>Tags</span>

              <div className="drawer-badges">
                {contact.tags.map((tag) => (
                  <span className="pill" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="drawer-notes">
            <span>Notes</span>

            <p>{contact.notes || "No notes yet."}</p>
          </div>

          <div className="drawer-actions">
            <button
              type="button"
              className="outline-button"
              onClick={() => onEdit(contact)}
            >
              <Pencil size={16} />
              Edit
            </button>

            <button
              type="button"
              className="danger-button"
              onClick={() => onDelete(contact)}
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>

          <p className="drawer-footer-note">Added {formattedDate}</p>
        </div>
      </aside>
    </div>
  );
};

export default ContactDrawer;
