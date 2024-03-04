import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react';
import { Star, ArrowRight } from "@phosphor-icons/react";

const ReviewListItemsWrap = styled.div`
    width:100%;
`

const ReviewListItemsUl = styled.ul`
    width:100%; 
    padding:20px 25px 25px 25px;
    display:flex;
    flex-direction:column;
    gap:20px;
`

const Summary = styled.div`
    font-size: 12px;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition: 0.3s ease-in-out;
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

const ReviewListItem = styled.div`
    width: 100%;
    height:300px;
    border-radius:25px;
    overflow:hidden;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(${props => props.imgUrl});
    background-size: cover; 
    background-position: center; 
    position:relative;
    cursor:pointer;

    &:hover{
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url(${props => props.imgUrl});
    }

    &:hover .summary{
        margin:15px 0 0 0;
        display:block;
        opacity:0.3;
        max-height: 50px; 
    }

    &:hover .hoverarrow{
        opacity:1;
    }
`

const ContentWrap = styled.div`
    display:flex;
    height:100%;
    align-items: flex-end;
`;

const Img = styled.img`
    width:500px;
`

const TitleWrap = styled.div`
    padding:30px;
    width:100%;
`

const Title = styled.div`
    font-size:25px;
    font-weight:600;
    position:relative;
    width:100%;
`

const Content = styled.div`
    margin:5px 0 0 0;
`

const Category = styled.div`
    position:absolute;
    top:30px;
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    left:30px;
    background:rgba(255,255,255, 0.1);
    border-radius:25px;
    padding:8px 15px;
    border:1px solid rgba(255,255,255, 0.3);
    font-size:13px;
`

const Sub = styled.div`
    font-size:12px;
    opacity:0.3;
    margin:5px 0 0 0;
`

const HoverArrow = styled.div`
   position:absolute;
   background:rgba(255,255,255, 0.1);
   border:1px solid rgba(255,255,255, 0.3);
   -webkit-backdrop-filter: blur(4px);
   backdrop-filter: blur(4px);
   border-radius:50%;
   width:35px;
   height:35px;
   display:flex;
   align-items:center;
   justify-content:center;
   right:30px;
   top:30px;
   opacity:0;
   transition:0.3s ease-in-out;
`

const LoadingReviewListItem = styled.div`
    width: 100%;
    height:300px;
    border-radius:25px;
    overflow:hidden;
    background:#f8f8f8;
    animation: ${skeletonAnimation} 1.8s infinite ease-in-out; 
    border-radius:25px;
    position:relative;
`

const LoadingCategory = styled.div`
    width:50px;
    height:33px;
    background:#f8f8f8;
    animation: ${skeletonAnimation} 1.8s infinite ease-in-out; 
    position:absolute;
    top:30px;
    left:30px;
    border-radius:25px;
    padding:8px 15px;
`

const LoadingTitle = styled.div`
    background:#f8f8f8;
    animation: ${skeletonAnimation} 1.8s infinite ease-in-out; 
    height:30px;
    width:30%;
    border-radius:25px;
    margin:0 0 4px 0;
`

const LoadingSub = styled.div`
    height:12px;
    margin:5px 0 0 0;
    background:#f8f8f8;
    opacity:0.8;
    width:10%;
    border-radius:25px;
    animation: ${skeletonAnimation} 1.8s infinite ease-in-out; 
`

function ReviewList({ data }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <ReviewListItemsWrap>
            {data ?
                <ReviewListItemsUl>
                    {data.map((item, index) => (
                        <div key={item.title}>
                            <img
                                src={item.Img}
                                alt="Item"
                                onLoad={() => setImageLoaded(true)}
                                style={{ display: 'none' }}
                            />
                            <ReviewListItem imgUrl={item.Img} imageLoaded={imageLoaded} style={{
                                backgroundImage: imageLoaded ? `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(${item.Img})` : '#f8f8f8'
                            }}>
                                <HoverArrow className="hoverarrow"><ArrowRight size={15} weight="light" /></HoverArrow>
                                <Category>{item.category}</Category>
                                <ContentWrap>
                                    <TitleWrap>
                                        <Title>{item.title}
                                        </Title>
                                        <Content>
                                            {[...Array(5)].map((_, index) => (
                                                <span key={index}>
                                                    <Star size={14} weight="fill" fill={index < item.star ? 'yellow' : 'grey'} />
                                                </span>
                                            ))}
                                        </Content>
                                        <Sub>
                                            {item.genre}
                                        </Sub>
                                        <Summary className='summary'>
                                            {item.summary}
                                        </Summary>
                                    </TitleWrap>
                                </ContentWrap>
                            </ReviewListItem>
                        </div>
                    ))}
                </ReviewListItemsUl>
                :
                <ReviewListItemsUl>
                    {[...Array(4)].map((_, index) => (
                        <LoadingReviewListItem key={index + 'num'}>
                            <LoadingCategory></LoadingCategory>
                            <ContentWrap>
                                <TitleWrap>
                                    <LoadingTitle>
                                    </LoadingTitle>
                                    <Content>
                                        {[...Array(5)].map((_, index) => (
                                            <span key={index}>
                                                <Star size={14} weight="fill" fill='#eee' />
                                            </span>
                                        ))}
                                    </Content>
                                    <LoadingSub>

                                    </LoadingSub>
                                    <Summary className='summary'>

                                    </Summary>

                                </TitleWrap>
                            </ContentWrap>
                        </LoadingReviewListItem>
                    ))}
                </ReviewListItemsUl>
            }
        </ReviewListItemsWrap>
    );
}

export default ReviewList