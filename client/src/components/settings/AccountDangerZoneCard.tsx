import { AlertTriangle, Ban, Trash2 } from "lucide-react";
import { useState } from "react";
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

  const handleDeactivate = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDeactivateError("");

    if (!deactivatePassword) {
      setDeactivateError("Enter your password to confirm.");
      return;
    }

    try {
      await deactivateAccount({ password: deactivatePassword }).unwrap();
      await logout({})
        .unwrap()
        .catch(() => {});
      navigate("/login");
    } catch (err: unknown) {
      setDeactivateError(
        extractErrorMessage(err, "Couldn't deactivate account."),
      );
    }
  };

  const handleDelete = async (e: React.SubmitEvent<HTMLFormElement>) => {
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
      await logout({})
        .unwrap()
        .catch(() => {});
      navigate("/login");
    } catch (err: unknown) {
      setDeleteError(extractErrorMessage(err, "Couldn't delete account."));
      setConfirmingDelete(false);
    }
  };

  return (
    <section className="settings-card danger-zone">
      <div className="section-title">
        <span className="soft-icon danger">
          <AlertTriangle size={20} />
        </span>
        <div>
          <h2>Danger zone</h2>
          <p>Deactivate or permanently delete your account.</p>
        </div>
      </div>

      <div className="danger-zone-row">
        <div className="danger-zone-copy">
          <b>Deactivate account</b>
          <p>
            Temporarily disable your account. You can reactivate it later by
            signing back in.
          </p>
        </div>

        <form onSubmit={handleDeactivate} className="danger-zone-form">
          <input
            type="password"
            placeholder="Current password"
            value={deactivatePassword}
            onChange={(e) => setDeactivatePassword(e.target.value)}
          />
          <button
            type="submit"
            className="outline-button"
            disabled={deactivating}
          >
            {deactivating ? (
              <span className="spinner dark" />
            ) : (
              <>
                <Ban size={16} /> Deactivate
              </>
            )}
          </button>
        </form>
      </div>
      {deactivateError && <p className="modal-error">{deactivateError}</p>}

      <div className="danger-zone-row">
        <div className="danger-zone-copy">
          <b>Delete account</b>
          <p>
            Permanently delete your account and all associated data. This can't
            be undone.
          </p>
        </div>

        <form onSubmit={handleDelete} className="danger-zone-form">
          <input
            type="password"
            placeholder="Current password"
            value={deletePassword}
            onChange={(e) => {
              setDeletePassword(e.target.value);
              setConfirmingDelete(false);
            }}
          />
          <button type="submit" className="danger-button" disabled={deleting}>
            {deleting ? (
              <span className="spinner dark" />
            ) : (
              <>
                <Trash2 size={16} />
                {confirmingDelete ? "Confirm delete" : "Delete account"}
              </>
            )}
          </button>
        </form>
      </div>
      {confirmingDelete && !deleteError && (
        <p className="modal-error">
          This is permanent. Click "Confirm delete" again to proceed.
        </p>
      )}
      {deleteError && <p className="modal-error">{deleteError}</p>}
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
