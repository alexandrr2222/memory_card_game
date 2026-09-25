import { Header } from "./header/Header";
import { CardGame } from "./cardGame/CardGame";
import { useSettings } from "./settings/useSettings";

function App() {
  const { settings, toggleSetting } = useSettings();
  return (
    <div className="p-5 select-none">
      <Header toggleSetting={toggleSetting} settings={settings} />
      <CardGame />
    </div>
  );
}

export default App;
