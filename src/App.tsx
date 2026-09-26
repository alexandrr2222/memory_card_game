import { Header } from "./header/Header";
import { CardGame } from "./cardGame/CardGame";
import { useSettings } from "./settings/useSettings";

function App() {
  const { settings, toggleSetting } = useSettings();
  return (
    <div className="p-5 select-none">
      <Header toggleSetting={toggleSetting} settings={settings} />
      <CardGame settings={settings} />
    </div>
  );
}

export default App;
// TODO
// change ogg to mp3
// hover on card style
// async wikibox for cards
// modal style
// sound clicks
// music
// how to play button
// responsivness
