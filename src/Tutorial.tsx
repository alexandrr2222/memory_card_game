export function Tutorial({
  tutorialRef,
  onClick,
  soundCheck,
}: {
  tutorialRef: React.RefObject<HTMLDialogElement | null>;
  onClick: () => void;
  soundCheck: () => void;
}) {
  const actionStyle =
    "px-6 text-xl opacity-85 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text";

  return (
    <dialog
      ref={tutorialRef}
      onClose={soundCheck}
      className="outline-none bg-transparent m-auto w-[min(44rem,100vw)] max-h-svh overflow-y-auto bg-[radial-gradient(closest-side,rgba(0,0,0,0.55),transparent)] px-6 py-8 sm:p-20 text-center text-text opacity-0 transition-all transition-discrete duration-300 motion-reduce:transition-none open:opacity-100 starting:open:opacity-0 backdrop:bg-black/0 backdrop:backdrop-blur-none backdrop:transition-all backdrop:transition-discrete backdrop:duration-300 open:backdrop:bg-black/60 open:backdrop:backdrop-blur-[5px]"
    >
      <h3 className="font-norse text-5xl sm:text-6xl [text-shadow:0_2px_4px_rgba(0,0,0,0.7)]">
        How to play
      </h3>

      <p className="mt-6 text-lg sm:mt-8 sm:text-xl leading-relaxed [text-shadow:0_2px_4px_rgba(0,0,0,0.7)]">
        Pick a rune each round, but never pick the same rune twice, because the
        cards reshuffle after every pick. Pick all 16 without repeating one to
        win.
      </p>

      <div className="mx-auto mt-6 flex w-fit justify-center border-t border-text/30 pt-6">
        <button type="button" onClick={onClick} className={actionStyle}>
          Understood!
        </button>
      </div>
    </dialog>
  );
}
