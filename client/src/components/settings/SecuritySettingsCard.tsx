import { Loader2, LockKeyhole } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useUpdateUserPasswordMutation } from "../../redux/features/user/userApi";
import type { PasswordFormValues } from "../../@types/crm";

export default function SecuritySettingsCard() {
  const [passwordForm, setPasswordForm] = useState<PasswordFormValues>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [updateUserPassword, { isLoading: changingPassword }] =
    useUpdateUserPasswordMutation();

  async function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPasswordError("");
    setPasswordMessage("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New password and confirmation don't match.");
      return;
    }

    try {
      await updateUserPassword({
        oldPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      }).unwrap();
      setPasswordMessage("Password updated successfully");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: unknown) {
      const message =
        err &&
        typeof err === "object" &&
        "data" in err &&
        err.data &&
        typeof err.data === "object" &&
        "message" in err.data
          ? String((err.data as { message: unknown }).message)
          : "Couldn't update password.";
      setPasswordError(message);
    }
  }

  return (
    <section className="flex flex-col gap-6 p-6 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-cyan-50 text-cyan-600 shrink-0">
          <LockKeyhole size={20} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Security
          </h2>
          <p className="text-xs font-medium text-slate-500">
            Change your password.
          </p>
        </div>
      </div>

      <form onSubmit={updatePassword} className="flex flex-col gap-5">
        {/* Current Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Current password
          </label>
          <input
            type="password"
            placeholder="Current password"
            value={passwordForm.currentPassword}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                currentPassword: e.target.value,
              })
            }
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
          />
        </div>

        {/* Two Column Grid: New Password & Confirm Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">
              New password
            </label>
            <input
              type="password"
              placeholder="Min. 6 characters"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value,
                })
              }
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Confirm new password
            </label>
            <input
              type="password"
              placeholder="Re-enter password"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  confirmPassword: e.target.value,
                })
              }
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
            />
          </div>
        </div>

        {/* Error Alert */}
        {passwordError && (
          <p className="text-xs font-medium text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200/60 self-start">
            {passwordError}
          </p>
        )}

        {/* Form Action Footer */}
        <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100">
          <div className="min-h-[20px]">
            {passwordMessage && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md text-emerald-700 bg-emerald-50 border border-emerald-200/60">
                {passwordMessage}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={changingPassword}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 active:scale-95 text-white text-xs font-semibold shadow-xs shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            {changingPassword ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <span>Update password</span>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
