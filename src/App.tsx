import { Header } from "./Header";
import { CardGame } from "./CardGame";
import { useSettings } from "./settings/useSettings";

function App() {
  const { settings, toggleSetting } = useSettings();
  return (
    <div className="p-5">
      <Header toggleSetting={toggleSetting} settings={settings} />
      <CardGame />
    </div>
  );
}

export default App;
