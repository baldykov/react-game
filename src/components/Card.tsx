import React, { useState, useContext } from "react";
import styled from "styled-components";
import Sound from "react-sound";
import { AppContext } from "../appContext";

export interface CardProps {
  value: number;
  text: string;
  selected: boolean;
  opened: boolean;
  blocked: boolean;
  select: (value: number) => void;
}

const StyledCard = styled.div<CardProps>`
  font-size: 7em;
  text-align: center;
  display: block;
  border: 2px solid gray;
  border-radius: 5px;
  width: 1.2em;
  padding: 0.1em;
  user-select: none;
  margin: 10px;
  transition: 0.1s;
  transform: ${(p) => (p.selected ? "scale(1.1, 1.1)" : "none")};
  box-shadow: ${(p) => (p.selected ? "0 0 10px rgba(0, 0, 0, 0.5)" : "")};

  :hover {
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 640px) {
    font-size: 5em;
  }
`;

export const Card: React.FC<CardProps> = (props) => {
  const { value, select, text, opened, blocked } = props;
  const [soundStatus, setSoundStatus] = useState<"STOPPED" | "PLAYING">(
    "STOPPED"
  );

  const selectHandler = () => {
    if (blocked) return;
    select(value);
    setSoundStatus("PLAYING");
  };

  const settings = useContext(AppContext);
  return (
    <StyledCard onClick={selectHandler} {...props}>
      <span role="img">{opened ? text : "❓"}</span>
      <Sound
        url="http://notification-sounds.com/soundsfiles/Card-flip-sound-effect.mp3"
        playStatus={soundStatus}
        onFinishedPlaying={() => setSoundStatus("STOPPED")}
        playbackRate={2}
        volume={settings.volume}
      />
    </StyledCard>
  );
};
