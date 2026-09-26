import { useRef, useState } from "react";
import { Card } from "./Card";
import { cards } from "./CardsArray";
import { shuffle } from "./shuffleCards";
import type { CardType } from "../types";
import { EndDialog } from "./EndDialog";
import type { SettingsType } from "../settings/settings";
import { sounds } from "../sounds";
import { AnimatePresence, motion } from "motion/react";
import { shadow } from "../styles";

export function CardGame({ settings }: { settings: SettingsType }) {
  const [deck, setDeck] = useState(() => shuffle(cards));
  const [clickedCards, setClickedCards] = useState<Array<CardType>>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [gameStatus, setGameStatus] = useState<null | "won" | "lost">(null);
  const [round, setRound] = useState(0);
  const [gameLock, setGameLock] = useState(false);
  const [lastCard, setLastCard] = useState<CardType | null>(null);
  const rate = 1 + (clickedCards.length / cards.length) * (1.23 - 1);
  function handleCardClick(cardObject: CardType) {
    if (gameLock) return;
    setGameLock(true);
    setTimeout(() => {
      setGameLock(false);
    }, 2000);
    setLastCard(cardObject);
    if (clickedCards.some((cc) => cc.id === cardObject.id)) {
      if (settings.soundOn) sounds.loseSound.play();
      setGameStatus("lost");
      dialogRef.current?.showModal();
    } else if (clickedCards.length === cards.length - 1) {
      if (settings.soundOn) sounds.winSound.play();
      setClickedCards([...clickedCards, cardObject]);
      setGameStatus("won");
      dialogRef.current?.showModal();
    } else {
      if (settings.soundOn) {
        const randomKnock =
          sounds.knockSoundArray[
            Math.floor(Math.random() * sounds.knockSoundArray.length)
          ];
        randomKnock.playbackRate = rate;
        randomKnock.currentTime = 0;
        randomKnock.play();
      }
      setClickedCards([...clickedCards, cardObject]);
      setDeck(shuffle(cards));
      setRound(round + 1);
    }
  }

  return (
    <main className="pt-15">
      <EndDialog
        dialogRef={dialogRef}
        onClick={() => {
          if (dialogRef.current) dialogRef.current.close();
        }}
        onClose={() => {
          if (settings.soundOn) sounds.toggleOnSound.play();
          else sounds.toggleOffSound.play();

          setGameLock(true);
          setTimeout(() => {
            setGameLock(false);
          }, 2000);
          setRound(round + 1);
          setClickedCards([]);
          setDeck(shuffle(cards));
        }}
        statusText={gameStatus === "won" ? "You won" : `You lost`}
        lastCard={lastCard}
      />
      <div className="flex flex-wrap gap-3 justify-center">
        {deck.map((c) => {
          return (
            <Card
              cardObject={c}
              key={c.id}
              onClick={handleCardClick}
              round={round}
              gameLock={gameLock}
            />
          );
        })}
      </div>
      <p
        className={`flex justify-center items-baseline pt-12 text-6xl lining-nums tabular-nums ${shadow}`}
      >
        <span className="relative inline-block py-5 -my-5 mask-[linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={clickedCards.length}
              className="inline-block"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {clickedCards.length}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="ml-1 text-[0.5em] opacity-60">/{cards.length}</span>
      </p>
    </main>
  );
}
// stuff from async stored in state and that state passed
// to Card and when the async loads > state updates and thus it loads in
