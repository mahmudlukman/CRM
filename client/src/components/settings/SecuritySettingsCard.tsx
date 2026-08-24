import { LockKeyhole } from "lucide-react";
import { useState } from "react";
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

  async function updatePassword(event: React.FormEvent<HTMLFormElement>) {
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
      setPasswordMessage("Password updated");
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
    <section className="settings-card">
      <div className="section-title">
        <span className="soft-icon">
          <LockKeyhole size={20} />
        </span>
        <div>
          <h2>Security</h2>
          <p>Change your password.</p>
        </div>
      </div>

      <form onSubmit={updatePassword}>
        <label>Current password</label>
        <input
          placeholder="Current password"
          type="password"
          value={passwordForm.currentPassword}
          onChange={(e) =>
            setPasswordForm({
              ...passwordForm,
              currentPassword: e.target.value,
            })
          }
        />

        <div className="two-col">
          <div>
            <label>New password</label>
            <input
              placeholder="Min. 6 characters"
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Confirm new password</label>
            <input
              placeholder="Re-enter password"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>
        </div>

        {passwordError && <p className="modal-error">{passwordError}</p>}

        <div className="form-footer">
          {passwordMessage && <span>{passwordMessage}</span>}
          <button
            type="submit"
            className="primary-button small"
            disabled={changingPassword}
          >
            {changingPassword ? (
              <span className="spinner dark" />
            ) : (
              "Update password"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
