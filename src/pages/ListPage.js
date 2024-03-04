import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Wrap = styled.div`
    width:700px;
    background:#fff;
    margin:0 auto;
    border-radius:25px;
    overflow:hidden;
`

const Box = styled.div`
    background: ${props => props.theme.colors.text};
`

const Profile = styled.div`
    display:flex;
    position:relative;
    gap:15px;
    padding:25px 25px 5px 25px;
`

const ProfileImg = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    overflow:hidden;
    border:1px solid #eee;
`

const Img = styled.img`
    display:flex;
    position:relative;
`

const ProfileInfo = styled.div`
    color:#0d0d0d;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:1px;

    span{
        &:nth-of-type(1){
            font-weight:600;
            font-size:14px;
        }
        &:nth-of-type(2){
            font-weight:500;
            font-size:13px;
            opacity:0.6;
        }
    }
`

const MenuWrap = styled.ul`
    display:flex;
    width:100%;
    height:50px;
    align-items:center;
    position:relative;
    li{
        width:25%;
        color:black;
        text-align:center;
        font-weight:600;
        a{
            color:black;
        }
    }
    border-bottom:1px solid #eeee;
`

const CurrentBorder = styled.div`
    position:absolute;
    bottom:0;
    left:0;
    width:25%;
    height:2px;
    background:#000;
    transition:0.3s ease-in-out;
`

function ListPage() {
    const [menuList, setMenuList] = useState([{ name: '전체', url: '/list', id: 0 }, { name: '리뷰', url: '/list/review', id: 1 }, { name: '영감', url: '/list/inspiration', id: 2 }, { name: '플레이리스트', url: '/list/playlist', id: 3 }])
    const [currentMenu, setCurrentMenu] = useState({});
    const location = useLocation();

    const movePage = (item) => {
        setCurrentMenu(item)
    }

    useEffect(() => {
        const path = location.pathname.split('/')[2];
        if (path) {  
            setCurrentMenu(menuList.find(menu => menu.url.includes(path))) 
        }else{
            setCurrentMenu({ name: '전체', url: '/list', id: 0 }) 
        };
    }, [location.pathname])
    return (
        <Wrap>
            <Box>
                <Profile>
                    <ProfileImg>
                        <Img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FHPhx1%2FbtsAJhd9s2r%2F1tbQYqQtZZePLBUQGWUYr0%2Fimg.jpg" />
                    </ProfileImg>
                    <ProfileInfo>
                        <span>my favorite things</span>
                        <span>@ohyesrim</span>
                    </ProfileInfo>
                </Profile>
                <MenuWrap>
                    {menuList.map((item, index) => (
                        <li key={index} style={{ fontWeight: currentMenu.id === index ? 800 : '600', opacity: currentMenu.id === index ? 1 : 0.3 }} onClick={() => movePage(item)} >
                            <Link to={item.url}>{item.name}</Link>
                        </li>
                    ))}
                    <CurrentBorder style={{ left: currentMenu.id * 25 + '%' }}></CurrentBorder>
                </MenuWrap>
                <Outlet />
            </Box>
        </Wrap>
    )
}

export default ListPage


