import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled'
import ReviewList from '../components/ReviewList';
import { fetchData, setCategory } from '../features/dataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

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
`

function ReviewPage() {
  const dispatch = useDispatch();
  const { data, category } = useSelector((state) => state.data.data)
  const [subMenuList, setMenuList] = useState([{ kor: '드라마', eng: 'drama' }, { kor: '영화', eng: 'movie' }, { kor: '애니메이션', eng: 'animation' }, { kor: '책', eng: 'book' }, { kor: '웹툰', eng: 'weebtoon' }])
  const [currentMenu, setCurrentMenu] = useState({ kor: '드라마', eng: 'drama' });
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const cateQuery = queryParams.get('category');
    if (!cateQuery) {
      return navigate('/list/review?category=drama')
    }
    dispatch(fetchData('review'))
    dispatch(setCategory(cateQuery))
    console.log(location.search)
  }, [location.search])

  useEffect(()=>{
      setCurrentMenu({ eng: category })
  }, [category])

  const handleMenuClick = (menu) => {
    setCurrentMenu(menu);
    const queryParams = new URLSearchParams();
    queryParams.append('category', `${menu}`);
    navigate(`?${queryParams.toString()}`);
  }
  return (
    <Wrap>
      <SubMenuWrap>
        <CategoryWrap>
          {subMenuList.map((menu) => {
            return (
              <li key={menu.eng} style={{ fontWeight: currentMenu.eng === menu.eng ? 800 : '', color: currentMenu.eng === menu.eng ? '#2d2d2d' : '' }} onClick={() => handleMenuClick(menu.eng)}>{menu.kor}</li>
            )
          })}
        </CategoryWrap>
      </SubMenuWrap>
      <ReviewList data={data} />
    </Wrap>
  )
}

export default ReviewPage