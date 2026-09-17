import { useState } from "react";
import { defaultSettings } from "./settings";
import type { SettingsType } from "./settings";

export function useSettings() {
  const [settings, setSettings] = useState(defaultSettings);
  function toggleSetting(settingsItem: keyof SettingsType) {
    setSettings((prev) => ({
      ...prev,
      [settingsItem]: !prev[settingsItem],
    }));
  }
  return { settings, toggleSetting };
}
