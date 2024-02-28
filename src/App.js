import logo from './logo.svg';
import { css, ThemeProvider } from '@emotion/react'
import { Route, Routes } from 'react-router-dom';
import AuthButtons from './nav/AuthButtons.js'
import GlobalStyle from './styles/global.js';
import LoginPage from './pages/LoginPage.js';
import { useState, useEffect } from 'react';
import { initializeAuth, loginUser, setLoading } from './features/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';
import SignUpPage from './pages/SignUpPage.js';
import ProfileEditPage from './pages/ProfileEditPage.js';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const lightTheme = {
  colors: {
    background: '#FFFFFF',
    subBg: '#f8f8f8',
    text: '#000000',
    border: '#eee',
    focus: '#1f1f1f',
  },
};

const darkTheme = {
  colors: {
    background: '#000000',
    subBg: '#1f1f1f',
    text: '#FFFFFF',
    border: '#373737',
    focus: '#eee',
  },
};


function App() {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  const dispatch = useDispatch();

  useEffect(() => {
        onAuthStateChanged(auth, (authUser) => {
          if(authUser){
            dispatch(loginUser({
              uid: authUser.uid,
              email: authUser.email,
              displayName: authUser.displayName,
              photoURL: authUser.photoURL,
            }))
            dispatch(setLoading(false))
          }
      })
  },[])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthButtons toggleTheme={toggleTheme} />
      <Routes>
        <Route path='/login' element={<LoginPage />} ></Route>
        <Route path='/signup' element={<SignUpPage />} ></Route>
        <Route path='/profile/edit' element={<ProfileEditPage />} ></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
