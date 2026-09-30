const files = import.meta.glob<{ default: string }>("./assets/sounds/*", {
  eager: true,
});

const loseSound = new Audio(files["./assets/sounds/lose.mp3"].default);
const winSound = new Audio(files["./assets/sounds/win.mp3"].default);
const toggleOnSound = new Audio(files["./assets/sounds/toggle-on.wav"].default);
const toggleOffSound = new Audio(
  files["./assets/sounds/toggle-off.wav"].default,
);
const knockSoundArray: Array<HTMLAudioElement> = [];
for (let i = 1; i < 6; i++) {
  const knockSound = new Audio(files[`./assets/sounds/knock-${i}.wav`].default);
  knockSound.preservesPitch = false;
  knockSoundArray.push(knockSound);
}

export const sounds = {
  loseSound,
  winSound,
  toggleOnSound,
  toggleOffSound,
  knockSoundArray,
};
export function playSound(audio: HTMLAudioElement) {
  audio.currentTime = 0;
  audio.play().catch(() => {});
}
