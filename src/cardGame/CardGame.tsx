import { useEffect, useRef, useState } from "react";
import { Card } from "./Card";
import { cards } from "./CardsArray";
import { shuffle } from "./shuffleCards";
import type { CardType } from "../types";
import { EndDialog } from "./EndDialog";
import type { SettingsType } from "../settings/settings";
import { sounds, playSound } from "../sounds";
import { AnimatePresence, motion } from "motion/react";
import { shadow } from "../styles";
import { fetchWiki } from "./wikiFetch";
import type { WikiDataType } from "../types";
import { CardPopUp } from "./CardPopUp";
import { Tutorial } from "../Tutorial";
export function CardGame({ settings }: { settings: SettingsType }) {
  const tutorialRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (localStorage.getItem("seenTutorial")) return;
    localStorage.setItem("seenTutorial", "true");
    tutorialRef.current?.showModal();
    tutorialRef.current?.focus();
  }, []);
  const popUpRef = useRef<HTMLDialogElement>(null);
  const [wikiData, setWikiData] = useState<Array<WikiDataType>>([]);
  useEffect(() => {
    fetchWiki(cards, setWikiData);
  }, []);
  const [deck, setDeck] = useState(() => shuffle(cards));
  const [clickedCards, setClickedCards] = useState<Array<CardType>>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [gameStatus, setGameStatus] = useState<null | "won" | "lost">(null);
  const [round, setRound] = useState(0);
  const [gameLock, setGameLock] = useState(false);
  const [lastCard, setLastCard] = useState<CardType | null>(null);
  const [lastInfo, setLastInfo] = useState<CardType | null>(null);
  const rate = 1 + (clickedCards.length / cards.length) * (1.23 - 1);
  function handleCardClick(cardObject: CardType) {
    if (gameLock) return;
    setGameLock(true);
    setTimeout(() => {
      setGameLock(false);
    }, 2000);
    setLastCard(cardObject);
    if (clickedCards.some((cc) => cc.id === cardObject.id)) {
      if (settings.soundOn) playSound(sounds.loseSound);
      setGameStatus("lost");
      dialogRef.current?.showModal();
      dialogRef.current?.focus();
    } else if (clickedCards.length === cards.length - 1) {
      if (settings.soundOn) playSound(sounds.winSound);
      setClickedCards([...clickedCards, cardObject]);
      setGameStatus("won");
      dialogRef.current?.showModal();
      dialogRef.current?.focus();
    } else {
      if (settings.soundOn) {
        const randomKnock =
          sounds.knockSoundArray[
            Math.floor(Math.random() * sounds.knockSoundArray.length)
          ];
        randomKnock.playbackRate = rate;
        randomKnock.currentTime = 0;
        playSound(randomKnock);
      }
      setClickedCards([...clickedCards, cardObject]);
      setDeck(shuffle(cards));
      setRound(round + 1);
    }
  }
  let lastWikiData;
  if (lastInfo !== null)
    lastWikiData = wikiData.find((data) => data.id === lastInfo.id);
  return (
    <main className="flex-1 flex flex-col justify-center pt-6 sm:pt-10 lg:pt-15">
      <Tutorial
        tutorialRef={tutorialRef}
        onClick={() => {
          if (tutorialRef.current) tutorialRef.current.close();
        }}
        soundCheck={() => {
          if (settings.soundOn) playSound(sounds.toggleOnSound);
        }}
      />
      <CardPopUp
        popUpRef={popUpRef}
        title={lastWikiData?.title + " / " + lastInfo?.name}
        text={lastWikiData?.extract}
        url={lastWikiData?.url}
        onClick={() => {
          if (popUpRef.current) popUpRef.current.close();
        }}
        soundCheck={() => {
          if (settings.soundOn) playSound(sounds.toggleOnSound);
        }}
      ></CardPopUp>
      <EndDialog
        dialogRef={dialogRef}
        onClick={() => {
          if (dialogRef.current) dialogRef.current.close();
        }}
        onClose={() => {
          if (settings.soundOn) playSound(sounds.toggleOnSound);

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
      <div
        className="board mx-auto grid w-full grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-x-(--gap-x) gap-y-(--gap-y)"
        style={{ "--count": cards.length } as React.CSSProperties}
      >
        {deck.map((c, i) => {
          return (
            <Card
              index={i}
              cardObject={c}
              key={c.id}
              onClick={handleCardClick}
              round={round}
              gameLock={gameLock}
              wikiData={wikiData[c.id - 1]}
              settings={settings}
              setLastInfo={setLastInfo}
              popUpRef={popUpRef}
            />
          );
        })}
      </div>
      <p
        className={`flex justify-center items-baseline pt-6 text-4xl sm:pt-10 sm:text-6xl lining-nums tabular-nums ${shadow}`}
      >
        <span className="relative overflow-clip inline-block py-5 -my-5 mask-[linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]">
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
