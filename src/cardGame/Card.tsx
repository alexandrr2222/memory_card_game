import type { CardType, WikiDataType } from "../types";
import { motion } from "motion/react";
import Tilt from "react-parallax-tilt";
import backCard from "../assets/cards/00-back.svg";
import type { SettingsType } from "../settings/settings";
import { sounds, playSound } from "../sounds";

export function Card({
  cardObject,
  wikiData,
  onClick,
  round,
  gameLock,
  settings,
  setLastInfo,
  popUpRef,
  index,
}: {
  cardObject: CardType;
  wikiData?: WikiDataType;
  onClick: (card: CardType) => void;
  round: number;
  gameLock: boolean;
  settings: SettingsType;
  setLastInfo: React.Dispatch<React.SetStateAction<CardType | null>>;
  popUpRef: React.RefObject<HTMLDialogElement | null>;
  index: number;
}) {
  const end = round * 360;
  const start = end - 360;
  const dealDelay = 0.05 + index * 0.08;

  return (
    <motion.div
      className="@container min-w-0"
      layout
      initial={{ opacity: 0, y: 16, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{
        layout: { duration: 0.6, delay: 0.6 },
        opacity: { duration: 0, delay: dealDelay },
        default: { duration: 0.4, delay: dealDelay, ease: "easeOut" },
      }}
    >
      <div className="-mb-1 filter-[drop-shadow(0_10px_10px_rgba(0,0,0,0.75))] pointer-fine:filter-[drop-shadow(0_3px_3px_rgba(0,0,0,0.85))_drop-shadow(0_22px_24px_rgba(0,0,0,0.6))]">
        <Tilt
          className={`[clip-path:inset(2%_3%_round_8%/5.4%)] ${gameLock ? "[&_.glare-wrapper]:invisible" : ""}`}
          tiltAngleXManual={gameLock ? 0 : null}
          tiltAngleYManual={gameLock ? 0 : null}
          tiltMaxAngleX={16}
          tiltMaxAngleY={16}
          transitionSpeed={600}
          glareEnable
          glareColor="#c97637"
          glareMaxOpacity={0.15}
          glarePosition="all"
          glareBorderRadius="24px"
        >
          <div className="perspective-distant">
            <motion.button
              className="block w-full aspect-49/74 transform-3d select-none focus-visible:outline-4 rounded-[8%/5.4%] focus-visible:-outline-offset-4 focus-visible:outline-text"
              type="button"
              animate={{
                rotateY:
                  round === 0
                    ? 0
                    : [start, start + 180, start + 180, start + 180, end],
              }}
              transition={{ duration: 2 }}
              onClick={() => onClick(cardObject)}
            >
              <img
                className="absolute inset-0 backface-hidden filter-[url(#warm)]"
                src={cardObject.icon}
                alt={cardObject.name}
                draggable={false}
              />
              <img
                className="absolute inset-0 backface-hidden rotate-y-180 filter-[url(#warm)]"
                // cursor-[url(/cursors/runeArrow.png)_1_1,auto]
                src={backCard}
                alt=""
                draggable={false}
              />
            </motion.button>
          </div>
        </Tilt>
      </div>
      <motion.div
        key={round}
        animate={{
          opacity: round === 0 ? 1 : [1, 0, 0, 0, 1],
        }}
        transition={{ duration: 2.4, times: [0, 0.125, 0.5, 0.875, 1] }}
        className="flex justify-center pt-[max(0.5rem,2cqw)] pb-[10cqw] will-change-[opacity]"
      >
        {wikiData === undefined ||
        wikiData.extract === "" ||
        wikiData.url === "" ||
        !settings.tooltipsOn ? (
          <p className="text-[max(0.7rem,9cqw)] leading-tight opacity-90 [text-shadow:0_2px_4px_rgba(0,0,0,0.7)]">
            {cardObject.name}
          </p>
        ) : (
          <button
            className="transition-colors duration-200 underline decoration-dotted decoration-[1.5px] underline-offset-[0.25em] decoration-text/50 hover:decoration-text text-[max(0.7rem,9cqw)] leading-tight opacity-90 [text-shadow:0_2px_4px_rgba(0,0,0,0.7)]"
            type="button"
            onClick={() => {
              if (settings.soundOn) playSound(sounds.toggleOnSound);
              setLastInfo(cardObject);
              popUpRef.current?.showModal();
              popUpRef.current?.focus();
            }}
          >
            {cardObject.name}
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
