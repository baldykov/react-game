import React from "react";
import styled from "styled-components";

const StyledCardLsit = styled.div`
  display: flex;
  justify-content: center;
`;

export interface CardListProps {
  cards: any[];
}

export const CardList: React.FC<CardListProps> = ({ cards }) => {
  return <StyledCardLsit>{cards}</StyledCardLsit>;
};
