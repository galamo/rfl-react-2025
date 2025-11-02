import { useSettings } from "../../../context/hook";
import type { TimezoneType } from "../../../context/SettingsContext";
import styles from "./settings.module.css";

export default function SettingsPage() {
  const { timezone, setTimezone } = useSettings();

  const handleTimezoneChange = (newTimezone: TimezoneType) => {
    setTimezone(newTimezone);
  };

  return (
    <div className={styles.container}>
      <h1>Settings</h1>

      <div className={styles.settingSection}>
        <h2>Timezone Settings</h2>
        <p className={styles.description}>
          Choose how dates and times are displayed throughout the application.
        </p>

        <div className={styles.timezoneOptions}>
          <button
            className={`${styles.timezoneButton} ${
              timezone === "UTC" ? styles.active : ""
            }`}
            onClick={() => handleTimezoneChange("UTC")}
          >
            <div className={styles.buttonContent}>
              <span className={styles.buttonTitle}>UTC</span>
              <span className={styles.buttonDescription}>
                Coordinated Universal Time
              </span>
            </div>
            {timezone === "UTC" && <span className={styles.checkmark}>✓</span>}
          </button>

          <button
            className={`${styles.timezoneButton} ${
              timezone === "Local" ? styles.active : ""
            }`}
            onClick={() => handleTimezoneChange("Local")}
          >
            <div className={styles.buttonContent}>
              <span className={styles.buttonTitle}>Local</span>
              <span className={styles.buttonDescription}>
                Your local timezone
              </span>
            </div>
            {timezone === "Local" && (
              <span className={styles.checkmark}>✓</span>
            )}
          </button>
        </div>

        <div className={styles.currentSetting}>
          <strong>Current setting:</strong> {timezone}
        </div>
      </div>
    </div>
  );
}
