import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { FaSun, FaMoon, FaTrain } from 'react-icons/fa';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.surface};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  transition: color 0.2s ease-in-out;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s ease-in-out;
  
  &:hover {
    background-color: ${({ theme }) => theme.background};
  }
`;

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <StyledHeader>
      <Logo to="/">
        <FaTrain />
        <span>TrainTicket</span>
      </Logo>
      
      <Nav>
        <NavLink to="/">Home</NavLink>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </ThemeToggle>
      </Nav>
    </StyledHeader>
  );
};

export default Header;