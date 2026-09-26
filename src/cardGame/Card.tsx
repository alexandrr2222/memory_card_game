import type { CardType, WikiDataType } from "../types";
import { motion } from "motion/react";
import scrollUnfurled from "../assets/icons/scroll-unfurled.svg";
import backCard from "../assets/cards/00-back.svg";

export function Card({
  cardObject,
  wikiData,
  onClick,
  round,
}: {
  cardObject: CardType;
  wikiData?: WikiDataType;
  onClick: (card: CardType) => void;
  round: number;
}) {
  const end = round * 360;
  const start = end - 360;
  return (
    <motion.div layout transition={{ layout: { duration: 0.6, delay: 0.6 } }}>
      <div className="w-fit perspective-distant">
        <motion.button
          className="w-49 h-74 transform-3d select-none focus-visible:outline-5 rounded-3xl focus-visible:-outline-offset-5 focus-visible:outline-text"
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
            className="absolute inset-0 backface-hidden"
            src={cardObject.icon}
            alt={cardObject.name}
            draggable={false}
          />
          <img
            className="absolute inset-0 backface-hidden rotate-y-180"
            // cursor-[url(/cursors/runeArrow.png)_1_1,auto]
            src={backCard}
            alt=""
            draggable={false}
          />
        </motion.button>
      </div>

      <motion.div
        key={round}
        animate={{
          opacity: round === 0 ? 1 : [1, 0, 0, 0, 1],
        }}
        transition={{ duration: 2.4, times: [0, 0.125, 0.5, 0.875, 1] }}
        className="flex justify-center"
      >
        {wikiData ? (
          wikiData.text === "" || wikiData.url === "" ? null : (
            <button type="button">
              <img
                src={scrollUnfurled}
                alt="more information"
                draggable={false}
              />
            </button>
          )
        ) : null}
        <p>{cardObject.name}</p>
      </motion.div>
    </motion.div>
  );
}
