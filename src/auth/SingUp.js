import React, { useState } from 'react';
import styled from '@emotion/styled'
import google from '../images/google.png'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'
import { signUp } from '../features/userSlice.js';
import { useDispatch } from 'react-redux';

const FormWrap = styled.form`
    display:flex;
    flex-direction:column;
    gap: 5px;
`

const Input = styled.input`
    background:${props => props.theme.colors.subBg};
    border:1px solid ${props => props.theme.colors.border};
    color:${props => props.theme.colors.text};
    border-radius:5px;
    padding:10px 15px;
    height:45px;
    width:280px;
    &:focus {
        border-color: 1px solid ${props => props.theme.colors.focus}; 
    }
`

const InputName = styled.span`
    font-size:12px;
    font-weight:800;

    &:nth-of-type(2){ 
    margin:10px 0 0 0;
    }

    &:nth-of-type(3){ 
    margin:10px 0 0 0;
    }
`

const LoginBtn = styled.button`
    height:45px;
    width:280px;
    display:flex;
    align-items:center;
    justify-content:center;
    background:${props => props.theme.colors.text};
    color:${props => props.theme.colors.background};
    border-radius:5px;
    font-size:12px;
    font-weight:900;
    margin:10px 0 0 0;
`

const Image = styled.img`

`

const SnsBtn = styled.button`
    background:${props => props.theme.colors.subBg};
    border:1px solid ${props => props.theme.colors.border};
    color:${props => props.theme.colors.text};
    border-radius:5px;
    padding:10px 15px;
    height:45px;
    width:280px;
    font-size:12px;
    display:flex;
    gap:10px;
    align-items:center;
    justify-content:center;
`

const RegisterBtn = styled.div`
    font-size:12px;
    height:50px;
    display:flex;
    align-items:center;
    justify-content:center;
`

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const dispatch = useDispatch();

    const handleSignUp = (email, password,username) => {
        dispatch(signUp(email, password,username));
    };

    return (
        <FormWrap onSubmit={e => {
            e.preventDefault();
            handleSignUp(email, password, username);
        }}>
            <InputName>이메일</InputName>
            <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
            // autoComplete="email"
            />
            <InputName>닉네임</InputName>
            <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                type="text"
            // autoComplete="email"
            />
            <InputName>비밀번호</InputName>
            <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                autoComplete="password"
            />
            <LoginBtn
                type="submit"
            >회원가입
            </LoginBtn>
        </FormWrap>
    )
}

export default SignUp