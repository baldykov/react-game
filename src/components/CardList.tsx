import React from "react";
import styled from "styled-components";

const StyledCardLsit = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export interface CardListProps {
  cards: any[];
}

export const CardList: React.FC<CardListProps> = ({ cards }) => {
  return <StyledCardLsit>{cards}</StyledCardLsit>;
};
