import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled'
import { Link, useNavigate, useLocation  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from "../firebase";
import { logout } from '../features/userSlice';
import { media } from '../utils/media';

const AuthWrap = styled.div`
    position:fixed;
    top:15px;
    right:15px;
    display:flex;
    gap:5px;

    ${media[0]} {
        display:none;
      }
`

const LoginButton = styled.button`
    background: ${props => props.theme.colors.subBg};
    padding:8px 20px;
    border-radius:20px;
    font-size:14px;
    border: 1px solid ${props => props.theme.colors.border};
`

const ToggleButton = styled.button`
    position:fixed;
    left:15px;
    background: ${props => props.theme.colors.subBg};
    padding:8px 20px;
    border-radius:20px;
    font-size:14px;
    border: 1px solid ${props => props.theme.colors.border};
`

const ProfileWrap = styled.div`
    position:relative;
`

const Profile = styled.div`
    width:35px;
    height:35px;
    cursor:pointer;
    overflow:hidden;
    border-radius:50%;
    border:1px solid ${props => props.theme.colors.border};
`

const ProfileInfo = styled.div`
    position:absolute;
    top:40px;
    right:0px;
    z-idnex:1;
    width:300px;
    border: 1px solid ${props => props.theme.colors.border};
    border-radius:10px;
    background:${props => props.theme.colors.background};
    height:0;
    opacity:0;
    overflow:hidden;
`

const InfoImg = styled.div`
    width:80px;
    height:80px;
    margin:50px auto 30px auto;
    oveflow:hidden;

    img{
        border:3px solid ${props => props.theme.colors.border};
        border-radius:50%;
    }
`

const InfoText = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;

    span:first-of-type{
        font-weight:800;
    }

    span:last-child{
        font-size:12px;
        color:gray;
        opacity:0.5;
        font-weight:600;
    }
`
const Modify = styled.div`
    padding:30px 0 20px 0;
    width:100%;
    button:first-of-type{
        margin:0 auto;
        background:${props => props.theme.colors.subBg};
        border:1px solid ${props => props.theme.colors.border};
        color:${props => props.theme.colors.text};
        border-radius:5px;
        padding:10px 15px;
        height:45px;
        width:80%;
        font-size:12px;
        display:flex;
        gap:10px;
        align-items:center;
        justify-content:center;
        transition:0.2s ease-in;

        :hover{
            opacity:0.6;
        }
    }
    button:last-child{
        width:100%;
        margin:20px 0 0 0;
        text-align:center;
        font-size:12px;
        transition:0.2s ease-in;
        color:${props => props.theme.colors.text};

        :hover{
            opacity:0.6;
        }
    }
`

const Img = styled.img`

`


function AuthButtons({ toggleTheme }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const profileRef = useRef();
    const tl = useRef();
    const user = useSelector((state) => state.data.user.user);

    const handleLogout = () => {
        dispatch(logout());
    };

    function openProfile(){
        tl.current.reversed(!tl.current.reversed());
    };

    const moveEditPage = () =>{
        tl.current.reversed(!tl.current.reversed());
        navigate('/profile/edit');
    }

    useEffect(() => {
        if(profileRef.current){
            tl.current = gsap
            .timeline()
            .to(profileRef.current, { opacity: 1, ease: "none"},0)
            .to(profileRef.current, { height: '325px', ease: "power1.out"},0.2)
            .reverse();
        }
    }, [user]);

    useEffect(() => {
        if(profileRef.current)  tl.current.reverse()
    }, [location]);
    

    return (
        <div>
            <AuthWrap>
            {user ?
                <ProfileWrap>
                    <Profile onClick={openProfile}>
                        <Img src={!auth.currentUser.photoURL ? 'https://blog.kakaocdn.net/dn/yacY3/btrE5gQ0V4f/qikIkKvyENANHyvoeGZTX0/img.png' : auth.currentUser.photoURL} />
                    </Profile>
                <ProfileInfo ref={profileRef}>
                        <div className="box">
                        <InfoImg>
                            <Img src={auth.currentUser.photoURL} />
                        </InfoImg>
                        <InfoText>
                            <span>{auth.currentUser.displayName}</span>
                            <span>{auth.currentUser.email}</span>
                        </InfoText>
                        <Modify>
                            <button onClick={moveEditPage}>프로필 편집</button>
                            <button onClick={handleLogout}>로그아웃</button>
                        </Modify>
                        </div>
                    </ProfileInfo>
                </ProfileWrap>
                :
                <div>
                   { !(location.pathname === '/login' || location.pathname === '/signup') ? <LoginButton><Link to='/login'>로그인</Link></LoginButton> : null }
                </div>
            }
            {/* <ToggleButton onClick={toggleTheme}>ddd</ToggleButton> */}
        </AuthWrap> 
        </div>
    )
}

export default AuthButtons