import styled from '@emotion/styled'
import { useRef, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { sendData } from '../features/dataSlice'
import { auth, storage } from '../firebase.js'
import { getDownloadURL, ref, uploadBytes, uploadString, deleteObject } from 'firebase/storage';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

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
    const [content, setContent] = useState("");

    const onUploadImage = async () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.addEventListener("change", async () => {
            const editor = editorRef.current.getEditor();
            const file = input.files[0];
            const range = editor.getSelection(true);
            try {
                const fileName = `${Date.now().toString()}_${file.name}`;
                const storageRef = ref(storage, `inspiration/${auth.currentUser.uid}/${fileName}`);
                const snapshot = await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(snapshot.ref).then((url) => {
                    console.log('url주소',url)
                    editor.insertEmbed(range.index, "image", url);
                    editor.setSelection(range.index + 1);
                    setImageList((prevImageList) => [...prevImageList, { downloadURL:url, fileName }]);
                })
            } catch (error) {
                console.error(error);
            }
        })
    };

    const handleRegisterButton = async () => {
        const delImgList = [];
        let thumbnail;

        imageList?.forEach((img) => {
            console.log('img', img)
            console.log('content', content)
            if (!content.includes(img.fileName)) {
                delImgList.push(img.fileName);
            }
            thumbnail = imageList[0].downloadURL;
        })

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
     
        console.log(content)
        console.log('임지리스트',imageList)
        console.log(thumbnail)

        dispatch(sendData({ content, thumbnail, imageList }));
        navigate(decodeURIComponent(location.search).split('=')[1])
    };

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    ['image'],
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                ],
                handlers: {
                    image: onUploadImage,
                },
            },
        };
    }, []);
    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'image',
    ];
    return (
        <Wrap>
            <WriteWrap>
                <ReactQuill
                    ref={editorRef}
                    placeholder="내용을 입력해주세요."
                    previewStyle="vertical"
                    initialEditType="wysiwyg"
                    style={{ minHeight: '400px' }}
                    onChange={setContent}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={content}
                ></ReactQuill>
                <Btn onClick={handleRegisterButton}>확인</Btn>
            </WriteWrap>
        </Wrap>
    )
}

export default WritePage