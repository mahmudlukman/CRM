import { AlertTriangle, Ban, Loader2, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeactivateAccountMutation,
  useDeleteAccountMutation,
} from "../../redux/features/user/userApi";
import { useLogoutMutation } from "../../redux/features/auth/authApi";

const AccountDangerZoneCard = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const [deactivateAccount, { isLoading: deactivating }] =
    useDeactivateAccountMutation();
  const [deleteAccount, { isLoading: deleting }] = useDeleteAccountMutation();

  const [deactivatePassword, setDeactivatePassword] = useState("");
  const [deactivateError, setDeactivateError] = useState("");

  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const handleDeactivate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDeactivateError("");

    if (!deactivatePassword) {
      setDeactivateError("Enter your password to confirm.");
      return;
    }

    try {
      await deactivateAccount({ password: deactivatePassword }).unwrap();
      await logout()
        .unwrap()
        .catch(() => {});
      navigate("/login");
    } catch (err: unknown) {
      setDeactivateError(
        extractErrorMessage(err, "Couldn't deactivate account."),
      );
    }
  };

  const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDeleteError("");

    if (!deletePassword) {
      setDeleteError("Enter your password to confirm.");
      return;
    }

    if (!confirmingDelete) {
      setConfirmingDelete(true);
      return;
    }

    try {
      await deleteAccount({ password: deletePassword }).unwrap();
      await logout()
        .unwrap()
        .catch(() => {});
      navigate("/login");
    } catch (err: unknown) {
      setDeleteError(extractErrorMessage(err, "Couldn't delete account."));
      setConfirmingDelete(false);
    }
  };

  return (
    <section className="flex flex-col gap-6 p-6 rounded-2xl border border-red-200/80 bg-red-50/30 backdrop-blur-xl">
      {/* Card Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-red-100 text-red-600 shrink-0">
          <AlertTriangle size={20} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Danger zone
          </h2>
          <p className="text-xs font-medium text-slate-500">
            Deactivate or permanently delete your account.
          </p>
        </div>
      </div>

      {/* Action Row: Deactivate */}
      <div className="flex flex-col pt-4 border-t border-red-200/60 gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5 max-w-md">
            <strong className="text-sm font-semibold text-slate-900">
              Deactivate account
            </strong>
            <p className="text-xs text-slate-500 leading-relaxed">
              Temporarily disable your account. You can reactivate it later by
              signing back in.
            </p>
          </div>

          <form
            onSubmit={handleDeactivate}
            className="flex items-center gap-2.5 sm:w-auto"
          >
            <input
              type="password"
              placeholder="Current password"
              value={deactivatePassword}
              onChange={(e) => setDeactivatePassword(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all w-48"
            />
            <button
              type="submit"
              disabled={deactivating}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 active:scale-95 text-xs font-semibold text-slate-700 shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
            >
              {deactivating ? (
                <Loader2 size={16} className="animate-spin text-slate-500" />
              ) : (
                <>
                  <Ban size={16} className="text-amber-600" />
                  <span>Deactivate</span>
                </>
              )}
            </button>
          </form>
        </div>

        {deactivateError && (
          <p className="text-xs font-medium text-red-600 bg-red-100/60 px-3 py-2 rounded-lg border border-red-200 self-start">
            {deactivateError}
          </p>
        )}
      </div>

      {/* Action Row: Permanent Delete */}
      <div className="flex flex-col pt-4 border-t border-red-200/60 gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5 max-w-md">
            <strong className="text-sm font-semibold text-slate-900">
              Delete account
            </strong>
            <p className="text-xs text-slate-500 leading-relaxed">
              Permanently delete your account and all associated data. This
              can't be undone.
            </p>
          </div>

          <form
            onSubmit={handleDelete}
            className="flex items-center gap-2.5 sm:w-auto"
          >
            <input
              type="password"
              placeholder="Current password"
              value={deletePassword}
              onChange={(e) => {
                setDeletePassword(e.target.value);
                setConfirmingDelete(false);
              }}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all w-48"
            />
            <button
              type="submit"
              disabled={deleting}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0 ${
                confirmingDelete
                  ? "bg-red-700 hover:bg-red-800 ring-2 ring-red-400/50 animate-pulse"
                  : "bg-red-600 hover:bg-red-700 active:scale-95 shadow-red-500/20"
              }`}
            >
              {deleting ? (
                <Loader2 size={16} className="animate-spin text-white" />
              ) : (
                <>
                  <Trash2 size={16} />
                  <span>
                    {confirmingDelete ? "Confirm delete" : "Delete account"}
                  </span>
                </>
              )}
            </button>
          </form>
        </div>

        {confirmingDelete && !deleteError && (
          <p className="text-xs font-medium text-red-700 bg-red-100/80 px-3 py-2 rounded-lg border border-red-300 self-start animate-fade-in">
            This is permanent. Click "Confirm delete" again to proceed.
          </p>
        )}
        {deleteError && (
          <p className="text-xs font-medium text-red-600 bg-red-100/60 px-3 py-2 rounded-lg border border-red-200 self-start">
            {deleteError}
          </p>
        )}
      </div>
    </section>
  );
};

export default AccountDangerZoneCard;

const extractErrorMessage = (err: unknown, fallback: string): string => {
  if (
    err &&
    typeof err === "object" &&
    "data" in err &&
    err.data &&
    typeof err.data === "object" &&
    "message" in err.data
  ) {
    return String((err.data as { message: unknown }).message);
  }
  return fallback;
};
