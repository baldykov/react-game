import React from "react";
import styled from "styled-components";

export interface CardProps {
  value: number;
  text: string;
  selected: boolean;
  opened: boolean;
  select: (value: number) => void;
}

const StyledCard = styled.div<CardProps>`
  font-size: 8em;
  display: block;
  border: 1px solid gray;
  border-radius: 5px;
  max-width: 1em;
  padding: 20px;
  margin-right: 20px;
  transform: ${(p) => (p.selected ? "scale(1.1, 1.1)" : "none")};

  :hover {
    cursor: pointer;
  }
`;

export const Card: React.FC<CardProps> = (props) => {
  const { value, select, text, opened } = props;
  return (
    <StyledCard onClick={() => select(value)} {...props}>
      {opened ? text : "❓"}
    </StyledCard>
  );
};
