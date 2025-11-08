import styled from "styled-components";

export default function SearchBar({ value, onChange }) {
  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="Buscar..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.bg4};
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontsm};
  background: ${({ theme }) => theme.bgcards};
  color: ${({ theme }) => theme.text};
  width: 500px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;
