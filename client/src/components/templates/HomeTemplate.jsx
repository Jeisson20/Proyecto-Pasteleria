import styled from "styled-components";
import { BannerEmpresa } from "../organismos/BannerEmpresa.jsx";
import { Title } from "../atomos/Title.jsx";
import { Header } from "../organismos/Header.jsx";
import { useState } from "react";
export function HomeTemplate() {
  const [state, setState] = useState(false);

  return (
    <Container>
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="main">
        <BannerEmpresa />
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
    display: flex;
    align-items: center;
  }
  .main {
    grid-area: main;
  }
`;
