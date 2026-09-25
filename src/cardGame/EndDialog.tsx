export function EndDialog({
  dialogRef,
  text,
  onClick,
  onClose,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  text: string;
  onClick: () => void;
  onClose: () => void;
}) {
  return (
    <dialog ref={dialogRef} onClose={onClose}>
      <p>{text}</p>
      <button className="select-none" type="button" onClick={onClick}>
        Play again
      </button>
    </dialog>
  );
}
