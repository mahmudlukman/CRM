import { Mail, Save, UserRound } from "lucide-react";
import { useState } from "react";
import { useUpdateUserProfileMutation } from "../../redux/features/user/userApi";
import type { ProfileFormValues, SettingsUser } from "../../@types/crm";

interface ProfileSettingsCardProps {
  user: SettingsUser | null | undefined;
}

export default function ProfileSettingsCard({
  user,
}: ProfileSettingsCardProps) {
  const [form, setForm] = useState<ProfileFormValues>({
    name: user?.name || "",
    company: user?.company || "",
    avatar: user?.avatar || "",
  });
  const [saved, setSaved] = useState("");
  const [updateUserProfile, { isLoading: saving }] =
    useUpdateUserProfileMutation();

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved("");
    try {
      await updateUserProfile({
        data: { name: form.name, company: form.company, avatar: form.avatar },
      }).unwrap();
      setSaved("Changes saved");
    } catch {
      setSaved("Couldn't save changes. Please try again.");
    }
  }

  return (
    <section className="settings-card">
      <div className="section-title">
        <span className="soft-icon">
          <UserRound size={20} />
        </span>
        <div>
          <h2>Profile</h2>
          <p>Update your personal information.</p>
        </div>
      </div>

      <form onSubmit={save}>
        <div className="profile-strip">
          <span>{form.name[0] || "A"}</span>
          <div>
            <b>{form.name}</b>
            <p>{user?.email || "—"}</p>
          </div>
        </div>

        <label>Full name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <div className="two-col">
          <div>
            <label>Company</label>
            <input
              placeholder="Your company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
          </div>
          <div>
            <label>Email address</label>
            <div className="disabled-input">
              <Mail size={17} /> {user?.email || "—"}
            </div>
            <small>Email can't be changed — contact support if needed.</small>
          </div>
        </div>

        <label>Avatar URL</label>
        <input
          placeholder="https://example.com/photo.jpg"
          value={form.avatar}
          onChange={(e) => setForm({ ...form, avatar: e.target.value })}
        />

        <div className="form-footer">
          {saved && <span>{saved}</span>}
          <button className="primary-button small" disabled={saving}>
            {saving ? (
              <span className="spinner dark" />
            ) : (
              <>
                <Save size={17} /> Save changes
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
