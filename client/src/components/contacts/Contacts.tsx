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
import type { ContactsView, RowMenuItem } from "./types";
import ContactModal from "../ui/ContactModal";
import ContactDrawer from "../ui/ContactDrawer";

export default function Contacts() {
  const { data, isLoading } = useGetContactsQuery();
  const [createContact] = useCreateContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  const contacts = data?.contacts ?? [];

  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [view, setView] = useState<ContactsView>("grid");
  const [modalContact, setModalContact] = useState<Contact | undefined>(
    undefined,
  );
  const [showModal, setShowModal] = useState(false);
  const [activeContactId, setActiveContactId] = useState<string | null>(null);

  // Derived from the fetched list rather than held as its own copy, so any
  // cache update — an edit, a favorite toggle, an optimistic patch — shows
  // up in the drawer automatically instead of needing manual syncing.
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
      return a.name.localeCompare(b.name);
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
      { label: "Edit", onClick: () => openEdit(contact) },
      { label: "Delete", onClick: () => handleDelete(contact), danger: true },
    ];
  }

  return (
    <div className="simple-page" style={{ maxWidth: "1320px" }}>
      {showModal && (
        <ContactModal
          contact={modalContact}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
      {activeContact && (
        <ContactDrawer
          contact={activeContact}
          onClose={() => setActiveContactId(null)}
          onEdit={openEdit}
          onDelete={handleDelete}
          onToggleFavorite={toggleFavorite}
        />
      )}

      <ContactsHeader onAddContact={openCreate} />

      <ContactsStatsRow stats={stats} />

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
