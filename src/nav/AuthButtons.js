import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from "../firebase";
import { logout } from '../features/userSlice';

const AuthWrap = styled.div`
    position:fixed;
    top:15px;
    right:15px;
    display:flex;
    gap:5px;
`

const LoginButton = styled.button`
    background: ${props => props.theme.colors.subBg};
    padding:8px 20px;
    border-radius:20px;
    font-size:14px;
    border: 1px solid ${props => props.theme.colors.border};
`

const ToggleButton = styled.button`
    background: ${props => props.theme.colors.subBg};
    padding:8px 20px;
    border-radius:20px;
    font-size:14px;
    border: 1px solid ${props => props.theme.colors.border};
`

function AuthButtons({ toggleTheme }) {  
    const user = useSelector((state) => state.data.user.user);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout()); 
    };

    console.log(user)

    return (
        <AuthWrap>
              <LoginButton>{user ? user.username : null}</LoginButton>
            <LoginButton><Link to='login'>로그인</Link></LoginButton>
            <LoginButton onClick={handleLogout}>로그아웃</LoginButton>
            <ToggleButton onClick={toggleTheme}>ddd</ToggleButton>
        </AuthWrap>
    )
}

export default AuthButtons