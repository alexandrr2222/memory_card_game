import { Header } from "./header/Header";
import { CardGame } from "./cardGame/CardGame";
import { useSettings } from "./settings/useSettings";
import { musicPlayer } from "./music";
import { useEffect } from "react";
import type { SettingsType } from "./settings/settings";

function App() {
  const unparsedSettings: string | null = localStorage.getItem("settings");
  let parsedSettings: SettingsType | null = null;
  if (unparsedSettings !== null) {
    parsedSettings = JSON.parse(unparsedSettings);
  }
  const { settings, toggleSetting } = useSettings(parsedSettings);
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);
  useEffect(() => {
    if (!settings.musicOn) {
      musicPlayer.pause();
      return;
    }
    const start = () => musicPlayer.play().catch(() => {});
    musicPlayer.play().catch(() => {
      window.addEventListener("pointerdown", start, { once: true });
      window.addEventListener("keydown", start, { once: true });
    });
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, [settings.musicOn]);
  return (
    <div className="px-3 py-4 sm:p-5 select-none w-full max-w-[1700px] mx-auto min-h-svh flex flex-col">
      <Header toggleSetting={toggleSetting} settings={settings} />
      <CardGame settings={settings} />
    </div>
  );
}

export default App;

// REFINEMENTS
// fix runes
// redo win/lose audio
// audio api
