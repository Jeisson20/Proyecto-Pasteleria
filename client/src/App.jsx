import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UsersProvider } from "./context/UsersContext.jsx";
import { ThemeContext } from "./context/ThemeContext.jsx";
import { Light, Dark } from "./styles/themes.jsx";
import AppContent from "./layout/AppContent.jsx";

function App() {
  const [themeuse, setTheme] = useState("dark");
  const themeStyle = themeuse === "light" ? Light : Dark;

  return (
    <ThemeContext.Provider value={{ theme: themeuse, setTheme }}>
      <ThemeProvider theme={themeStyle}>
        <AuthProvider>
          <UsersProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </UsersProvider>
        </AuthProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
