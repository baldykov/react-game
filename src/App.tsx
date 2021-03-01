import React, { useState, useEffect } from "react";
import { Card } from "./components/Card";
import { CardList } from "./components/CardList";
import { Board } from "./components/Board";
import { getRandomEmojis } from "./static/emoji";

export interface EmojiObject {
  emoji: string;
  value: number;
  selected: boolean;
  opened: boolean;
}

const emojis: string[] = getRandomEmojis(4);
const emojiPairs: EmojiObject[] = emojis
  .concat(emojis)
  .map((emoji) => ({
    emoji,
    value: Math.random(),
    selected: false,
    opened: true,
  }))
  .sort((a, b) => (a.value > b.value ? 1 : -1));;

function App() {
  const [cards, setCards] = useState(emojiPairs);
  const [blocked, setBlocked] = useState(false);

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
      setTimeout(
        () => {
          handlePair(cards, cardsEqual);
          setBlocked(false);
        },
        cardsEqual ? 100 : 1000
      );
    }
  }, [cards]);

  const closeAll = (cards: EmojiObject[]) => {
    const _cards = [...cards];
    for (const card of _cards) {
      card.opened = false;
    }
    setCards(_cards);
  };

  useEffect(() => {
    setBlocked(true);
    setTimeout(() => {
      closeAll(emojiPairs);
      setBlocked(false);
    }, 2000);
  }, []);

  const cardComponents = cards.map((emoji) => (
    <Card
      value={emoji.value}
      text={emoji.emoji}
      key={emoji.value}
      selected={emoji.selected}
      select={(value: number) => select(cards, value)}
      opened={emoji.opened}
    />
  ));
  return (
    <Board>
      <CardList cards={cardComponents} />
    </Board>
  );
}

export default App;
