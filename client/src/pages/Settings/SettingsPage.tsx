import { useSelector } from "react-redux";
import ProfileSettingsCard from "../../components/settings/ProfileSettingsCard";
import SecuritySettingsCard from "../../components/settings/SecuritySettingsCard";
import type { RootState } from "../../@types";
import AccountDangerZoneCard from "../../components/settings/AccountDangerZoneCard";

const SettingsPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="settings-page">
      <div className="settings-heading">
        <h1>Settings</h1>
        <p>Manage your account and integrations.</p>
      </div>

      <ProfileSettingsCard
        user={
          user
            ? {
                ...user,
                avatar:
                  typeof user.avatar === "string" ? user.avatar : undefined,
              }
            : null
        }
      />
      <SecuritySettingsCard />
      <AccountDangerZoneCard />
    </div>
  );
};

export default SettingsPage;
