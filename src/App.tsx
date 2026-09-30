import { Header } from "./header/Header";
import { CardGame } from "./cardGame/CardGame";
import { useSettings } from "./settings/useSettings";
import { musicPlayer } from "./music";
import { useEffect } from "react";

function App() {
  const { settings, toggleSetting } = useSettings();
  useEffect(() => {
    if (settings.musicOn) musicPlayer.play().catch(() => {});
    else musicPlayer.pause();
  }, [settings.musicOn]);
  return (
    <div className="px-3 py-4 sm:p-5 select-none w-full max-w-[1700px] mx-auto min-h-svh flex flex-col">
      {" "}
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
// make music play on game start
