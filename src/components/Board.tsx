import React from "react";
import styled from "styled-components";

const StyledBoard = styled.div`
  padding-top: 50px;
`;
export const Board: React.FC = ({ children }) => {
  return <StyledBoard>{children}</StyledBoard>;
};
