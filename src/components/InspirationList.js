import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react';
import { Trash } from "@phosphor-icons/react";
import { useDispatch } from 'react-redux';
import { DeleteData, fetchData } from '../features/dataSlice'

const Wrap = styled.div`

`

const InspirationUl = styled.ul`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap:2px;
`

const skeletonAnimation = keyframes`
    0% {
        background-color: rgba(165, 165, 165, 0.1);
    }

    50% {
        background-color: rgba(165, 165, 165, 0.3);
    }

    100% {
        background-color: rgba(165, 165, 165, 0.1);
    }
`;


const InspirationItem = styled.li`
    aspect-ratio: 1 / 1;
    overflow:hidden;
    background:#f8f8f8;
    cursor:pointer;
    position:relative;

    .trash{
        opacity:0;
        z-index:-1;
        transition:0.3s ease-in-out;
    }

    &:hover .trash{
        opacity:1;
        z-index:1;
    }
    
`

const LoadingInspirationItem = styled.li`
    aspect-ratio: 1 / 1;
    overflow:hidden;
    background:#f8f8f8;
    animation: ${skeletonAnimation} 1.8s infinite ease-in-out; 
`

const TrashIcon = styled.button`
    position:absolute;
    right:15px;
    top:15px;
    background:rgba(0,0,0,0.4);
    width:40px;
    height:40px;
    border-radius:50%;
    overflow:hidden;
    align-items:center;
    cursor:pointer;
    justify-content:center;

    svg{
        fill:white;
        margin:5px 0 0 0;
    }
`


function InspirationList({ data }) {
    const dispatch = useDispatch();

    const handleDel = (item) => {
        const location = 'inspiration'
        dispatch(DeleteData({location , item }))    
    }

    useEffect(() => {
        // dispatch(fetchData('inspiration'))
      }, [data]);
    
    return (
        <Wrap>
            {data ?
                <InspirationUl>{data.map((item, index) => (<InspirationItem key={index} onClick={() => handleDel(item)}> 
                    <TrashIcon className='trash'><Trash size={15} /></TrashIcon>
                    <img src={item.thumbnail} />
                    </InspirationItem>))}</InspirationUl>
                :
                <InspirationUl>  {[...Array(9)].map((_, index) => (
                    <LoadingInspirationItem key={index}>

                    </LoadingInspirationItem>
                ))}</InspirationUl>
            }
        </Wrap>
    );
}

export default InspirationList