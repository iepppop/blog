import logo from './logo.svg';
import { css, ThemeProvider } from '@emotion/react'
import { Route, Routes } from 'react-router-dom';
import AuthButtons from './nav/AuthButtons.js'
import GlobalStyle from './styles/global.js';
import LoginPage from './pages/LoginPage.js';
import { useState } from 'react';

const lightTheme = {
  colors: {
    background: '#FFFFFF',
    subBg: '#f8f8f8', 
    text: '#000000',
    border: '#eee',
    focus:'#1f1f1f',
  },
};

const darkTheme = {
  colors: {
    background: '#000000',
    subBg: '#1f1f1f',
    text: '#FFFFFF',
    border:'#373737',
    focus:'#eee',
  },
};


function App() {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthButtons toggleTheme={toggleTheme}/>
      <Routes>
        <Route path='/login' element={<LoginPage />} >
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
