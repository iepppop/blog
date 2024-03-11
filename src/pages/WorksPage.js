import React, { useEffect } from 'react';
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../features/dataSlice';
import WorksList from '../components/WorksList';

const Wrap = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
`
function WorksPage() {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.data.data)
    useEffect(() => {
        dispatch(fetchData('works'))
    }, [])
    return (
        <Wrap>
            <WorksList data={data}/>
        </Wrap>
    )
}

export default WorksPage


