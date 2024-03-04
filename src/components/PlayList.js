import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled'
import YouTube from 'react-youtube';
import { Play } from "@phosphor-icons/react";
import record from '../images/record.png'
import { css, keyframes } from '@emotion/react';

const PlayListItems = styled.div`
    width:100%;
    padding:0 0 0 0;
`

const PlayListItemsWrap = styled.div`
    ul{
        display:grid;
        grid-template-columns: 1fr 1fr;
        // flex-direction:column;
        width:100%;
        gap:20px;
        padding:25px;
    }
`

const ItemsWrap = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    padding:25px 0 15px 0;
    border:1px solid #eee;
    border-radius:25px;
    gap:10px;
    color:#000;
    box-shadow:3px 3px 13px #eee;
    cursor:pointer;
    transition:0.3s ease-in-out;
    position:relative;
    bottom:0;
    right:0;

    &:hover .playicon{
        border-color: #2d2d2d;
    }

    &:hover svg{
        fill: black; 
    }

    &:hover{
        box-shadow:none;
        right:0;
        bottom:4px;
    }
`

const ImageWrap = styled.div`
    width:100%;
    padding:0 25px;
`

const ContentWrap = styled.div`
    padding:10px 25px;
    display:flex;
    flex-direction:column;
    position:relative;

    span:nth-of-type(1){
        font-size:20px;
        font-weight:600;
    }
    span:nth-of-type(2){
        font-weight:600;
        opacity:0.5;
    }
`

const YoutubeWrap = styled.div`
    width:0;
    height:0;
    display:none;
`

const PlayBtn = styled.div`
    position:absolute;
    right:25px;
    top:50%;
    transform:translate(0,-50%);
    z-index:1;
`

const PlayIcon = styled.div`
    width:40px;
    height:40px;
    border:1px solid #eee;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;

    svg{
        fill:#eee;
    }
`

const AlbumBox = styled.div`
    aspect-ratio: 1 / 1.1;
    display:flex;
    align-items:center;
    justify-content:center;
    position:relative;
    background:#f8f8f8;
    border-radius:25px;

    div{
        display:flex;
        justify-content:center;
    }
`

const AlbumWrap = styled.div`
    opacity: ${({ imageLoaded }) => (imageLoaded ? 1 : 0)};
    transition: opacity 0.3s ease-in-out;
`

const Album = styled.div`
    width:75%;
    position:relative;
    z-index:1;
    padding:0 40px 0 0;
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;


const Record = styled.div`
    position:absolute;
    top:50%;
    transform:translate(0,-50%);
    right:25px;
    width:50%;
`
const Image = styled.img`

`

const RImage = styled.img`
    animation: ${({ videoId, playingVideoId }) => videoId === playingVideoId ? css`${rotate360} 1.4s linear infinite` : 'none'};
`

const Wave = styled.div`
  display: flex;
  justify-content: center;
  width:40px;
  height:40px;
  background: ${props => props.theme.colors.point};
  align-items:center;
  border-radius:50%;
`;

const WaveWrap = styled.div`
    display: flex;
    justify-content: space-around;
    width:14px;
    height:14px;
    align-items:flex-end;
`

const waveAnimation = keyframes`
0% {
    height: 80%; 
  }
  100% {
    height: 30%;
  }
`;

const Bar = styled.div`
  width: 3px; 
  height: 100%; 
  background-color: #fff;
  animation: ${waveAnimation} 0.4s infinite alternate;

  
  &:nth-of-type(1) {
    height: 90%; 
    animation-delay: 0s; 
  }

  &:nth-of-type(2) {
    height: 60%;
    animation-delay: 0.2s; 
  }

  &:nth-of-type(3) {
    height: 30%;
    animation-delay: 0.6s;
  }
`;

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

const LoadingText = styled.span`
    height: 15px;
    width:20%;
    border-radius:25px;
    animation: ${skeletonAnimation} 1.8s infinite ease-in-out; 

    &:first-of-type{
        width:40%;
        height:20px;
        margin:0 0 5px 0;
    }
`

const LoadingAlbumBox = styled.div`
    aspect-ratio: 1 / 1.1;
    display:flex;
    align-items:center;
    justify-content:center;
    background:#f8f8f8;
    animation: ${skeletonAnimation} 1.8s infinite ease-in-out; 
    border-radius:25px;
`


function PlayList({ data }) {
    const [playingVideoId, setPlayingVideoId] = useState('');
    const playerRef = useRef()
    const [current, setCurrent] = useState('');
    const [imageLoaded, setImageLoaded] = useState(false);

    const playVideo = (videoId) => {
        if (playingVideoId === videoId) {
            playerRef.current.internalPlayer.pauseVideo();
            setPlayingVideoId('');
        } else {
            setPlayingVideoId(videoId);
        }
    };

    const completeLoaded = () => {
        setImageLoaded(true);
    }

    const opts = {
        width: '100%',
        height: 'auto',
        playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
        },
    };


    return (
        <PlayListItems>
            <PlayListItemsWrap>
                <YoutubeWrap>
                    <YouTube opts={opts} videoId={playingVideoId} ref={playerRef} config={{
                        youtube: {
                            embedOptions: {
                                host: "https://www.youtube-nocookie.com",
                            },
                        }
                    }}
                        onEnd={() => {
                            setPlayingVideoId('');
                        }} />
                </YoutubeWrap>
                {data ? (
                    <ul>
                        {data.map((item) => (
                            <ItemsWrap key={item.id} onClick={() => playVideo(item.videoId)}>
                                <Image src={item.albumImg} onLoad={completeLoaded} style={{ display: 'none' }} />
                                <ImageWrap>
                                    <AlbumBox>
                                        <AlbumWrap imageLoaded={imageLoaded}>
                                            <Album>
                                                <Image src={item.albumImg} alt="Album" />
                                            </Album>
                                            <Record>
                                                <RImage src={record} playingVideoId={playingVideoId} videoId={item.videoId}/>
                                            </Record>
                                        </AlbumWrap>
                                    </AlbumBox>
                                </ImageWrap>
                                <ContentWrap>
                                    <span>{item.title}</span>
                                    <span>{item.singer}</span>
                                    <PlayBtn playingVideoId={playingVideoId} item={item}>
                                        {playingVideoId === item.videoId ? <Wave>
                                            <WaveWrap>
                                                <Bar></Bar>
                                                <Bar></Bar>
                                                <Bar></Bar>
                                            </WaveWrap>
                                        </Wave> :
                                            <PlayIcon className='playicon'><Play size={18} weight="fill" /></PlayIcon>}
                                    </PlayBtn>
                                </ContentWrap>
                            </ItemsWrap>
                        ))}
                    </ul>
                ) : (
                    <ul>
                        {[...Array(4)].map((_, index) => (
                            <ItemsWrap key={index}>
                                <ImageWrap>
                                    <LoadingAlbumBox>
                                        <Album>
                                            <Image src='https://blog.kakaocdn.net/dn/bcJgOv/btsFqOexX26/5gWRh5IdhkrDgELQrwPBkk/img.png' />
                                        </Album>
                                    </LoadingAlbumBox>
                                </ImageWrap>
                                <ContentWrap>
                                    <LoadingText></LoadingText>
                                    <LoadingText></LoadingText>
                                    <PlayBtn>
                                        <PlayIcon className='playicon'><Play size={18} weight="fill" /></PlayIcon>
                                    </PlayBtn>
                                </ContentWrap>
                            </ItemsWrap>
                        ))}
                    </ul>
                )}
            </PlayListItemsWrap>
        </PlayListItems>
    );
}

export default PlayList