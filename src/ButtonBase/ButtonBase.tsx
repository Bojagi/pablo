import styled from "styled-components";
import { boxInterpolateFn, BoxProps } from "../Box";
import { getSpacing } from "../styleHelpers";

export interface ButtonBaseProps extends BoxProps {};

export const ButtonBase = styled.button<ButtonBaseProps>`
  ${boxInterpolateFn}
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${getSpacing(0.5)} ${getSpacing(1)};
  border: 1px solid transparent;
  background: transparent;
  border-radius: ${getSpacing(0.5)};
  transition: background-color 0.3s, border-color 0.3s;
  outline: none;

  &:not(:disabled) {
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.4;
    cursor: normal;
  }
`;
