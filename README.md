# Muninn

A memory card game built around the 16 runes of the Younger Futhark. Every round the cards reshuffle. pick each rune exactly once to win.

Named after one of Odin's ravens, whose name means "memory".

**Play it:** https://muninn-5cy.pages.dev

## About

Built as the memory card project for The Odin Project's React course. The rune names link to their Wikipedia entries, pulled live from the Wikipedia REST API.

Stack: React, TypeScript, Vite, Tailwind CSS v4, Motion, react-parallax-tilt.

## What I learned

- **useEffect** for side effects: fetching rune info from Wikipedia when the game loads, and syncing the music player with the settings. Also why effects need cleanup, and why StrictMode runs them twice in dev.
- **Fetching in parallel** with `Promise.allSettled`, so one failed request doesn't break the other fifteen.
- **useRef** to control native `<dialog>` elements (`showModal()`, `close()`, focus) without extra state.
- **A custom hook** (`useSettings`) to keep the sound, music and tooltip toggles in one place.
- **Keys and layout animations**: stable keys let Motion animate cards to their new positions on every shuffle instead of re-mounting them.
- **Browser audio quirks**: autoplay is blocked until the user interacts, and `play()` returns a promise that can reject.
- **Responsive layout without breakpoint soup**: CSS variables and `calc()` size the board to fit the screen, and container queries scale each label with its card.
- **Mobile performance**: heavy CSS filters like stacked drop shadows get recalculated every frame during animations and choke phones.

## Running locally

    bun install
    bun run dev
