import React from 'react';
import styled from '@emotion/styled'

const Wrap = styled.div`
    display:flex;
    justify-content:space-between;
`

const MenuBtn = styled.div`
    background: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    z-index: 100;
    left: 0;
    display:flex;
    align-items:center;
    justify-content: center;
`

const MenuBtnWrap = styled.div`
    position: relative;
    width: 10px;
    height: 10px;
    cursor: pointer;
    
    span {
    position: absolute;
    top: 0;
    left:0;
    background:#0d0d0d;
    width: 10px;
    height: 2px;
    border-radius: 20px;
    overflow: hidden;
    transition: 0.3s ease-in-out;

    &:nth-of-type(2) {
        top: 50%;
        transform: translate(0, -50%);
    }
    
    &:last-of-type {
        top: auto;
        bottom: 0;
    }
    
}
`

const EtcBtn = styled.div`
    height:100%;
    background:${props => props.theme.colors.point};
    height:40px;
    display:flex;
    align-items:center;
    padding:0 25px;
    border-radius:20px;
    font-weight:700;
    font-size:18px; 
`

const SearchBar = styled.div`
    width:100%;
    background:#fff;
    margin:5px 0 0 0;
    border-radius: 25px;
    height: 70px;
    padding: 0 25px;

    input {
        height: 100%;
        border: none;
        font-size: 35px;
        font-weight: 500;
        background: none;

        &::placeholder {
            font-size: 35px;
            color: #0d0d0d;
            font-weight: 500;
        }
        
    }
    
`

function Header() {
    return (
        <div>
        <Wrap>
            <MenuBtn>
                <MenuBtnWrap>
                <span></span><span></span><span></span>
                </MenuBtnWrap>
            </MenuBtn>
            <EtcBtn>
            + SUBSCRIBE
            </EtcBtn>
        </Wrap>
        <SearchBar>
                <input placeholder="search.."/>
        </SearchBar>
        </div>
    )
}

export default Header



