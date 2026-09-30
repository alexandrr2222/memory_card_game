import type { CardType, WikiDataType } from "../types";

export async function fetchWiki(
  cards: Array<CardType>,
  setWikiData: React.Dispatch<React.SetStateAction<WikiDataType[]>>,
) {
  const promises = cards.map(async (card) => {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${card.wikiTitle}`,
    );
    if (!res.ok) throw new Error(card.name + " fetch failed");
    const data: {
      extract: string;
      content_urls: { desktop: { page: string } };
    } = await res.json();
    return { extract: data.extract, url: data.content_urls.desktop.page };
  });
  const results = await Promise.allSettled(promises);
  const wikiDataArray = results.map((obj, i) => {
    if (obj.status === "fulfilled") return { id: i + 1, ...obj.value };
    else return { id: i + 1, extract: "", url: "" };
  });
  setWikiData(wikiDataArray);
}
