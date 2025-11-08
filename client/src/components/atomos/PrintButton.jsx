import styled from "styled-components";

export const PrintButton = () => {
  return <Button>🖨️ Imprimir</Button>;
};

const Button = styled.button`
  margin-top: 1rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;
