import { Button, Radio, Slider, Space } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";
import { EmojiObject } from "../App";
import { AppContext } from "../appContext";
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

const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export interface BoardProps {
  cards: EmojiObject[];
  blocked: boolean;
  select: (value: number) => void;
  newGame: (count: number) => void;
  setVolume: (volume: number) => void;
}

export const Board: React.FC<BoardProps> = ({
  cards,
  select,
  newGame,
  blocked,
  setVolume,
}) => {
  const handleCounthange = (e: any) => {
    newGame(Number(e.target.value));
  };

  const settings = useContext(AppContext);
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
          <Slider
            defaultValue={settings.volume}
            style={{ width: "70px" }}
            onChange={(value: number) => setVolume(value)}
            tipFormatter={(value) => `volume: ${value}`}
          />
        </Space>
      </StyledMenu>
      <CardList cards={cards} select={select} blocked={blocked} />

      <StyledFooter>
        <Space style={{ margin: "0 auto" }}>
          <a href="https://github.com/baldykov">@baldykov</a>
          <a href="https://rs.school/js/">
            <img
              src="https://rs.school/images/rs_school_js.svg"
              width="60px"
              alt="RS School"
            />
          </a>
          <span>2021</span>
        </Space>
      </StyledFooter>
    </StyledBoard>
  );
};
