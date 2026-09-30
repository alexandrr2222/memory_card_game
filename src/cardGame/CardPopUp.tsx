export function CardPopUp({
  popUpRef,
  title,
  text,
  url,
  onClick,
  soundCheck,
}: {
  popUpRef: React.RefObject<HTMLDialogElement | null>;
  title: string | undefined;
  text: string | undefined;
  url: string | undefined;
  onClick: () => void;
  soundCheck: () => void;
}) {
  return (
    <dialog ref={popUpRef} onClose={soundCheck}>
      <button type="button" onClick={onClick}>
        X
      </button>
      <h3>{title}</h3>
      <p>{text}</p>
      <button type="button" onClick={soundCheck}>
        <a target="_blank" href={url}>
          Read More
        </a>
      </button>
    </dialog>
  );
}
