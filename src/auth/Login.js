import React, { useState } from 'react';
import styled from '@emotion/styled'
import google from '../images/google.png'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    return (
        <FormWrap onSubmit={async e => {
            e.preventDefault();
          }}>
            <InputName>아이디</InputName>
            <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            autoComplete="email"
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
          >로그인
          </LoginBtn>
          <RegisterBtn>
          회원가입
          </RegisterBtn>
          <SnsBtn
            type="submit"
          > <span>
              <Image src={google} width={12} height={12} />
            </span>
            구글로 로그인
          </SnsBtn>
        </FormWrap>
    )
}

export default Login