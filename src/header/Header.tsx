import SpeakerOn from "../assets/icons/speaker.svg?react";
import SpeakerOff from "../assets/icons/speaker-off.svg?react";
import MusicOn from "../assets/icons/sound-on.svg?react";
import MusicOff from "../assets/icons/sound-off.svg?react";
import TooltipsOn from "../assets/icons/scroll-unfurled.svg?react";
import TooltipsOff from "../assets/icons/tied-scroll.svg?react";
import type { SettingsType } from "../settings/settings";
import { ToggleButton } from "./ToggleButton";
export function Header({
  toggleSetting,
  settings,
}: {
  toggleSetting: (settingsItem: keyof SettingsType) => void;
  settings: SettingsType;
}) {
  return (
    <header className="grid grid-cols-2">
      <div className="col-start-1 justify-self-start flex flex-col">
        <h1 className="text-8xl text-tile font-norse text-shadow-lg">Muninn</h1>
        <p className="text-muted text-2xl pl-10 text-shadow-black/80">
          Runic Memory Card Game
        </p>
      </div>
      <div className="col-start-2 justify-self-end">
        <ToggleButton
          pressed={settings.tooltipsOn}
          onToggle={() => toggleSetting("tooltipsOn")}
          label="Tooltips"
          OnIcon={TooltipsOn}
          OffIcon={TooltipsOff}
          settings={settings}
        />
        <ToggleButton
          pressed={settings.soundOn}
          onToggle={() => toggleSetting("soundOn")}
          label="Sound"
          OnIcon={SpeakerOn}
          OffIcon={SpeakerOff}
          settings={settings}
        />
        <ToggleButton
          pressed={settings.musicOn}
          onToggle={() => toggleSetting("musicOn")}
          label="Music"
          OnIcon={MusicOn}
          OffIcon={MusicOff}
          settings={settings}
        />
      </div>
    </header>
  );
}
