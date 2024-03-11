import React, { useEffect } from 'react';
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../features/dataSlice';

const Wrap = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    color:#000;
`

const WorksUl = styled.ul`

`

const WorksListItem = styled.li`
    border:1px solid #eee;
    display:flex;

    &:nth-of-type(1){
        border:none;
    }
`

const WorksThumbNailWrap = styled.div`
    width:100%;
    // display:grid;
    // grid-template-columns: 1fr 1fr 1fr;
    aspect-ratio: 1 / 0.4;
    gap:2px;
`

const WorksThumbNail = styled.div`
    width:100%;
    overflow:hidden;
    background:#f8f8f8;
    padding:40px;

    img{
        box-shadow:5px 5px 10px #eee;
    }
`

const WorksContent = styled.div`
    width:100%;
    border-radius:25px;
    padding:25px 25px 50px 25px;
`

const CateWrap = styled.div`
    font-size:12px;
    font-weight:600;
    opacity:0.9;

    span{
        color: rgb(111, 119, 133);
        font-size:10px;
    }
`

const PointCate = styled.div`
    display:inline-block;
    background: ${props => props.theme.colors.point};
    padding:4px 10px 4px 10px;
    color:#fff;
    font-weight:600;
    border-radius:50px;
    font-size:12px;
`

const TitleWrap = styled.div`
    font-weight:800;
    font-size:15px;
    opacity:0.8;
`

const Company = styled.div`
    font-size:12px;
    opacity:0.2;
    font-weight:600;
`

const UrlLink = styled.div`
    font-size:12px;
    opacity:0.4;
`

const Content = styled.div`
    font-size:13px;
    opacity:0.84;
    font-weight:500;
`

function WorksList({ data }) {

    return (
        <Wrap>
            {data && (
                <WorksUl>
                    {data.map((item) => (
                        <WorksListItem>
                            <WorksThumbNailWrap>
                                <WorksThumbNail>
                                    <img src={item.Img} />
                                </WorksThumbNail>
                            </WorksThumbNailWrap>
                            <WorksContent>
                                <CateWrap>
                                    <PointCate>vue.js</PointCate>
                                </CateWrap>
                                                                    <Company>vuex axios</Company>
                                <TitleWrap>합법 판타지 스포츠 게임 위너픽</TitleWrap>
                                <Content>
                                    WINNERPICK은 개별 선수들에게 베팅하는 프리미엄 판타지 스포츠 게임입니다
                                </Content>

                                <UrlLink>http://www.winnerpick.co.kr/</UrlLink>
                            </WorksContent>
                        </WorksListItem>
                    ))}
                </WorksUl>
            )}
        </Wrap>
    )
}

export default WorksList
