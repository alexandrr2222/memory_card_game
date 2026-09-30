import type { CardType } from "../types";

export function EndDialog({
  dialogRef,
  statusText,
  onClick,
  onClose,
  lastCard,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  statusText: string;
  onClick: () => void;
  onClose: () => void;
  lastCard?: CardType | null;
}) {
  const lost = statusText !== "You won";

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="outline-none bg-transparent m-auto max-h-svh overflow-y-auto bg-[radial-gradient(closest-side,rgba(0,0,0,0.55),transparent)] px-6 py-8 sm:p-20 text-center text-text opacity-0 transition-all transition-discrete duration-300 motion-reduce:transition-none open:opacity-100 backdrop:bg-black/0 backdrop:backdrop-blur-none backdrop:transition-all backdrop:transition-discrete backdrop:duration-300 open:backdrop:bg-black/60 open:backdrop:backdrop-blur-[5px]"
    >
      <h2 className="font-norse text-5xl sm:text-6xl [text-shadow:0_2px_4px_rgba(0,0,0,0.7)]">
        {statusText}
      </h2>

      {lost && lastCard ? (
        <>
          <img
            src={lastCard.icon}
            alt={lastCard.name}
            draggable={false}
            className="mx-auto mt-6 w-36 sm:mt-8 sm:w-56 select-none filter-[url(#warm)_drop-shadow(0_14px_18px_rgba(0,0,0,0.75))]"
          />
          <p className="mt-6 text-lg sm:mt-8 sm:text-xl [text-shadow:0_2px_4px_rgba(0,0,0,0.7)]">
            You already picked{" "}
            <span className="text-[#e59a5c] italic">{lastCard.name}</span>
            .
            <br />
            Each rune can only be picked once.
          </p>
        </>
      ) : null}

      <button
        type="button"
        onClick={onClick}
        className="mt-6 pt-6 select-none border-t border-text/30 px-10 text-xl opacity-85 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text"
      >
        Play again
      </button>
    </dialog>
  );
}
