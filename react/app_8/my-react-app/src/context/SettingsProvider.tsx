import { useState } from "react";
import {
  SettingsContext,
  type SettingsProviderProps,
  type TimezoneType,
} from "./SettingsContext";

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [timezone, setTimezone] = useState<TimezoneType>("UTC");

  return (
    <SettingsContext.Provider value={{ timezone, setTimezone }}>
      {children}
    </SettingsContext.Provider>
  );
}
