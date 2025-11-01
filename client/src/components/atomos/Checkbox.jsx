import styled from "styled-components";

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  accent-color: ${({ theme }) => theme.primary};
  width: 18px;
  height: 18px;
  cursor: pointer;
`;
