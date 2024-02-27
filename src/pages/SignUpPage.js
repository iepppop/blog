import React from 'react';
import styled from '@emotion/styled'
import SignUp from '../auth/SingUp';

const Wrap = styled.div`
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
`
function SignUpPage() {
  return (
    <Wrap>
      <SignUp />
    </Wrap>
  )
}

export default SignUpPage