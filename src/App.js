import { ThemeProvider } from '@emotion/react'
import { Route, Routes, useLocation } from 'react-router-dom';
import AuthButtons from './nav/AuthButtons.js'
import GlobalStyle from './styles/global.js';
import LoginPage from './pages/LoginPage.js';
import { useState, useEffect } from 'react';
import { checkUser } from './features/userSlice.js';
import { useDispatch } from 'react-redux';
import SignUpPage from './pages/SignUpPage.js';
import ProfileEditPage from './pages/ProfileEditPage.js';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import HomePage from './pages/HomePage.js';
import ListPage from './pages/ListPage.js';
import Header from './nav/Header.js';
import styled from '@emotion/styled';
import PlayListPage from './pages/PlayListPage.js';
import ReviewPage from './pages/ReviewPage.js';

gsap.registerPlugin(useGSAP);

const lightTheme = {
  colors: {
    background: '#FFFFFF',
    subBg: '#f8f8f8',
    text: '#000000',
    border: '#eee',
    focus: '#1f1f1f',
    point: '#0069ff'
  },
};

const darkTheme = {
  colors: {
    background: '#000000',
    subBg: '#1f1f1f',
    text: '#FFFFFF',
    border: '#373737',
    focus: '#eee',
    point: '#0069ff'
  },
};

const Wrap = styled.div`
  margin:0 auto;
  padding:30px 0 5px 0;
  width:700px;
`

function App() {
  const [theme, setTheme] = useState(darkTheme);
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, []); 

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthButtons toggleTheme={toggleTheme} />
 
      {!(location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/profile/edit') &&           <Wrap><Header /></Wrap> }
   
      <Routes>
        <Route path='/' element={<HomePage />} ></Route>
        <Route path='/login' element={<LoginPage />} ></Route>
        <Route path='/signup' element={<SignUpPage />} ></Route>
        <Route path='/profile/edit' element={<ProfileEditPage />} ></Route>
        <Route path="/list" element={<ListPage />}>
          <Route path="playlist" element={<PlayListPage />} />
          <Route path="review" element={<ReviewPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
