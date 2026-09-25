import { commonIconStyle } from "../styles";
export function ToggleButton({
  pressed,
  onToggle,
  label,
  OnIcon,
  OffIcon,
}: {
  pressed: boolean;
  onToggle: () => void;
  label: string;
  OnIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  OffIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={label}
      onClick={onToggle}
    >
      {pressed ? (
        <OnIcon className={`${commonIconStyle}`} aria-hidden="true" />
      ) : (
        <OffIcon className={`${commonIconStyle}`} aria-hidden="true" />
      )}
    </button>
  );
}
