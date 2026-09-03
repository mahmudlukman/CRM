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
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end transition-opacity duration-200"
      onClick={onClose}
    >
      <aside
        className="w-full max-w-md h-full bg-white/90 backdrop-blur-xl border-l border-slate-200/80 shadow-2xl flex flex-col justify-between overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Contact details
            </h2>

            <button
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100/80 transition-colors"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 space-y-6">
            {/* Identity & Avatar */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 font-bold text-lg flex items-center justify-center shrink-0 shadow-xs">
                {initialsOf(contact.name)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-lg leading-tight">
                    {contact.name}
                  </span>

                  <button
                    type="button"
                    className="p-1 text-slate-300 hover:text-amber-400 transition-colors"
                    onClick={() => onToggleFavorite(contact)}
                    aria-label={
                      contact.favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    <Star
                      size={18}
                      className={
                        contact.favorite
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      }
                    />
                  </button>
                </div>

                <p className="text-xs text-slate-500 font-medium">
                  {contact.title
                    ? `${contact.title} · ${contact.company}`
                    : contact.company}
                </p>
              </div>
            </div>

            {/* Favorite Badge */}
            {contact.favorite && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 border border-amber-200/60 text-amber-700">
                Favorite
              </span>
            )}

            {/* Contact Information List */}
            <div className="space-y-3 p-4 rounded-xl bg-slate-50/80 border border-slate-100 text-sm text-slate-700">
              {contact.email && (
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-slate-400 shrink-0" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-cyan-600 transition-colors truncate"
                  >
                    {contact.email}
                  </a>
                </div>
              )}

              {contact.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-slate-400 shrink-0" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="hover:text-cyan-600 transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              )}

              {contact.company && (
                <div className="flex items-center gap-3">
                  <Building2 size={16} className="text-slate-400 shrink-0" />
                  <span>{contact.company}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {contact.tags && contact.tags.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Tags
                </span>

                <div className="flex flex-wrap gap-1.5">
                  {contact.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200/60 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Notes
              </span>

              <p className="text-sm text-slate-600 leading-relaxed p-3.5 rounded-xl bg-slate-50/50 border border-slate-100">
                {contact.notes || "No notes yet."}
              </p>
            </div>
          </div>
        </div>

        {/* Drawer Actions & Footer */}
        <div className="p-6 border-t border-slate-100 space-y-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors shadow-xs"
              onClick={() => onEdit(contact)}
            >
              <Pencil size={16} />
              Edit
            </button>

            <button
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-rose-100 bg-rose-50/50 hover:bg-rose-100/60 text-rose-600 text-sm font-semibold transition-colors"
              onClick={() => onDelete(contact)}
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>

          <p className="text-center text-xs text-slate-400">
            Added {formattedDate}
          </p>
        </div>
      </aside>
    </div>
  );
};

export default ContactDrawer;
