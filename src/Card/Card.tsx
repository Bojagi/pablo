import styled from "styled-components";
import { boxInterpolateFn, BoxProps } from "../Box";
import { getComponentStyle } from "../styleHelpers";

export const Card = styled.div<BoxProps>`
  padding: ${getComponentStyle('card.padding')};
  background-color: ${getComponentStyle('card.backgroundColor')};
  color: ${getComponentStyle('card.color')};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: ${getComponentStyle('card.borderRadius')};
  ${boxInterpolateFn}
`;
