import React, { useEffect } from 'react';
import styled from '@emotion/styled'
import ReviewList from '../components/ReviewList';
import { fetchData } from '../features/dataSlice';
import { useDispatch, useSelector } from 'react-redux';

const Wrap = styled.div`
    width:100%;
`

const SubMenuWrap = styled.div`
  display:flex;
  color:black;
  text-align:center;
  width:100%;
  background:#f8f8f8;
  border-bottom:1px solid #f1f1f1;
`

const Category = styled.div`

`

const CategoryWrap = styled.div`
  display: flex;
  width:100%;
  justify-content:center;
  gap:px;
  padding:17px 0;
  margin:0 auto;

  li{
    font-weight:600;
    color:#bdbdbd;
    border-radius:25px;
    font-size:15px;
    padding:0 15px;
    cursor:pointer;

    :nth-child(1){
      color:#2d2d2d;
      font-weight:800;
    }

`

function ReviewPage() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.data.data)
  useEffect(() => {
    console.log('d')
    console.log(data)
    dispatch(fetchData('review'))
  }, [])

  return (
    <Wrap>
      <SubMenuWrap>
        {/* <Category>카테고리</Category> */}
        <CategoryWrap>
          <li>드라마</li><li>영화</li><li>애니메이션</li><li>책</li><li>웹툰</li>
        </CategoryWrap>
      </SubMenuWrap>
      <ReviewList data={data} />
    </Wrap>
  )
}

export default ReviewPage