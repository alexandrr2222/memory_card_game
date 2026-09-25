import type { CardType, WikiDataType } from "../types";

export async function fetchDetails(
  cards: Array<CardType>,
): Promise<Array<WikiDataType>> {
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
  return cards.map((card, i) => {
    const currentResult = results[i];
    return {
      id: card.id,
      url: currentResult.status === "fulfilled" ? currentResult.value.url : "",
      text:
        currentResult.status === "fulfilled" ? currentResult.value.extract : "",
    };
  });
}
