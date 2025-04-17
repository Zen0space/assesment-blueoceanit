import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease-in-out;
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  * {
    box-sizing: border-box;
  }
`;