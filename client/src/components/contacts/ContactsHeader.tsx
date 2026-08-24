import { Plus } from "lucide-react";

interface ContactsHeaderProps {
  onAddContact: () => void;
}

const ContactsHeader = ({ onAddContact }: ContactsHeaderProps) => {
  return (
    <div className="page-heading">
      <div>
        <h1>Contacts</h1>
        <p className="card-subtitle">
          Your people and professional relationships.
        </p>
      </div>
      <button className="primary-button small" onClick={onAddContact}>
        <Plus size={18} /> Add contact
      </button>
    </div>
  );
};

export default ContactsHeader;
