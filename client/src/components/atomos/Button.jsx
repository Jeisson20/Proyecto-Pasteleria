import styled from "styled-components";

export const Button = styled.button`
  background: ${({ $variant, theme }) =>
    $variant === "primary" ? theme.primary : "transparent"};
  color: ${({ $variant, theme }) =>
    $variant === "primary" ? "white" : theme.text};
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
    background: ${({ $variant, theme }) =>
      $variant === "primary" ? theme.primaryHover : theme.bg4};
  }
`;
