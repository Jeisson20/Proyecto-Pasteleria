import { useState } from "react";
import styled from "styled-components";
import { Sidebar } from "../components/organismos/sidebar/Sidebar.jsx";
import { MenuHambur } from "../components/organismos/Menuhambur.jsx";
import { AppRoutes } from "../routes/AppRoutes.jsx";
import { Device } from "../styles/breackpoints.jsx";
import { NotificationCenter } from "../components/organismos/NotificationCenter.jsx";

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Container className={sidebarOpen ? "active" : ""}>
      <section className="ContentSidebar">
        <Sidebar
          state={sidebarOpen}
          setState={() => setSidebarOpen(!sidebarOpen)}
        />
      </section>
      <section className="ContentMenuambur">
        <MenuHambur />
      </section>
      <section className="ContentRoutes">
        <AppRoutes />
      </section>
      <NotificationCenter />
    </Container>
  );
}

const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${({ theme }) => theme.bgtotal};

  .ContentSidebar {
    display: none;
  }

  .ContentMenuambur {
    display: block;
    position: absolute;
    left: 0;
  }

  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;

    &.active {
      grid-template-columns: 220px 1fr;
    }

    .ContentSidebar {
      display: initial;
    }

    .ContentMenuambur {
      display: none;
    }

    .ContentRoutes {
      grid-column: 2;
    }
  }

  .ContentRoutes {
    grid-column: 2;
    width: 100%;
  }
`;
