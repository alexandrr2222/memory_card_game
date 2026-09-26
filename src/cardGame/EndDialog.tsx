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
  lastCard?: string | null;
}) {
  return (
    <dialog ref={dialogRef} onClose={onClose}>
      <h2>{statusText}</h2>
      {statusText === "won" ? null : (
        <p className="whitespace-pre-line">
          {`You already picked ${lastCard}. \n Each rune can only be picked once.`}
        </p>
      )}
      <button className="select-none" type="button" onClick={onClick}>
        Play again
      </button>
    </dialog>
  );
}
