import { Loader2, Mail, Save, UserRound } from "lucide-react";
import { useState, type FormEvent } from "react";
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

  async function save(event: FormEvent<HTMLFormElement>) {
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

  const isErrorState = saved.includes("Couldn't");

  return (
    <section className="flex flex-col gap-6 p-6 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-cyan-50 text-cyan-600 shrink-0">
          <UserRound size={20} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Profile
          </h2>
          <p className="text-xs font-medium text-slate-500">
            Update your personal information.
          </p>
        </div>
      </div>

      <form onSubmit={save} className="flex flex-col gap-5">
        {/* Profile Avatar Strip */}
        <div className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/60">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-600 text-white font-bold text-lg overflow-hidden shrink-0 shadow-sm">
            {form.avatar ? (
              <img
                src={form.avatar}
                alt={form.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{(form.name[0] || "A").toUpperCase()}</span>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <b className="text-sm font-semibold text-slate-900 truncate">
              {form.name || "Your Name"}
            </b>
            <p className="text-xs text-slate-500 truncate">
              {user?.email || "—"}
            </p>
          </div>
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Full name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
          />
        </div>

        {/* Two Column Grid: Company & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Company
            </label>
            <input
              type="text"
              placeholder="Your company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Email address
            </label>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-100/70 text-xs font-medium text-slate-500 cursor-not-allowed">
              <Mail size={16} className="text-slate-400 shrink-0" />
              <span className="truncate">{user?.email || "—"}</span>
            </div>
            <small className="text-[11px] text-slate-400 font-normal">
              Email can't be changed — contact support if needed.
            </small>
          </div>
        </div>

        {/* Avatar URL */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Avatar URL
          </label>
          <input
            type="url"
            placeholder="https://example.com/photo.jpg"
            value={form.avatar}
            onChange={(e) => setForm({ ...form, avatar: e.target.value })}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
          />
        </div>

        {/* Form Action Footer */}
        <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100">
          <div className="min-h-[20px]">
            {saved && (
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                  isErrorState
                    ? "text-red-600 bg-red-50 border border-red-200/60"
                    : "text-emerald-700 bg-emerald-50 border border-emerald-200/60"
                }`}
              >
                {saved}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 active:scale-95 text-white text-xs font-semibold shadow-xs shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                <Save size={16} />
                <span>Save changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
