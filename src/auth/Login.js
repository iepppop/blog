import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled'
import google from '../images/google.png'
import github from '../images/github.png'
import { auth } from '../firebase'
import { login, googleLogin,githubLogin } from '../features/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { WarningCircle } from "@phosphor-icons/react";

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
    transition:0.3s ease-in-out;

    &:hover{
      opacity:0.7;
    }
`

const Image = styled.img`
  width:14px;
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


    &:nth-of-type(1) {
      margin:22px 0 0 0;
    }

    &:nth-of-type(2) {
      margin:5px 0 0 0;
    }

    span{
      display:flex;
      align-items:center;
    }

    transition:0.3s ease-in-out;

    &:hover{
      opacity:0.7;
    }
`

const RegisterBtn = styled.div`
    font-size:12px;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:25px 0 0 0;

    button{
      font-weight: 700;
      font-size:12px;
      margin:0 0 0 10px;
      transition:0.3s ease-in-out;

      &:hover{
        opacity:0.7;
      }
    }

    &:nth-of-type(2){
      margin:45px 0 0 0;
    }
`

const ErrMsg = styled.div`
    font-size:12px;
    display:flex;
    padding:10px 0 10px 0;
    gap:8px;
    color:red;
`


function Login({theme}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, isLoading, error } = useSelector((state) => state.data.user);
  const [errMsg, setErrMsg] = useState('')
  const dispatch = useDispatch();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [normal, setNormal] = useState('');
  const navigate = useNavigate();

  const handleLogin = (useremail, password) => {
    dispatch(login({ useremail, password }));
  };

  const handleGoogleLogin = ()=> {
    dispatch(googleLogin())
  }

  const handleGithubLogin = ()=> {
    dispatch(githubLogin())
  }

  useEffect(() => {
    setNormal(emailInputRef.current.style.border);
  },[])

  useEffect(() => {
    emailInputRef.current.style.border = normal;
    passwordInputRef.current.style.border = normal;
    console.log(normal)
    if (error === '이메일 형식이 아닙니다.' || error === '가입되어 있지 않은 계정입니다.') {
      emailInputRef.current.focus();
      emailInputRef.current.style.border = '1px solid red'
    } else if (error === '비밀번호가 다릅니다.') {
      passwordInputRef.current.focus();
      passwordInputRef.current.style.border = '1px solid red'
    }
  }, [error]);

  useEffect(() => {
    if(user){
      navigate('/')
    }
  },[user])

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
    <FormWrap onSubmit={e => {
      e.preventDefault();
      handleLogin(email, password);
    }}>
      <InputName>아이디</InputName>
      <Input
        ref={emailInputRef}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
      // autoComplete="email"
      />
      <InputName>비밀번호</InputName>
      <Input
        ref={passwordInputRef}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        type="password"
        autoComplete="password"
      />
      {error && <ErrMsg>
        <WarningCircle size={13} />{error}
      </ErrMsg>}
      <LoginBtn
        type="submit"
      >로그인
      </LoginBtn>
      </FormWrap>
      <RegisterBtn>
        SNS로 간편하게 로그인
      </RegisterBtn>
      <SnsBtn
        type="submit"
        onClick={handleGoogleLogin}
      > <span>
          <Image src={google} width={12} height={12} />
        </span>
        구글로 로그인
      </SnsBtn>
      <SnsBtn
        type="submit"
        onClick={handleGithubLogin}
      > <span>
          <Image src={github} width={12} height={12} />
        </span>
        깃헙으로 로그인
      </SnsBtn>
      <RegisterBtn>
        <span>아직 회원이 아니세요?</span>
        <Link to={'/signup'}>
          <button>회원가입</button>
        </Link>
      </RegisterBtn>
    </div>
  )
}

export default Login