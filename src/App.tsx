import GlobalStyles from '../src/styles/global';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import { lightTheme, darkTheme } from './styles/theme';
import { TodoList } from './components/TodoList';

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
        <h1>Hello</h1>
        <TodoList />
        <button onClick={themeToggler}>theme</button>
        <GlobalStyles />
      </ThemeProvider>
    </>
  );
};

export default App;
