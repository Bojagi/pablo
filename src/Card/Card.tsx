import styled from "styled-components";
import { getColor, getSpacing } from "../styleHelpers";

export const Card = styled.div`
  padding: ${getSpacing(2)};
  background-color: ${getColor('common', 'white')};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: ${getSpacing(1)};
`;
