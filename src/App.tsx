import { Header } from "./header/Header";
import { CardGame } from "./cardGame/CardGame";
import { useSettings } from "./settings/useSettings";
import { musicPlayer } from "./music";
import { useEffect } from "react";

function App() {
  const { settings, toggleSetting } = useSettings();
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
    <div className="px-3 py-4 sm:p-5 select-none w-full max-w-[1700px] mx-auto min-h-dvh flex flex-col">
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
