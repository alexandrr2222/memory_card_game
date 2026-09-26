import { commonIconStyle } from "../styles";
import { sounds } from "../sounds";
import type { SettingsType } from "../settings/settings";
export function ToggleButton({
  pressed,
  onToggle,
  label,
  OnIcon,
  OffIcon,
  settings,
}: {
  pressed: boolean;
  onToggle: () => void;
  label: string;
  OnIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  OffIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  settings: SettingsType;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={label}
      onClick={() => {
        if (settings.soundOn) {
          if (pressed) sounds.toggleOnSound.play();
          else sounds.toggleOffSound.play();
        } else if (label === "Sound") sounds.toggleOffSound.play();
        onToggle();
      }}
    >
      {pressed ? (
        <OnIcon className={`${commonIconStyle}`} aria-hidden="true" />
      ) : (
        <OffIcon className={`${commonIconStyle}`} aria-hidden="true" />
      )}
    </button>
  );
}
