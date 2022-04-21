import { Link as NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MEDIA_PC } from "../constants/breakpoint";
import { MEDIA_HOVER } from "../constants/hover";
import { AuthContext } from "../contexts/AuthContext";
import { setAuthToken } from "../utiles";
import styled from "styled-components";

const HamBurgerConfig = {
  width: 32,
  height: 24,
  weight: 4,
};

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 85px;
  background-color: white;
  box-shadow: 0px 2px 4px 0px ${({ theme }) => theme.gray_100};
  z-index: 100;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.containerWidth};
  padding: 20px;
  margin: 0 auto;
  height: 100%;
`;

const LogoBlock = styled.div``;

const Logo = styled(NavLink)`
  display: block;
  color: ${({ theme }) => theme.green_400};
  font-size: 1.5em;
  font-weight: bold;
`;

const HamburgerSecondWrapper = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${HamBurgerConfig.width}px;
  height: ${HamBurgerConfig.height}px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  ${MEDIA_PC} {
    display: none;
  }

  ${({ $isMenuOpen }) =>
    $isMenuOpen &&
    `
    & > ${HamburgerSecondInner} {
      transform: rotate(135deg);
    }
    & > ${HamburgerSecondInner}::before {
      transform: rotate(90deg);
    }
    & > ${HamburgerSecondInner}::after {
      transform: rotate(90deg);
    }
  `}
`;

const HamburgerSecondInner = styled.span`
  width: ${HamBurgerConfig.width}px;
  height: ${HamBurgerConfig.weight}px;
  background-color: ${({ theme }) => theme.green_400};
  transition: all 0.5s ease-in-out;
  border-radius: 4px;
  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 32px;
    height: ${HamBurgerConfig.weight}px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.green_400};
    transition: all 0.3s ease-in-out;
  }
  &::before {
    transform: translateY(
      -${Math.floor((HamBurgerConfig.height - HamBurgerConfig.weight) / 2)}px
    );
  }
  &::after {
    transform: translateY(
      ${Math.floor((HamBurgerConfig.height - HamBurgerConfig.weight) / 2)}px
    );
  }
`;

const Nav = styled.nav`
  position: absolute;
  top: 85px;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 0 20px;
  ${({ $isMenuOpen }) => ($isMenuOpen ? "display: block" : "display: none")};
  ${MEDIA_PC} {
    position: static;
    display: flex;
    width: auto;
  }
`;
const List = styled.ul`
  list-style-type: none;
  padding-bottom: 20px;
  ${MEDIA_PC} {
    display: flex;
    align-items: center;
    padding-bottom: 0;
  }
`;
const Item = styled.li`
  margin-top: 10px;
  ${MEDIA_PC} {
    margin-top: 0;
    margin-left: 10px;
  }
`;
const StyledLink = styled(NavLink)`
  position: relative;
  display: block;
  padding: 8px;
  &::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.green_400};
    transition: width 0.3s;
  }
  ${MEDIA_HOVER} {
    &:hover::after {
      width: 100%;
    }
  }
  ${MEDIA_PC} {
    ${({ $active }) => $active && `&::after{width: 100%}`};
  }
`;

const LogOutButton = styled.button`
  position: relative;
  display: block;
  padding: 8px;
  background-color: transparent;
  border: none;
  text-align: left;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  cursor: pointer;
  width: 100%;
  &::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.green_400};
    transition: width 0.3s;
  }
  &:hover::after {
    width: 100%;
  }
`;

const SignUpLink = styled(NavLink)`
  display: block;
  color: white;
  background-color: ${({ theme }) => theme.green_400};
  padding: 12px 16px;
  border-radius: 4px;
`;

export default function NavBar() {
  const history = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setAuthToken(null);
    setUser(null);
    setIsMenuOpen(false);
    history("/");
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <Wrapper>
      <Container>
        <LogoBlock>
          <Logo to="/">Peanu's blog</Logo>
        </LogoBlock>

        <HamburgerSecondWrapper
          $isMenuOpen={isMenuOpen}
          onClick={handleToggleMenu}
        >
          <HamburgerSecondInner />
        </HamburgerSecondWrapper>

        <Nav $isMenuOpen={isMenuOpen}>
          <List>
            <Item>
              {user && (
                <StyledLink
                  to="/add-post"
                  $active={location.pathname === "/add-post"}
                >
                  Add Post
                </StyledLink>
              )}
            </Item>
            <Item>
              <StyledLink
                to="/categories"
                $active={location.pathname === "/categories"}
              >
                Categories
              </StyledLink>
            </Item>
            <Item>
              <StyledLink to="/about" $active={location.pathname === "/about"}>
                About Me
              </StyledLink>
            </Item>
            <Item>
              {!user && (
                <StyledLink
                  to="/log-in"
                  $active={location.pathname === "/log-in"}
                >
                  Log in
                </StyledLink>
              )}
            </Item>
            <Item>
              {user && (
                <LogOutButton onClick={handleLogout}>Log out</LogOutButton>
              )}
            </Item>
            <Item>
              <SignUpLink to="/sign-up">Sign up</SignUpLink>
            </Item>
          </List>
        </Nav>
      </Container>
    </Wrapper>
  );
}
