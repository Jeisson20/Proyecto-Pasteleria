import styled from "styled-components";

export const Button = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.bg5};
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
    color: ${({ theme }) => theme.primary};
  }
`;
