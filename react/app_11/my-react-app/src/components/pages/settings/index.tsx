import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setTimezone, setDateFormat } from "../../../store/slices/settingsSlice";
import type { TimezoneType } from "../../../store/slices/settingsSlice";
import styles from "./settings.module.css";

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  const [customFormat, setCustomFormat] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const handleTimezoneChange = (newTimezone: TimezoneType) => {
    dispatch(setTimezone(newTimezone));
  };

  const dateFormatPresets = [
    { label: "MM/DD/YYYY", value: "MM/DD/YYYY", example: "12/31/2024" },
    { label: "DD/MM/YYYY", value: "DD/MM/YYYY", example: "31/12/2024" },
    { label: "YYYY-MM-DD", value: "YYYY-MM-DD", example: "2024-12-31" },
  ];

  const handleDateFormatChange = (format: string) => {
    dispatch(setDateFormat(format));
    setIsCustom(false);
    setCustomFormat("");
  };

  const handleCustomFormatSubmit = () => {
    if (customFormat.trim()) {
      dispatch(setDateFormat(customFormat.trim()));
      setIsCustom(true);
    }
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
              settings.timezone === "UTC" ? styles.active : ""
            }`}
            onClick={() => handleTimezoneChange("UTC")}
          >
            <div className={styles.buttonContent}>
              <span className={styles.buttonTitle}>UTC</span>
              <span className={styles.buttonDescription}>
                Coordinated Universal Time
              </span>
            </div>
            {settings.timezone === "UTC" && (
              <span className={styles.checkmark}>✓</span>
            )}
          </button>

          <button
            className={`${styles.timezoneButton} ${
              settings.timezone === "Local" ? styles.active : ""
            }`}
            onClick={() => handleTimezoneChange("Local")}
          >
            <div className={styles.buttonContent}>
              <span className={styles.buttonTitle}>Local</span>
              <span className={styles.buttonDescription}>
                Your local timezone
              </span>
            </div>
            {settings.timezone === "Local" && (
              <span className={styles.checkmark}>✓</span>
            )}
          </button>
        </div>

        <div className={styles.currentSetting}>
          <strong>Current setting:</strong> {settings.timezone}
        </div>
      </div>

      <div className={styles.settingSection}>
        <h2>Date Format Settings</h2>
        <p className={styles.description}>
          Choose how dates are formatted throughout the application.
        </p>

        <div className={styles.dateFormatOptions}>
          {dateFormatPresets.map((preset) => (
            <button
              key={preset.value}
              className={`${styles.dateFormatButton} ${
                settings.dateFormat === preset.value && !isCustom
                  ? styles.active
                  : ""
              }`}
              onClick={() => handleDateFormatChange(preset.value)}
            >
              <div className={styles.buttonContent}>
                <span className={styles.buttonTitle}>{preset.label}</span>
                <span className={styles.buttonDescription}>
                  Example: {preset.example}
                </span>
              </div>
              {settings.dateFormat === preset.value && !isCustom && (
                <span className={styles.checkmark}>✓</span>
              )}
            </button>
          ))}
        </div>

        <div className={styles.customFormatSection}>
          <h3>Custom Format</h3>
          <p className={styles.customDescription}>
            Enter your own date format pattern (e.g., DD-MM-YYYY, YYYY/MM/DD)
          </p>
          <div className={styles.customInputGroup}>
            <input
              type="text"
              className={styles.customInput}
              placeholder="Enter custom format..."
              value={customFormat}
              onChange={(e) => setCustomFormat(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleCustomFormatSubmit();
                }
              }}
            />
            <button
              className={styles.customSubmitButton}
              onClick={handleCustomFormatSubmit}
              disabled={!customFormat.trim()}
            >
              Apply
            </button>
          </div>
        </div>

        <div className={styles.currentSetting}>
          <strong>Current format:</strong> {settings.dateFormat}
          {isCustom && <span className={styles.customBadge}> (Custom)</span>}
        </div>
      </div>
    </div>
  );
}
