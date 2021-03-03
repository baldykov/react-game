import React from "react";
import styled from "styled-components";
import { EmojiObject } from "../App";
import { Card } from "./Card";

const StyledCardLsit = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: auto;
`;

export interface CardListProps {
  cards: EmojiObject[];
  blocked: boolean;
  select: (value: number) => void;
}

export const CardList: React.FC<CardListProps> = ({
  cards,
  select,
  blocked,
}) => {
  return (
    <StyledCardLsit>
      {cards.map((card) => (
        <Card
          value={card.value}
          text={card.emoji}
          key={card.value}
          selected={card.selected}
          select={select}
          opened={card.opened}
          blocked={blocked}
        />
      ))}
    </StyledCardLsit>
  );
};
