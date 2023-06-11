import GlobalStyles from '../src/styles/global';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import { lightTheme, darkTheme } from './styles/theme';
import { TodoList } from './components/TodoList';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import styled from 'styled-components';

const App: React.FC = () => {
  const [theme, setTheme] = useState<DefaultTheme>(lightTheme);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme === 'light' ? lightTheme : darkTheme);
    }
  }, []);

  const themeToggler = () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme.type);
  };

  return (
    <>
      <ThemeProvider theme={theme === lightTheme ? lightTheme : darkTheme}>
        <Header>📓 Todo List</Header>
        <TodoList />
        <Footer>Double click on todo to edit</Footer>
        <ThemeToggle onClick={themeToggler}>
          <DarkModeIcon fontSize="medium" />
        </ThemeToggle>
        <GlobalStyles />
      </ThemeProvider>
    </>
  );
};

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
`;

export const Header = styled.h1`
  text-align: center;
  font-size: 48px;
  padding: 50px 0 50px 0;
`;

export const Footer = styled.h6`
  text-align: center;
  font-size: 14px;
  font-weight: 200;
  font-style: italic;
  opacity: 0.5;
  padding-top: 25px;
  padding-bottom: 25px;
`;

export const ThemeToggle = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
`;

export default App;
