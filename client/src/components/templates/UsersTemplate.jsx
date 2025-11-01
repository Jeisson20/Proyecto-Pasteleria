import styled from "styled-components";
import { UsersTable } from "../organismos/UsersTable.jsx";
import { Title } from "../atomos/Title.jsx";
import { Header } from "../organismos/Header.jsx";
import { useState } from "react";
import SearchBar from "../moleculas/SearchBar.jsx";

export function UsersTemplate() {
  const [state, setState] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Container>
      <header className="header">
        <div className="area1">
          <Title className="title">Gestión de Usuarios</Title>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>

      <section className="main">
        <UsersTable searchTerm={searchTerm} />
      </section>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  padding: 1rem;

  .header {
    grid-area: header;
    display: flex;
    align-items: center;
  }

  .title {
    font-size: clamp(1.5rem, 2vw + 1rem, 2.5rem); /* 👈 fluido */
  }

  .main {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(280px, 1fr)
    ); /* 👈 grid adaptativo */
    gap: 1rem;
  }
`;
