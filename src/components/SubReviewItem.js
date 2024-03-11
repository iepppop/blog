import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Star, ArrowLeft,CircleNotch } from "@phosphor-icons/react";
import Comments from './Comments';
import { keyframes } from '@emotion/react';
import { media } from '../utils/media';

const Wrap = styled.div`
    overflow:hidden;
    width:100%;
`

const BgWrap = styled.div`
    // background:rgba(0,0,0,0.7);   
    // -webkit-backdrop-filter: blur(4px);
    // backdrop-filter: blur(4px);
    // width:100%;
    // height:100vh;
    // left:0;
    // top:0;
`

const Box = styled.div`
    position:relative;
    width:100%;
    height:max-content;
`

const Img = styled.img`
    
`

const BoxWrap = styled.div`
    width:100%;
`

const TopImg = styled.div`
    position:absolute;
    left:0;
    z-index:0;
    width:100%;
`

const TopImage = styled.div`
    position:relative;
    filter: blur(0.2px);
    width:100%;
    height:100%;

    img{
        width:105%;
        height:100%;
        object-fit:cover;
        position:relative;
        left:-10px;
        top:-60px;

        ${media[0]} {
           top:-30px;
        }
    }
`

const TopBg = styled.div`
    position:absolute;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6));
    z-index:99;
    top:0;
    left:0;
    width:100%;
    height:200px;
`

const ContentBox = styled.div`
    background:#fff;
    border-radius:25px 25px 0 0;
    padding:2px 0 0 0;
    z-index:100;
    position:relative;
`

const ContentWrap = styled.div`
    color:#1c1c1c;
    padding:200px 0 0 0;
    position:relative;
    z-index:200;


    ${media[0]} {
        padding:100px 0 0 0;
     }
`
const TitleWrap = styled.div`
    margin:30px;
    border-bottom:1px solid #eee;
    position:relative;
`

const Title = styled.div`
    font-size:35px;
    font-weight:700;
    opacity:0.8;
    ${media[0]} {
        font-size:30px;
     }
`

const TitleSub = styled.div`
    font-size:14px;
    color:#8f8f8f;
    font-weight:600;
    padding:20px 0 30px 0;
    opacity:0.5;
`

const Age = styled.div`
    background:red;
    position:absolute;
    top:10px;
    right:0;
    color:#fff;
    border-radius:50%;
    font-size:12px;
    width:25px;
    height:25px;
    display:flex;
    padding:0 0 0 1px;
    font-weight:800;
    align-items:center;
    justify-content:center;
`

const StarWrap = styled.div`
    margin:5px 0 0 0;
`

const ReviewContent = styled.div`
    padding:0 25px 25px 25px;

    p{
        margin:10px 0 0 0;
    }
`

const FooterCate = styled.div`
    color:black;
    padding:0 25px 25px 25px;
    display:flex;
    gap:10px;

    span{
        border:1px solid #eee;
        padding:8px 16px;
        border-radius:25px;
        opacity:0.9;
        font-size:13px;
        font-weight:600;
    }
`

const Backbtn = styled.button`
    position:absolute;
    top:25px;
    left:25px;
    z-index:9999;
    color:#fff;
    display:flex;
    align-items:Center;
    gap:20px;
    border:1px solid #eee;
    backdrop-filter: blur(4px);
    border-radius:25px;
    padding:5px 15px;

    svg{
        fill:white;
    }
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

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;


const LoadingBoxWrap = styled.div`
    min-height:600px;
    display:flex;
    align-items:Center;
    justify-content:center;

    svg{
        animation:${rotate360} 1.4s linear infinite;
    }
`


function SubReviewItem() {
    let { id } = useParams();
    const navigate = useNavigate();
    const [detailData, setDetailData] = useState([]);
    const location = useLocation();
    const [loading, setLoading] = useState(true);
   

    const fetchData = async () => {
        try {
            const docRef = doc(db, "list", "6rIGBZV7WPHNUXGm3KyY", "review", `${id}`);
            const docSnap = await getDoc(docRef);
            setDetailData(docSnap.data())
            setTimeout(()=>{
                setLoading(false);
            },[300])
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData()
    }, [id])

    const goBack = () => {
        navigate('/list/review')
    }

    return (
        <Wrap>
            <BgWrap onClick={() => goBack()}></BgWrap>
            <Box>
                {!loading  ?
                    <BoxWrap>
                        <TopImg>
                            <Backbtn onClick={() => goBack()}>
                                <ArrowLeft size={22} />
                            </Backbtn>
                            <TopBg></TopBg>
                            <TopImage>
                                <Img src={detailData.Img} />
                            </TopImage>
                        </TopImg>
                        <ContentWrap>
                            <ContentBox>
                                <TitleWrap>
                                    <Age>19</Age>
                                    <Title>{detailData.title}</Title>
                                    <StarWrap>
                                        {[...Array(5)].map((_, index) => (
                                            <span key={index}>
                                                <Star size={14} weight="fill" fill={index < detailData.star ? 'yellow' : '#eee'} />
                                            </span>
                                        ))}
                                    </StarWrap>
                                    <TitleSub>{detailData.summary}</TitleSub>
                                </TitleWrap>
                            </ContentBox>
                            <ReviewContent>              
                                <div dangerouslySetInnerHTML={{ __html: detailData.text }} />
                            </ReviewContent>
                        </ContentWrap>
                        <FooterCate>
                            <span>{detailData.category}</span>
                            <span>{detailData.genre}</span>
                        </FooterCate>
                    </BoxWrap>
                    :
                    <LoadingBoxWrap>
                      <CircleNotch size={32} weight="bold" fill='black'/>
                    </LoadingBoxWrap>
                }
            </Box>
            <Comments />
        </Wrap>
    )
}

export default SubReviewItem;