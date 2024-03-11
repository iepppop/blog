import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled'
import { auth } from '../firebase'
import { ArrowRight } from "@phosphor-icons/react";

const Wrap = styled.div`

`

const WriteWrap = styled.div`
    display:flex;
    padding:0 25px 25px 25px;
    gap:10px;
`

const ProfileWrap = styled.div`
    width:45px;
    height:45px;
    border-radius:50%;
    overflow:hidden;
`

const WriteInput = styled.div`
    flex:1;
    display:flex;
    border:1px solid #eee;
    background:#f8f8f8;
    border-radius:25px;
    height:48px;
    padding:5px;

    input{
        width:100%;
        padding:0 15px;

        &::placeholder{
            font-weight:600;
        }
    }
`


const Btn = styled.button`
    width:35px;
    aspect-ratio:1/1;
    height:35px;
    background:#000;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;

    svg{
        fill:white;
    }
`

function Comments({ data }) {

    return (
    <Wrap>
        {auth.currentUser && 
            <WriteWrap>
               <ProfileWrap>
               <img src={auth.currentUser.photoURL}/>
               </ProfileWrap>
               <WriteInput>
                    <input type="text" placeholder="댓글을 남겨주세요." /><Btn><ArrowRight size={15}  weight="bold" /></Btn>
               </WriteInput>
            </WriteWrap>
    }
    </Wrap>
    );
}

export default Comments