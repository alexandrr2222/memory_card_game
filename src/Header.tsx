import SpeakerOn from "./assets/icons/speaker.svg?react";
import SpeakerOff from "./assets/icons/speaker-off.svg?react";
import MusicOn from "./assets/icons/sound-on.svg?react";
import MusicOff from "./assets/icons/sound-off.svg?react";
import TooltipsOn from "./assets/icons/scroll-unfurled.svg?react";
import TooltipsOff from "./assets/icons/tied-scroll.svg?react";
import Info from "./assets/icons/info.svg?react";
import type { SettingsType } from "./settings/settings";
import { ToggleButton } from "./ToggleButton";
import { commonIconStyle } from "./styles";

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
          Younger Futhark Memory Game
        </p>
      </div>
      <div className="col-start-2 justify-self-end">
        <ToggleButton
          pressed={settings.tooltipsOn}
          onToggle={() => toggleSetting("tooltipsOn")}
          label="Tooltips"
          OnIcon={TooltipsOn}
          OffIcon={TooltipsOff}
        />
        <ToggleButton
          pressed={settings.soundOn}
          onToggle={() => toggleSetting("soundOn")}
          label="Sound"
          OnIcon={SpeakerOn}
          OffIcon={SpeakerOff}
        />
        <ToggleButton
          pressed={settings.musicOn}
          onToggle={() => toggleSetting("musicOn")}
          label="Music"
          OnIcon={MusicOn}
          OffIcon={MusicOff}
        />
        <button type="button" aria-label="How to play">
          <Info className={`${commonIconStyle}`} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
