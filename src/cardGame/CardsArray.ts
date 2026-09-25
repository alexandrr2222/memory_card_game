import type { CardType } from "../types";

const files = import.meta.glob<{ default: string }>("../assets/cards/*.svg", {
  eager: true,
});
function getIcon(file: string) {
  return files[`../assets/cards/${file}`].default;
}
export const cards: Array<CardType> = [
  { id: 1, name: "Fé", icon: getIcon("01-fe.svg"), wikiTitle: "Fehu" },
  { id: 2, name: "Úr", icon: getIcon("02-ur.svg"), wikiTitle: "Ur_(rune)" },
  { id: 3, name: "Þurs", icon: getIcon("03-thurs.svg"), wikiTitle: "Thurisaz" },
  {
    id: 4,
    name: "Óss",
    icon: getIcon("04-oss.svg"),
    wikiTitle: "Ansuz_(rune)",
  },
  { id: 5, name: "Reið", icon: getIcon("05-reid.svg"), wikiTitle: "Raido" },
  { id: 6, name: "Kaun", icon: getIcon("06-kaun.svg"), wikiTitle: "Kaunan" },
  {
    id: 7,
    name: "Hagall",
    icon: getIcon("07-hagall.svg"),
    wikiTitle: "Haglaz",
  },
  { id: 8, name: "Nauðr", icon: getIcon("08-naudr.svg"), wikiTitle: "Naudiz" },
  { id: 9, name: "Íss", icon: getIcon("09-isa.svg"), wikiTitle: "Isaz" },
  { id: 10, name: "Ár", icon: getIcon("10-ar.svg"), wikiTitle: "Jēran" },
  {
    id: 11,
    name: "Sól",
    icon: getIcon("11-sol.svg"),
    wikiTitle: "Sowilō_(rune)",
  },
  {
    id: 12,
    name: "Týr",
    icon: getIcon("12-tyr.svg"),
    wikiTitle: "Tiwaz_(rune)",
  },
  {
    id: 13,
    name: "Bjarkan",
    icon: getIcon("13-bjarkan.svg"),
    wikiTitle: "Berkanan",
  },
  { id: 14, name: "Maðr", icon: getIcon("14-madr.svg"), wikiTitle: "Mannaz" },
  { id: 15, name: "Lögr", icon: getIcon("15-logr.svg"), wikiTitle: "Laguz" },
  { id: 16, name: "Yr", icon: getIcon("16-yr.svg"), wikiTitle: "Algiz" },
];
