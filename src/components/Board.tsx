import { Button, Radio, Space } from "antd";
import React from "react";
import styled from "styled-components";
import { EmojiObject } from "../App";
import { CardList } from "./CardList";

const StyledBoard = styled.div``;

const StyledHeader = styled.h1`
  font-size: 6em;
  color: #424242;
  text-align: center;
  margin-top: 0.1em;
  margin-bottom: 0.1em;

  @media (max-width: 640px) {
    font-size: 3em;
  }
`;

const StyledMenu = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`;

export interface BoardProps {
  cards: EmojiObject[];
  select: (value: number) => void;
  newGame: (count: number) => void;
}

export const Board: React.FC<BoardProps> = ({ cards, select, newGame }) => {
  const handleCounthange = (e: any) => {
    newGame(Number(e.target.value));
  };

  return (
    <StyledBoard>
      <StyledHeader>memojis</StyledHeader>
      <StyledMenu>
        <Space>
          <Button type="primary" onClick={() => newGame(cards.length)}>
            New Game
          </Button>
          <Radio.Group
            value={cards.length.toString()}
            onChange={handleCounthange}
          >
            <Radio.Button value="8">8</Radio.Button>
            <Radio.Button value="16">16</Radio.Button>
            <Radio.Button value="32">32</Radio.Button>
          </Radio.Group>
        </Space>
      </StyledMenu>
      <CardList cards={cards} select={select} />
    </StyledBoard>
  );
};
