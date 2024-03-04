import React, { useEffect } from 'react';
import styled from '@emotion/styled'
import PlayList from '../components/PlayList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../features/dataSlice';

const Wrap = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
`
function PlayListPage() {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.data.data)
    useEffect(() => {
        dispatch(fetchData('playlist'))
    }, [])
    return (
        <Wrap>
            <PlayList data={data} />
        </Wrap>
    )
}

export default PlayListPage


