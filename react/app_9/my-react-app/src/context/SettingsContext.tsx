import { createContext } from "react";
import type { ReactNode } from "react";

export type TimezoneType = "UTC" | "Local";

interface SettingsContextType {
  timezone: TimezoneType;
  setTimezone: (timezone: TimezoneType) => void;
  dateFormat: string;
  setDateFormat: (format: string) => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export interface SettingsProviderProps {
  children: ReactNode;
}
