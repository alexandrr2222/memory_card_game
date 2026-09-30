import { useState } from "react";
import { defaultSettings } from "./settings";
import type { SettingsType } from "./settings";

export function useSettings(parsedSettings: SettingsType | null) {
  let initSettings;
  if (parsedSettings) initSettings = parsedSettings;
  else initSettings = defaultSettings;
  const [settings, setSettings] = useState(initSettings);

  function toggleSetting(settingsItem: keyof SettingsType) {
    setSettings((prev) => ({
      ...prev,
      [settingsItem]: !prev[settingsItem],
    }));
  }
  return { settings, toggleSetting };
}
