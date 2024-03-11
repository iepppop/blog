import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled'
import ReviewList from '../components/ReviewList';
import { fetchData, setCategory } from '../features/dataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Wrap = styled.div`
    margin:0 auto;
    padding:25px;
`

const ImgWrap = styled.div`
    border-radius:25px;
    overflow:hidden;
`

const Content = styled.div`
`

function ProfilePage() {

  return (
    <Wrap>
        <ImgWrap>
        <img src="https://blog.kakaocdn.net/dn/cmybMk/btsFE3QqbHJ/IAhMikDNSKiZQmyuKxDmyk/img.gif" />
        </ImgWrap>
        <Content>
            {/* 좋아하는 것을 담은 블로그 */}
        </Content>
    </Wrap>
  )
}

export default ProfilePage