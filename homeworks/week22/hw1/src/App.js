import { GlobalStyle } from "./components/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { LoadingContext } from "./contexts/LoadingContext";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { getMe } from "./WebAPI";
import { getAuthToken, setAuthToken } from "./utiles";
import HomePage from "./pages/home-page/";
import AboutPage from "./pages/about-page/";
import AddPostPage from "./pages/add-post-page";
import SinglePostPage from "./pages/single-post-page/";
import SignUpPage from "./pages/sign-up-page";
import CategoriesPage from "./pages/categories-page";
import LoginPage from "./pages/log-in-page";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer"
import LoadingOverlay from "react-loading-overlay";
import styled from "styled-components";
LoadingOverlay.propTypes = undefined;

const StyledLoader = styled(LoadingOverlay)`
  & > ._loading_overlay_overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

const theme = {
  containerWidth: "1000px",
  green_100: "#53bd9580",
  green_400: "#53BD95",
  green_500: "#3e8e70",
  gray_100: "#E6E6E6",
  gray_300: "#caccd3",
  gray_400: "#737A96",
  blue_100: "#E2EEFF",
  blue_400: "#4C98FF",
  red_400: "#ed143d",
};

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    if (token === "null") return;
    getMe().then((res) => {
      if (res.ok === 1) {
        setUser(res.data);
      } else {
        setAuthToken(null);
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <AuthContext.Provider value={{ user, setUser }}>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/add-post" element={<AddPostPage />} />
              <Route path="/posts/:id" element={<SinglePostPage />} />
              <Route path="/log-in" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
            </Routes>
            <Footer />
            <StyledLoader
              active={isLoading}
              spinner={true}
              text="Loading your content..."
            ></StyledLoader>
          </Router>
        </AuthContext.Provider>
      </LoadingContext.Provider>
    </ThemeProvider>
  );
}

export default App;
