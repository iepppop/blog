import React from 'react';
import styled from '@emotion/styled'
import Login from '../auth/Login.js'

const Wrap = styled.div`
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
`
function LoginPage() {
  return (
    <Wrap>
      <Login />
    </Wrap>
  )
}

export default LoginPage


