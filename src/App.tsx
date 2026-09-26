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
    <div className="p-5 select-none">
      <Header toggleSetting={toggleSetting} settings={settings} />
      <CardGame settings={settings} />
    </div>
  );
}

export default App;
// TODO
// async wikibox for cards
// modal style
// responsivness

// refinements
// audio api
// make music play on game start
