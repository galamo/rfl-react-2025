import { useState } from "react";
import { useSettings } from "../../../context/hook";
import type { TimezoneType } from "../../../context/SettingsContext";
import styles from "./settings.module.css";

export default function SettingsPage() {
  const { state, dispatch } = useSettings();
  const [customFormat, setCustomFormat] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [customLimit, setCustomLimit] = useState("");
  const [isCustomLimit, setIsCustomLimit] = useState(false);

  const handleTimezoneChange = (newTimezone: TimezoneType) => {
    dispatch({ type: "SET_TIMEZONE", payload: newTimezone });
  };

  const dateFormatPresets = [
    { label: "MM/DD/YYYY", value: "MM/DD/YYYY", example: "12/31/2024" },
    { label: "DD/MM/YYYY", value: "DD/MM/YYYY", example: "31/12/2024" },
    { label: "YYYY-MM-DD", value: "YYYY-MM-DD", example: "2024-12-31" },
  ];

  const handleDateFormatChange = (format: string) => {
    dispatch({ type: "SET_DATE_FORMAT", payload: format });
    setIsCustom(false);
    setCustomFormat("");
  };

  const handleCustomFormatSubmit = () => {
    if (customFormat.trim()) {
      dispatch({ type: "SET_DATE_FORMAT", payload: customFormat.trim() });
      setIsCustom(true);
    }
  };

  const handleExpenseLimitChange = (limit: number) => {
    dispatch({ type: "SET_EXPENSE_LIMIT", payload: limit });
    setIsCustomLimit(false);
    setCustomLimit("");
  };

  const handleCustomLimitSubmit = () => {
    const value = parseInt(customLimit, 10);
    if (!isNaN(value) && value >= 1) {
      dispatch({ type: "SET_EXPENSE_LIMIT", payload: value });
      setIsCustomLimit(true);
    }
  };

  const expenseLimitPresets = [5, 10, 15, 20, 25, 50];

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
              state.timezone === "UTC" ? styles.active : ""
            }`}
            onClick={() => handleTimezoneChange("UTC")}
          >
            <div className={styles.buttonContent}>
              <span className={styles.buttonTitle}>UTC</span>
              <span className={styles.buttonDescription}>
                Coordinated Universal Time
              </span>
            </div>
            {state.timezone === "UTC" && (
              <span className={styles.checkmark}>✓</span>
            )}
          </button>

          <button
            className={`${styles.timezoneButton} ${
              state.timezone === "Local" ? styles.active : ""
            }`}
            onClick={() => handleTimezoneChange("Local")}
          >
            <div className={styles.buttonContent}>
              <span className={styles.buttonTitle}>Local</span>
              <span className={styles.buttonDescription}>
                Your local timezone
              </span>
            </div>
            {state.timezone === "Local" && (
              <span className={styles.checkmark}>✓</span>
            )}
          </button>
        </div>

        <div className={styles.currentSetting}>
          <strong>Current setting:</strong> {state.timezone}
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
                state.dateFormat === preset.value && !isCustom
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
              {state.dateFormat === preset.value && !isCustom && (
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
          <strong>Current format:</strong> {state.dateFormat}
          {isCustom && <span className={styles.customBadge}> (Custom)</span>}
        </div>
      </div>

      <div className={styles.settingSection}>
        <h2>Expense Limit Settings</h2>
        <p className={styles.description}>
          Set the maximum number of expenses to display in the expenses table.
        </p>

        <div className={styles.expenseLimitOptions}>
          {expenseLimitPresets.map((limit) => (
            <button
              key={limit}
              className={`${styles.limitButton} ${
                state.expenseLimit === limit && !isCustomLimit
                  ? styles.active
                  : ""
              }`}
              onClick={() => handleExpenseLimitChange(limit)}
            >
              <div className={styles.buttonContent}>
                <span className={styles.buttonTitle}>{limit}</span>
                <span className={styles.buttonDescription}>
                  {limit === 1 ? "expense" : "expenses"}
                </span>
              </div>
              {state.expenseLimit === limit && !isCustomLimit && (
                <span className={styles.checkmark}>✓</span>
              )}
            </button>
          ))}
        </div>

        <div className={styles.customFormatSection}>
          <h3>Custom Limit</h3>
          <p className={styles.customDescription}>
            Enter a custom expense limit (minimum: 1)
          </p>
          <div className={styles.customInputGroup}>
            <input
              type="number"
              min="1"
              className={styles.customInput}
              placeholder="Enter custom limit..."
              value={customLimit}
              onChange={(e) => setCustomLimit(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleCustomLimitSubmit();
                }
              }}
            />
            <button
              className={styles.customSubmitButton}
              onClick={handleCustomLimitSubmit}
              disabled={!customLimit.trim() || isNaN(parseInt(customLimit, 10)) || parseInt(customLimit, 10) < 1}
            >
              Apply
            </button>
          </div>
        </div>

        <div className={styles.currentSetting}>
          <strong>Current limit:</strong> {state.expenseLimit}{" "}
          {state.expenseLimit === 1 ? "expense" : "expenses"}
          {isCustomLimit && <span className={styles.customBadge}> (Custom)</span>}
        </div>
      </div>
    </div>
  );
}
