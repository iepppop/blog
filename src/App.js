import { ThemeProvider } from '@emotion/react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import InspirationPage from './pages/InspirationPage.js';
import WritePage from './pages/WritePage.js';
import WorksPage from './pages/WorksPage.js';
import SubReviewItem from './components/SubReviewItem.js';
import ProfilePage from './pages/ProfilePage.js';
import { media } from './utils/media'

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

  ${media[0]} {
    width:100%;
    padding:5px 0 0 0;
  }
`

function App() {
  const [theme, setTheme] = useState(darkTheme);
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  useEffect(() => {
    if(location.pathname === '/'){
      navigate('/list/profile')
    }
    console.log(location)
  },[location.search])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthButtons toggleTheme={toggleTheme} />

      {!(location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/profile/edit') && <Wrap><Header /></Wrap>}

      <Routes>
        <Route path='/' element={<HomePage />} ></Route>
        <Route path='/login' element={<LoginPage />} ></Route>
        <Route path='/signup' element={<SignUpPage />} ></Route>
        <Route path='/profile/edit' element={<ProfileEditPage />} ></Route>
        <Route path="/write" element={<WritePage />} />
        <Route path="/list" element={<ListPage />}>
         <Route path="profile" element={<ProfilePage />} />
          <Route path="works" element={<WorksPage />} />
          <Route path="inspiration" element={<InspirationPage />} />
          <Route path="playlist" element={<PlayListPage />} />
          <Route path="review/:id" element={<SubReviewItem />} />
          <Route path="review" element={<ReviewPage />} >
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
