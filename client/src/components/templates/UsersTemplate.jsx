import styled from "styled-components";
import { UsersTable } from "../organismos/UsersTable.jsx";
import { Title } from "../atomos/Title.jsx";
import { Header } from "../organismos/Header.jsx";
import { useState } from "react";
import SearchBar from "../moleculas/SearchBar.jsx";
import { Device } from "../../styles/breackpoints.jsx";
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
  overflow: hidden;
  height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  padding: 15px;
  grid-template:
    "header" 100px
    "main" auto;
  .header {
    grid-area: header;
    /* background-color: rgba(103, 93, 241, 0.14); */
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    /* background-color: rgba(229, 67, 26, 0.14); */
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
  }

  .title {
    font-size: 40px;
  }

  .main {
    grid-area: main;
    /* background-color: rgba(179, 46, 241, 0.14); */
  }
`;
