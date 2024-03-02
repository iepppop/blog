import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../features/userSlice.js';
import { keyframes } from '@emotion/react';
import { CircleNotch, CheckCircle } from "@phosphor-icons/react";
import { auth, storage } from '../firebase.js';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { Navigate } from 'react-router-dom'

const Wrap = styled.div`
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    positino:relative;
`

const ProfileIImg = styled.div`
    width:120px;
    height:120px;
    position:relative;
    border-radius:50%;
    border:1px solid ${props => props.theme.colors.border};
    margin:0 auto 20px auto;
`

const ImageWrap = styled.div`
  width:100%;
  height:100%;
  overflow:hidden;
  border-radius:50%;

  img{
    width:100%;
    height:100%;
    box-sizing:border-box;
  }
`

const NickNameWrap = styled.div`
  margin:15px 0 0 0;
  display:flex;
  flex-direction:column;
   span{
    font-size:12px;
    font-weight:700;
   }

   input{
    background:${props => props.theme.colors.background};
    border:1px solid ${props => props.theme.colors.border};
    color:${props => props.theme.colors.text};
    border-radius:5px;
    padding:10px 15px;
    height:45px;
    width:280px;
    margin:8px 0 0 0;
   }
   
   &:nth-of-type(2) input{
    background:${props => props.theme.colors.subBg};
   }
`

const EditBtn = styled.div`
   position:absolute;
   bottom:3px;
   background:${props => props.theme.colors.background};
   border-radius:50%;
   width:30px;
   height:30px;
   display:flex;
   align-items:center;
   justify-content:center;
   right:3px;
   z-index:2;
   transition:0.3s ease-in;
   cursor:pointer;
   border:1px solid:${props => props.theme.colors.border};

   svg{
    fill:#373737;
   }

   &:hover{
    opacity:0.8;
   }
`

const CompleteBtn = styled.button`
  background:${props => props.theme.colors.point};
  width:280px;
  margin:37px 0 0 0;
  height:45px;
  border-radius:5px;
  font-size:12px;
  font-weight:500;
  color:#fff;
  transition:0.3s ease-in;

  &:hover{
    opacity:0.8;
  }
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingIcon = styled.div`
  svg{
    animation: ${rotate360} 2s linear infinite;
    fill:${props => props.theme.colors.point};
  }
`

const CheckIcon = styled.div`
  svg{
    fill:${props => props.theme.colors.point};
  }
`

const Modal = styled.div`
  width:300px;
  height:300px;
  background:${props => props.theme.colors.background};
  position:fixed;
  z-index:2;
  display:flex;
  justify-content:center;
  align-items:center;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  border-radius:15px;
`

const ModalBg = styled.div`
  width:100%;
  height:100%;
  background:${props => props.theme.colors.text};
  opacity:0.6;
  position:fixed;
  left:0;
  top:0;
  z-index:1;
`

const ModalWrap = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  gap:30px;
  font-size:25px;
  font-weight:600;
  color:${props => props.theme.colors.text};
`

const Img = styled.img`

`

function ProfileEditPage() {
  const {user, isLoading} = useSelector((state) => state.data.user);
  const imageInput = useRef();
  const [photo, setPhoto] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [username, setUsername] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();

  const onCickImageUpload = () => {
    imageInput.current.click();
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const handleSaved = async (username, file) => {
    setIsModal(true)
    dispatch(setLoading(true))
    let photoURL;
    if (typeof file === 'string' && file.includes('storage')) {
      photoURL = file;
    } else {
      const fileRef = ref(storage, auth.currentUser.uid + '.png');
      const snapshot = await uploadBytes(fileRef, file);
      photoURL = await getDownloadURL(fileRef);
    }
    updateProfile(auth.currentUser, {
      displayName: username ,photoURL
    }).finally(()=>{
      dispatch(setLoading(false))
    })
  }

  useEffect(() => {
    if (user && user.photoURL) {
      setUsername(user.displayName);
      setPhoto(user.photoURL);
    }
  }, [user])

  useEffect(() => {
    if (isModal && !isLoading) {
      const timer = setTimeout(() => {
        setIsModal(false);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [isModal, isLoading]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Wrap>
      {isModal && <ModalBg></ModalBg>}
      {user ? <form onSubmit={e => {
        e.preventDefault();
        handleSaved(username, photo)
      }}>
        <ProfileIImg>
          <input type="file" style={{ display: "none" }} onChange={handleChange} ref={imageInput} />
          <ImageWrap>
            {imageUrl ? <Img src={imageUrl} /> : <Img src={user.photoURL} />}
          </ImageWrap>
          <EditBtn onClick={onCickImageUpload}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256"><path d="M230.14,70.54,185.46,25.85a20,20,0,0,0-28.29,0L33.86,149.17A19.85,19.85,0,0,0,28,163.31V208a20,20,0,0,0,20,20H92.69a19.86,19.86,0,0,0,14.14-5.86L230.14,98.82a20,20,0,0,0,0-28.28ZM91,204H52V165l84-84,39,39ZM192,103,153,64l18.34-18.34,39,39Z"></path></svg>
          </EditBtn>
        </ProfileIImg>
        <NickNameWrap>
          <span>이메일</span>
          <input type="text" placeholder={user.email} disabled />
        </NickNameWrap>
        <NickNameWrap>
          <span>닉네임</span>
          <input type="text" placeholder={user.displayName} value={username || ''} onChange={e => setUsername(e.target.value)} name={username} />
        </NickNameWrap>
        <CompleteBtn type="submit" disabled={isLoading ? true : false}>
          변경 완료
        </CompleteBtn>
      </form> : null}

      {isModal && <Modal>
        {isLoading ?
          <ModalWrap>
            <LoadingIcon><CircleNotch size={50} weight='bold' /></LoadingIcon>
            저장 중입니다
          </ModalWrap>
          : <ModalWrap>
            <CheckIcon><CheckCircle size={50} weight='bold' /></CheckIcon>
            저장 완료
          </ModalWrap>}
      </Modal>}
    </Wrap>
  )
}

export default ProfileEditPage