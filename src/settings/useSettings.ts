import { useEffect, useState } from "react";
import { defaultSettings } from "./settings";
import type { SettingsType } from "./settings";

function loadSettings(): SettingsType {
  try {
    const saved = localStorage.getItem("settings");
    if (!saved) return defaultSettings;
    return { ...defaultSettings, ...JSON.parse(saved) };
  } catch {
    return defaultSettings;
  }
}

export function useSettings() {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  function toggleSetting(settingsItem: keyof SettingsType) {
    setSettings((prev) => ({
      ...prev,
      [settingsItem]: !prev[settingsItem],
    }));
  }
  return { settings, toggleSetting };
}
