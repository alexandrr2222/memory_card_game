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
      className="bg-transparent m-auto overflow-visible bg-[radial-gradient(closest-side,rgba(0,0,0,0.55),transparent)] p-20 text-center text-text backdrop:bg-black/60 backdrop:backdrop-blur-[5px]"
    >
      <h2 className="font-norse text-6xl [text-shadow:0_2px_4px_rgba(0,0,0,0.7)]">
        {statusText}
      </h2>

      {lost && lastCard ? (
        <>
          <img
            src={lastCard.icon}
            alt={lastCard.name}
            draggable={false}
            className="mx-auto mt-8 w-56 select-none filter-[url(#warm)_drop-shadow(0_14px_18px_rgba(0,0,0,0.75))]"
          />
          <p className="mt-8 text-xl [text-shadow:0_2px_4px_rgba(0,0,0,0.7)]">
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
