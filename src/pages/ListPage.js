import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Pencil } from '@phosphor-icons/react';
import { media } from '../utils/media'

const Wrap = styled.div`
    padding:0 0 30px 0;
    ${media[0]} {
        padding:0 10px;
    }
`

const ListWrap  = styled.div`
    width:700px;
    background:#fff;
    border-radius:25px;
    overflow:hidden;
    margin:0 auto;
    ${media[0]} {
        width: 100%;
      }
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
        cursor:pointer;
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

const WriteBtn = styled.div`
    position:absolute;
    right:25px;
    top:25px;
    border:1px solid #000;
    border-radius:50%;
    width:40px;
    height:40px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    transition:0.3s ease-in-out;

    svg{
        fill:black;
    }

    &:hover{
        opacity:0.5;
    }
`

function ListPage() {
    const [menuList, setMenuList] = useState([{ name: '프로필', url: '/list/profile', id: 0 }, { name: '리뷰', url: '/list/review?category=drama', id: 1 }, { name: '영감', url: '/list/inspiration', id: 2 }, { name: '음악', url: '/list/playlist', id: 3 }])
    const [currentMenu, setCurrentMenu] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    const movePage = (item) => {
        setCurrentMenu(item)
        navigate(item.url)
    }

    const handleWrite = () => {
        navigate(`/write?original=${encodeURIComponent(location.pathname)}`);
    };

    useEffect(() => {
        const path = location.pathname.split('/')[2];
        if (path) setCurrentMenu(menuList.find(menu => menu.url.includes(path))) 
        else setCurrentMenu({ name: '프로필', url: '/list/profile', id: 0 }) 
    }, [location.pathname])
    return (
        <Wrap>
            <ListWrap>
            <Box>
                <Profile>
                    <ProfileImg>
                        <Img src="https://blog.kakaocdn.net/dn/QrRmk/btsFyxRRe3u/lWvvbrlRcKPTg24U2aqcz0/img.jpg" />
                    </ProfileImg>
                    <ProfileInfo>
                        <span>my favorite things</span>
                        <span>@ohyesrim</span>
                    </ProfileInfo>
                    <WriteBtn onClick={()=>handleWrite()}>
                    <Pencil size={20}/>
                    </WriteBtn>
                </Profile>
                <MenuWrap>
                    {menuList.map((item, index) => (
                        <li key={index} style={{ fontWeight: currentMenu.id === index ? 800 : '600', opacity: currentMenu.id === index ? 1 : 0.3 }} onClick={() => movePage(item)} >
                           {item.name}
                        </li>
                    ))}
                    <CurrentBorder style={{ left: currentMenu.id * 25 + '%' }}></CurrentBorder>
                </MenuWrap>
                <Outlet />
            </Box>
            </ListWrap>
        </Wrap>
    )
}

export default ListPage


