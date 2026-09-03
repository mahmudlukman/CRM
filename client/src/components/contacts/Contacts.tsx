import { useMemo, useState } from "react";
import type { Contact, ContactPayload } from "../../@types/crm";
import {
  useCreateContactMutation,
  useDeleteContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
} from "../../redux/features/contact/contactApi";
import {
  computeContactStats,
  computeTagCounts,
} from "../../utils/contactHelpers";
import ContactsGrid from "./ContactsGrid";
import ContactsHeader from "./ContactsHeader";
import ContactsStatsRow from "./ContactsStatsRow";
import ContactsTable from "./ContactsTable";
import ContactsToolbar from "./ContactsToolbar";
import type { ContactsView } from "./types";
import ContactModal from "../ui/ContactModal";
import ContactDrawer from "../ui/ContactDrawer";
import type { RowMenuItem } from "../ui/RowMenu";
import { Pencil, Trash2 } from "lucide-react";

export default function Contacts() {
  const { data, isLoading } = useGetContactsQuery();
  const [createContact] = useCreateContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  const fetchedContacts = data?.contacts;
  const contacts = useMemo(() => fetchedContacts ?? [], [fetchedContacts]);

  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [view, setView] = useState<ContactsView>("grid");
  const [modalContact, setModalContact] = useState<Contact | undefined>(
    undefined,
  );
  const [showModal, setShowModal] = useState(false);
  const [activeContactId, setActiveContactId] = useState<string | null>(null);

  const activeContact = useMemo(
    () => contacts.find((c) => c._id === activeContactId) ?? null,
    [contacts, activeContactId],
  );

  const tagCounts = useMemo(() => computeTagCounts(contacts), [contacts]);
  const sortedTags = useMemo(() => Object.keys(tagCounts).sort(), [tagCounts]);
  const stats = useMemo(() => computeContactStats(contacts), [contacts]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = contacts;
    if (tagFilter)
      list = list.filter((c) => (c.tags || []).includes(tagFilter));
    if (q) {
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q) ||
          (c.email || "").toLowerCase().includes(q),
      );
    }
    return [...list].sort((a, b) => {
      if (!!b.favorite !== !!a.favorite) return b.favorite ? 1 : -1;
      return a.name.localeCompare(a.name);
    });
  }, [contacts, search, tagFilter]);

  function openCreate() {
    setModalContact(undefined);
    setShowModal(true);
  }

  function openEdit(contact: Contact) {
    setModalContact(contact);
    setShowModal(true);
  }

  async function handleSubmit(payload: ContactPayload) {
    if (modalContact) {
      await updateContact({ id: modalContact._id, data: payload }).unwrap();
    } else {
      await createContact(payload).unwrap();
    }
  }

  async function handleDelete(contact: Contact) {
    if (!window.confirm(`Delete ${contact.name}? This can't be undone.`))
      return;
    await deleteContact(contact._id).unwrap();
    if (activeContactId === contact._id) setActiveContactId(null);
  }

  // updateContact's onQueryStarted (in contactsApi.ts) patches the
  // getContacts cache optimistically, so the star flips instantly — in the
  // grid/table and in the derived activeContact above — without any local
  // state here to fake it.
  function toggleFavorite(contact: Contact) {
    updateContact({ id: contact._id, data: { favorite: !contact.favorite } });
  }

  function rowMenuItems(contact: Contact): RowMenuItem[] {
    return [
      {
        label: "Edit",
        icon: <Pencil size={16} />,
        onClick: () => openEdit(contact),
      },
      {
        label: "Delete",
        icon: <Trash2 size={16} />,
        onClick: () => handleDelete(contact),
        danger: true,
      },
    ];
  }

  return (
    <div className="mx-auto w-full max-w-[1320px] p-4 sm:p-6 lg:p-8 flex flex-col gap-6 font-sans">
      {/* Contact Form Modal */}
      {showModal && (
        <ContactModal
          contact={modalContact}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}

      {/* Detail View Drawer */}
      {activeContact && (
        <ContactDrawer
          contact={activeContact}
          onClose={() => setActiveContactId(null)}
          onEdit={openEdit}
          onDelete={handleDelete}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {/* Header section with title and CTA */}
      <ContactsHeader onAddContact={openCreate} />

      {/* Stat indicators card grid */}
      <ContactsStatsRow stats={stats} />

      {/* Search and Tag filter toolbar */}
      <ContactsToolbar
        search={search}
        onSearchChange={setSearch}
        tagFilter={tagFilter}
        onTagFilterChange={setTagFilter}
        sortedTags={sortedTags}
        tagCounts={tagCounts}
        totalContacts={contacts.length}
        filteredCount={filtered.length}
        view={view}
        onViewChange={setView}
      />

      {/* View Switcher: Grid vs Table */}
      {view === "grid" ? (
        <ContactsGrid
          contacts={filtered}
          loading={isLoading}
          onCardClick={(contact) => setActiveContactId(contact._id)}
          onToggleFavorite={toggleFavorite}
          rowMenuItems={rowMenuItems}
        />
      ) : (
        <ContactsTable
          contacts={filtered}
          loading={isLoading}
          onRowClick={(contact) => setActiveContactId(contact._id)}
          onToggleFavorite={toggleFavorite}
          rowMenuItems={rowMenuItems}
        />
      )}
    </div>
  );
}
