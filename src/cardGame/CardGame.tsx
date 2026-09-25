import { useRef, useState } from "react";
import { Card } from "./Card";
import { cards } from "./CardsArray";
import { shuffle } from "./shuffleCards";
import type { CardType } from "../types";
import { EndDialog } from "./EndDialog";

export function CardGame() {
  const [deck, setDeck] = useState(() => shuffle(cards));
  const [clickedCards, setClickedCards] = useState<Array<CardType>>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [gameStatus, setGameStatus] = useState<null | "won" | "lost">(null);
  const [round, setRound] = useState(0);
  const [gameLock, setGameLock] = useState(false);

  function handleCardClick(cardObject: CardType) {
    if (gameLock) return;
    setGameLock(true);
    setTimeout(() => {
      setGameLock(false);
    }, 2000);
    if (clickedCards.some((cc) => cc.id === cardObject.id)) {
      setGameStatus("lost");
      dialogRef.current?.showModal();
    } else if (clickedCards.length === cards.length - 1) {
      setClickedCards([...clickedCards, cardObject]);
      setGameStatus("won");
      dialogRef.current?.showModal();
    } else {
      setClickedCards([...clickedCards, cardObject]);
      setDeck(shuffle(cards));
      setRound(round + 1);
    }
  }

  return (
    <main className="p-15">
      <EndDialog
        dialogRef={dialogRef}
        onClick={() => {
          if (dialogRef.current) dialogRef.current.close();
        }}
        onClose={() => {
          setGameLock(true);
          setTimeout(() => {
            setGameLock(false);
          }, 2000);
          setRound(round + 1);
          setClickedCards([]);
          setDeck(shuffle(cards));
        }}
        text={gameStatus === "won" ? "You won" : "You lost"}
      />
      <div className="flex flex-wrap gap-3 justify-center">
        {deck.map((c) => {
          return (
            <Card
              cardObject={c}
              key={c.id}
              onClick={handleCardClick}
              round={round}
            />
          );
        })}
      </div>
      <p className=" flex justify-center text-6xl mt-12">
        {clickedCards.length}/{cards.length}
      </p>
    </main>
  );
}
// flip animation

// shit from async stored in state and that state passed
// to Card and when the async loads > state updates and thus it loads in
