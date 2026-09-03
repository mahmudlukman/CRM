import { Star, Loader2, UserX } from "lucide-react";
import type { Contact } from "../../@types/crm";
import { colorFor, initialsOf } from "../../utils/leadHelpers";
import RowMenu, { type RowMenuItem } from "../ui/RowMenu";

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
    <section className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/50 text-slate-500 font-semibold uppercase tracking-wider">
              <th className="py-3.5 pl-4 pr-2 w-10"></th>
              <th className="py-3.5 px-3">Contact</th>
              <th className="py-3.5 px-3">Tags</th>
              <th className="py-3.5 px-3">Email</th>
              <th className="py-3.5 px-3">Phone</th>
              <th className="py-3.5 pr-4 pl-2 w-10 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {contacts.map((contact) => (
              <tr
                key={contact._id}
                onClick={() => onRowClick(contact)}
                className="group cursor-pointer transition-colors hover:bg-slate-50/80"
              >
                {/* Favorite Star Action */}
                <td
                  className="py-3 pl-4 pr-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(contact)}
                    aria-label="Toggle favorite"
                    className="p-1 rounded-lg hover:bg-slate-100 transition-all text-slate-300 hover:text-amber-400 focus:outline-none"
                  >
                    <Star
                      size={16}
                      className={`transition-transform active:scale-125 ${
                        contact.favorite
                          ? "fill-amber-400 text-amber-400"
                          : "fill-transparent text-slate-300 group-hover:text-slate-400"
                      }`}
                    />
                  </button>
                </td>

                {/* Contact Avatar & Info */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-xs ${colorFor(
                        contact._id,
                      )}`}
                    >
                      {initialsOf(contact.name)}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-slate-900 truncate">
                        {contact.name}
                      </span>
                      <small className="text-[11px] font-normal text-slate-400 truncate">
                        {contact.title
                          ? `${contact.title} · ${contact.company}`
                          : contact.company || "No company"}
                      </small>
                    </div>
                  </div>
                </td>

                {/* Tags / Pills */}
                <td className="py-3 px-3">
                  <div className="flex flex-wrap gap-1">
                    {(contact.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Email Column */}
                <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                  {contact.email || "—"}
                </td>

                {/* Phone Column */}
                <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                  {contact.phone || "—"}
                </td>

                {/* Row Context Menu */}
                <td
                  className="py-3 pr-4 pl-2 text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <RowMenu items={rowMenuItems(contact)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Loading Spinner State */}
        {loading && (
          <div className="flex items-center justify-center gap-2 py-12 text-slate-400">
            <Loader2 size={18} className="animate-spin text-cyan-600" />
            <span className="text-xs font-medium">Loading contacts...</span>
          </div>
        )}

        {/* Empty State */}
        {!loading && contacts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3">
              <UserX size={22} />
            </div>
            <p className="text-sm font-semibold text-slate-700">
              No contacts found
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              No contacts match your current search or filter criteria. Try
              adjusting your search term or tag filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactsTable;
