import styled from '@emotion/styled'
import { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useDispatch } from 'react-redux';
import { sendData } from '../features/dataSlice'
import { auth, storage } from '../firebase.js'
import { getDownloadURL, ref, uploadBytes, uploadString, deleteObject } from 'firebase/storage';
import { useLocation, useNavigate } from 'react-router-dom';

const Wrap = styled.div`
    width:700px;
    margin:0 auto;
    border-radius:25px;
    display:flex;
    align-items:center;
    justify-content:center;
    background:#fff;
    height:max-content;
    padding:25px;
`
const WriteWrap = styled.div`
    width:100%;
    height:500px;
    color:#000;
    font-size:16px;
`

const Btn = styled.div`
    
`

function WritePage() {
    const [value, setValue] = useState('');
    const editorRef = useRef();
    const dispatch = useDispatch();
    const [imageList, setImageList] = useState([]);
    const [thumbnail, setThumbnail] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const onUploadImage = async (blob, callback) => {
        const fileName = `${Date.now().toString()}_${blob.name}`;
        const storageRef = ref(storage, `inspiration/${auth.currentUser.uid}/${fileName}`);
        try {
            const snapshot = await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(snapshot.ref);
            callback(downloadURL, blob.name);
            setImageList((prevImageList) => [...prevImageList, { downloadURL, fileName }]);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleRegisterButton = async () => {
        const editorIns = editorRef.current?.getInstance();
        const content = editorIns?.getHTML();
        const delImgList = [];

        imageList?.forEach((img) => {
            console.log('img',img)
            console.log('content',content)
            if (!content.includes(img.fileName)) {
                delImgList.push(img.fileName);
            }
        })
        console.log(delImgList)

        if (delImgList.length > 0) {
            delImgList.forEach(async (fileName) => {
                try {
                    const desertRef = ref(storage, `inspiration/${auth.currentUser.uid}/${fileName}`);
                    await deleteObject(desertRef);

                    setImageList((prevImageList) =>
                        prevImageList.filter((img) => img.fileName !== fileName)
                    );
                } catch (error) {
                    console.error(error);
                }
            });
        }
        let thumbnail = imageList[0].downloadURL;

        dispatch(sendData({ content, thumbnail, imageList }));
        navigate(decodeURIComponent(location.search).split('=')[1])
    };

    const onChange = async () => {

    };

    return (
        <Wrap>
            <WriteWrap>
                <Editor
                    ref={editorRef}
                    placeholder="내용을 입력해주세요."
                    previewStyle="vertical"
                    height="100%"
                    initialEditType="wysiwyg"
                    onChange={onChange}
                    toolbarItems={[
                        ['heading', 'bold', 'italic', 'strike'],
                        ['hr', 'quote'],
                        ['ul', 'ol', 'task', 'indent', 'outdent'],
                        ['table', 'image', 'link'],
                        ['code', 'codeblock']
                    ]}
                    hooks={{ addImageBlobHook: onUploadImage }}
                ></Editor>
                <Btn onClick={handleRegisterButton}>확인</Btn>
            </WriteWrap>
        </Wrap>
    )
}

export default WritePage