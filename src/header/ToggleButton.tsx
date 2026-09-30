import { commonIconStyle } from "../styles";
import { sounds, playSound } from "../sounds";
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
      className="inline-grid opacity-85 transition-[opacity,scale] duration-150 hover:opacity-100 active:scale-90"
      onClick={() => {
        if (settings.soundOn) {
          if (pressed) playSound(sounds.toggleOnSound);
          else playSound(sounds.toggleOffSound);
        } else if (label === "Sound") playSound(sounds.toggleOffSound);
        onToggle();
      }}
    >
      {pressed ? (
        <OnIcon
          aria-hidden="true"
          className={`${commonIconStyle} col-start-1 row-start-1 transition-[opacity,scale] duration-200 ${pressed ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
        />
      ) : (
        <OffIcon
          aria-hidden="true"
          className={`${commonIconStyle} col-start-1 row-start-1 transition-[opacity,scale] duration-200 ${pressed ? "opacity-0 scale-75" : "opacity-100 scale-100"}`}
        />
      )}
    </button>
  );
}
