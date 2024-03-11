import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react';
import { Star, ArrowRight } from "@phosphor-icons/react";
import { Outlet, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import SubReviewItem from './SubReviewItem';
import { media } from '../utils/media'

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
    aspect-ratio:2.2/1;
    border-radius:25px;
    overflow:hidden;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(${props => props.imgUrl});
    background-size: cover; 
    background-position: center; 
    position:relative;
    cursor:pointer;

    ${media[0]} {
        aspect-ratio:1.8/1;
    }

    &:hover{
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url(${props => props.imgUrl});
    }

    &:hover .summary{
        margin:15px 0 0 0;
        display:block;
        opacity:0.3;
        max-height: 50px; 
        @media (max-width: 555px) {
            display: none;
        }
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

    ${media[0]} {
        font-size:18px;
    }
`

const Content = styled.div`
    margin:5px 0 0 0;

    span{
        svg{
            @media (max-width: 555px) {
                width:10px;
            }
        }
    }
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

    ${media[0]} {
        font-size:10px;
    }
`

const Sub = styled.div`
    font-size:12px;
    opacity:0.3;
    margin:5px 0 0 0;
    @media (max-width: 555px) {
        display: none;
    }
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

const NoData = styled.div`
    min-height:300px;
    display:flex;
    align-items:Center;
    justify-content:Center;
    color:#000;
`

const BookWrap = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap:20px;
    ${media[0]} {
        grid-template-columns: 1fr;
      }
`

const BookItem = styled.div`
    width:100%;
    height:240px;
    overflow:hidden;
    position:relative;
    border-radius:25px;
    display:flex;
    justify-content:flex-end;
    
    &:hover .bookImg {
        transform:rotate(20deg)
    }
`

const LoadingBookItem = styled.div`
    height:240px;
    overflow:hidden;
    position:relative;
    border-radius:25px;
    display:flex;
    justify-content:flex-end;
    background:#f8f8f8;
    animation: ${skeletonAnimation} 1.8s infinite ease-in-out; 
`

const BookBg = styled.div`
    background-image: linear-gradient(rgba(216, 216, 216, 0.5), rgba(216, 216, 216, 0.5)), url(${props => props.imageUrl});
    background-size:300% 300%;
    background-position:center right;
    height:100%;
    width:100%;
    filter: blur(60px);
    -webkit-filter: blur(60px);
    opacity:0.6;
    position:absolute;
    top:0;
    left:0;
`

const BookContent = styled.div`
    color: black;
    width:63%;
    background:none;
    padding:30px 0 0 0;
    position:relative;
    color:#434343;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    height:100%;
    text-align:right;
    
`

const BookImg = styled.div`
    position:absolute;
    top:40px;
    width:100px;
    left:40px;
    opacity:0.9;
    border-radius:0 5px 10px 0;
    box-shadow:5px 5px 15px #c5c5c5;
    overflow:hidden;
    transition:0.3s ease-out;

    img{
        height:100%;
    }
`

const BookStory = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-end;
    flex:1;
    padding:0 30px 0 0;
    span{    
        svg{
            width:11px;
            opacity:0.7;
        }
    }
`

const BookFooter = styled.div`
    display:flex;
    flex-direction:column; 
    padding:0 30px 30px 0;
    font-size:12px;

    span:first-of-type{
        color:#b6b6b6;
        font-weight:600;

        @media (max-width: 555px) {
            font-size:11px;
        }
    }

    span:last-of-type{
        font-weight:700;
        margin:2px 0 0;
        font-size:13px;
        color:#434343;
        opacity:0.9;
        @media (max-width: 555px) {
            font-size:11px;
        }
    }
`

const BookStorySum = styled.div`
    div{
        font-family: "Nanum Myeongjo", serif;
        font-weight: 600;

        @media (max-width: 555px) {
            font-size:12px;
        }
    }
    p{
        font-family: "Nanum Myeongjo", serif;
        font-weight: 600;
    }
    display:flex;
    text-align:right;
    font-size:14px;
    line-height:22px;
    padding:20px 0;
    align-items:flex-end;
    flex:1;
    // border:3px solid red;
`

function ReviewList({ data }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigate = useNavigate();
    let { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    const moveSubPage = (id) => {
        navigate(`/list/review/${id}?category=drama`, { state: { data } });
    }
    return (
        <ReviewListItemsWrap>
            {data ?
                <ReviewListItemsUl>
                    {data.length === 0 && <NoData>게시물이 없습니다.</NoData>}
                    {category === 'book' ?
                        <BookWrap>
                            {data.map((item, index) => (
                                <BookItem key={item.title}>
                                    <BookBg imageUrl={item.Img}>                             </BookBg>
                                    <BookImg className='bookImg'><img src={item.Img} /></BookImg>
                                    <BookContent>
                                        <BookStory>
                                            <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 214.005 203.18" x="0px" y="0px"><path d="M125.146,147.52q-14.44-15-14.432-41.508,0-57.718,77.741-106.012l5.3,8.231q-54.78,35.928-54.773,71.854c0,.287.045.523.045.8a45.148,45.148,0,0,1,64.277,63.074c-.537.706-1.246,1.35-1.83,2.026-.283.3-.542.6-.831.887a42.618,42.618,0,0,1-3.362,3.591q-13.539,12.082-35.632,12.081T125.146,147.52Zm-110.718-.006Q0,132.514,0,106,0,48.3,77.735,0l5.307,8.235C47.278,31.7,29.152,55.154,28.411,78.6a44.986,44.986,0,0,1,71.683,42.354c0,.137.023.231.023.36q0,17.068-13.546,29.145T50.94,162.53Q28.857,162.53,14.428,147.514Z" /><text x="0" y="177.544" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"></text></svg></span>
                                            <BookStorySum>    <div dangerouslySetInnerHTML={{ __html: item.summary }} /></BookStorySum>
                                        </BookStory>
                                        <BookFooter>
                                            <span>p 78</span>
                                            <span>{item.title}</span>
                                        </BookFooter>

                                    </BookContent>
                                </BookItem>
                            ))}
                        </BookWrap>
                        :
                        <>
                            {data.map((item, index) => (
                                <div key={item.title} onClick={() => moveSubPage(item.id)}>
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
                            ))}</>
                    }

                </ReviewListItemsUl>
                :
                <ReviewListItemsUl>

                    {category === 'book' ?
                        <BookWrap>
                            {[...Array(4)].map((_, index) => (
                                <LoadingBookItem key={index}>
                                    <></>
                                </LoadingBookItem>
                            ))}
                        </BookWrap>
                        :
                        <ReviewListItemsUl>
                            {[...Array(4)].map((_, index) => (
                                <LoadingReviewListItem key={index + 'num'}>
                                    <LoadingCategory></LoadingCategory>
                                    <ContentWrap>
                                        <TitleWrap>
                                            <LoadingTitle></LoadingTitle>
                                            <Content>
                                                {[...Array(5)].map((_, index) => (
                                                    <span key={index}>
                                                        <Star size={14} weight="fill" fill='#eee' />
                                                    </span>
                                                ))}
                                            </Content>
                                            <LoadingSub></LoadingSub>
                                            <Summary className='summary'></Summary>
                                        </TitleWrap>
                                    </ContentWrap>
                                </LoadingReviewListItem>
                            ))}
                        </ReviewListItemsUl>
                    }
                </ReviewListItemsUl>
            }
        </ReviewListItemsWrap>
    );
}

export default ReviewList