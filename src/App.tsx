import React, { useState, useEffect } from "react";
import { Board } from "./components/Board";
import { getRandomEmojis } from "./static/emoji";
import "antd/dist/antd.css";
import Sound from "react-sound";
import { AppContext } from "./appContext";

export interface EmojiObject {
  emoji: string;
  value: number;
  selected: boolean;
  opened: boolean;
}

const generateEmojiObjects = (emojis: string[]) => {
  return emojis
    .concat(emojis)
    .map((emoji) => ({
      emoji,
      value: Math.random(),
      selected: false,
      opened: true,
    }))
    .sort((a, b) => (a.value > b.value ? 1 : -1));
};

const CARDS_COUNT = 4;
const initCards = generateEmojiObjects(getRandomEmojis(CARDS_COUNT));

function App() {
  const [cards, setCards] = useState(initCards);
  const [blocked, setBlocked] = useState(false);
  const [pairSoundStatus, setPairSoundStatus] = useState<"STOPPED" | "PLAYING">(
    "STOPPED"
  );

  const select = (cards: EmojiObject[], value: number) => {
    if (blocked) return;
    const _cards = [...cards];
    for (const card of _cards) {
      if (card.value === value) {
        if (card.opened) return;
        card.selected = true;
        card.opened = true;
        setCards(_cards);
      }
    }
  };

  const handlePair = (cards: EmojiObject[], isEqual: boolean) => {
    const _cards = [...cards];
    for (const card of _cards) {
      if (card.selected) {
        card.selected = false;
        card.opened = isEqual;
      }
    }
    setCards(_cards);
  };

  useEffect(() => {
    const selectedCards = cards.filter((card) => card.selected);
    if (selectedCards?.length === 2) {
      setBlocked(true);
      const cardsEqual: boolean =
        selectedCards[0].emoji === selectedCards[1].emoji;
      if (cardsEqual) {
        setPairSoundStatus("PLAYING");
      }
      setTimeout(
        () => {
          handlePair(cards, cardsEqual);
          setBlocked(false);
        },
        cardsEqual ? 100 : 1000
      );
    }
  }, [cards]);

  const close = (cards: EmojiObject[]) => {
    const _cards = [...cards];
    for (const card of _cards) {
      card.opened = false;
    }
    setCards(_cards);
  };

  const closeWithDelay = (_cards: EmojiObject[], delay: number) => {
    setBlocked(true);
    setTimeout(() => {
      close(_cards);
      setBlocked(false);
    }, delay);
  };

  useEffect(() => {
    closeWithDelay(cards, 2000);
    // eslint-disable-next-line
  }, []);

  const newGame = (count: number) => {
    const newCards = generateEmojiObjects(getRandomEmojis(count / 2));
    setCards(newCards);

    closeWithDelay(newCards, 2000);
  };

  const setVolume = (volume: number) => {
    setSettings({ ...settings, volume });
  };

  const [settings, setSettings] = useState({ volume: 30 });
  return (
    <AppContext.Provider value={settings}>
      <Board
        cards={cards}
        select={(value: number) => select(cards, value)}
        newGame={newGame}
        blocked={blocked}
        setVolume={setVolume}
      />
      <Sound
        url="http://notification-sounds.com/soundsfiles/Ticket-machine-sound.mp3"
        playStatus={pairSoundStatus}
        onFinishedPlaying={() => setPairSoundStatus("STOPPED")}
        volume={settings.volume - 20}
        playbackRate={2}
      />
    </AppContext.Provider>
  );
}

export default App;
