import React from 'react';
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';

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
    const theme = useTheme();
    return (
        <AuthWrap>
            <LoginButton><Link to='login'>로그인</Link></LoginButton>
            <ToggleButton onClick={toggleTheme}>ddd</ToggleButton>
        </AuthWrap>
    )
}

export default AuthButtons