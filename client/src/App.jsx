import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UsersProvider } from "./context/UsersContext.jsx";
import { ThemeContext } from "./context/ThemeContext.jsx";
import { Light, Dark } from "./styles/themes.jsx";
import AppContent from "./layout/AppContent.jsx";
import { ProductsProvider } from "./context/ProductContext.jsx";
import { OrdersProvider } from "./context/OrdersContext.jsx";

function App() {
  const [themeuse, setTheme] = useState("dark");
  const themeStyle = themeuse === "light" ? Light : Dark;

  return (
    <ThemeContext.Provider value={{ theme: themeuse, setTheme }}>
      <ThemeProvider theme={themeStyle}>
        <AuthProvider>
          <UsersProvider>
            <ProductsProvider>
              <OrdersProvider>
                <BrowserRouter>
                  <AppContent />
                </BrowserRouter>
              </OrdersProvider>
            </ProductsProvider>
          </UsersProvider>
        </AuthProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
