import React, { useEffect } from 'react';
import styled from '@emotion/styled'
import InspirationList from '../components/InspirationList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../features/dataSlice';
import { useLocation } from 'react-router-dom';


const Wrap = styled.div`
    width:100%;
`

function InspirationPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { data, category } = useSelector((state) => state.data.data)

    useEffect(() => {
        dispatch(fetchData('inspiration'))
    },[location.search])

    return (
        <Wrap>
            <InspirationList data={data} />
        </Wrap>
    )
}

export default InspirationPage


