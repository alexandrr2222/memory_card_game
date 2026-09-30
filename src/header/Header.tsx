import SpeakerOn from "../assets/icons/speaker.svg?react";
import SpeakerOff from "../assets/icons/speaker-off.svg?react";
import MusicOn from "../assets/icons/sound-on.svg?react";
import MusicOff from "../assets/icons/sound-off.svg?react";
import TooltipsOn from "../assets/icons/candle-on.svg?react";
import TooltipsOff from "../assets/icons/candle-off.svg?react";
import type { SettingsType } from "../settings/settings";
import { ToggleButton } from "./ToggleButton";
import { shadow } from "../styles";
export function Header({
  toggleSetting,
  settings,
}: {
  toggleSetting: (settingsItem: keyof SettingsType) => void;
  settings: SettingsType;
}) {
  return (
    <header
      className={`grid grid-cols-[1fr_auto_1fr] items-center px-8 ${shadow}`}
    >
      <div className="justify-self-start self-start pt-2">
        <ToggleButton
          pressed={settings.tooltipsOn}
          onToggle={() => toggleSetting("tooltipsOn")}
          label="Tooltips"
          OnIcon={TooltipsOn}
          OffIcon={TooltipsOff}
          settings={settings}
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-8xl font-norse [text-shadow:0_2px_4px_rgba(0,0,0,0.6)]">
          Muninn
        </h1>
        <p className="text-2xl opacity-80 [text-shadow:0_2px_4px_rgba(0,0,0,0.6)]">
          A Younger Futhark memory game
        </p>
      </div>

      <div className="justify-self-end self-start pt-2">
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
