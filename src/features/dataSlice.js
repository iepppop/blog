import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, query, where, onSnapshot, getDocs, doc, addDoc, serverTimestamp, updateDoc,orderBy, deleteDoc } from "firebase/firestore";
import { db, auth, storage } from '../firebase.js';
import { deleteObject, getDownloadURL, ref, uploadString  } from 'firebase/storage';

const getCategoryNameEng = (category) => {
    if (category === '드라마') return 'drama';
    else if (category === '영화') return 'movie';
    else if (category === '애니메이션') return 'animation';
    else if (category === '책') return 'book';
    else return 'weebtoon';
}

export const fetchData = createAsyncThunk('data/fetchData', async (location, thunkAPI) => {
    try {
        thunkAPI.dispatch(setPathname(location));
        let dataList = [];
        await new Promise((resolve, reject) => {
            const unsubscribe = onSnapshot(query(collection(db, "list", '6rIGBZV7WPHNUXGm3KyY', location), orderBy("timestamp", "desc")), (querySnapshot) => {
                dataList = [];
                querySnapshot.forEach((doc) => {
                    let item = doc.data();
                    console.log(item.timestamp)
                    const unixTimestamp = item.timestamp ? item.timestamp.toDate().getTime() : 0;
                    dataList.push({ ...item, id: doc.id, timestamp: unixTimestamp });
                });
                resolve();
            }, (error) => {
                reject(error);
            });
            return unsubscribe;
        });
        return dataList;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const sendData = createAsyncThunk('data/sendData', async ({content,thumbnail,imageList}, thunkAPI) => {
    try {
  

     
        const dataToAdd = {
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
            text: content,
            images: imageList,
            timestamp: serverTimestamp(),
        };

        if (thumbnail !== undefined) {
            dataToAdd.thumbnail = thumbnail;
        }

        const docRef = await addDoc(collection(db, "list", '6rIGBZV7WPHNUXGm3KyY', "inspiration"), dataToAdd);
     
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const DeleteData = createAsyncThunk('data/DeleteData', async ({location, item}, thunkAPI) => {
    try{
        const desertRef = ref(storage, `${location}/${auth.currentUser.uid}/${item.images[0].fileName}`);
        console.log(desertRef)
        await deleteObject(desertRef);
        await deleteDoc(doc(db, "list", "6rIGBZV7WPHNUXGm3KyY",`${location}`,`${item.id}`));
    }   
    catch(error){
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const ImageUpload = createAsyncThunk('data/ImageUpload', async ({listName,file}, thunkAPI) => {
    try {
        const imageRef = ref(storage, `${listName}/${auth.currentUser.uid}/img`);
        await uploadString(imageRef, file, "data_url").then(async () => {
            const downloadURL = await getDownloadURL(imageRef);
        });
    }
    catch (error){
        return thunkAPI.rejectWithValue(error.message);
    }
})

const initialState = {
    data: [],
    category: 'drama',
    isLoading: false,
    pathname: '',
    fileList:[],
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setPathname: (state, action) => {
            state.pathname = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state, action) => {
                state.data = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                if (state.pathname === 'review') {
                    const dataList = action.payload.filter(ele => getCategoryNameEng(ele.category) === state.category);
                    state.data = dataList;
                } else {
                    state.data = action.payload;
                }
                console.log('액션페이로드',action.payload)
                state.isLoading = false;
            })
            .addCase(fetchData.rejected, (state, action) => {
                console.log(action.payload)
            })
            .addCase(sendData.fulfilled, (state, action) => {
                console.log(action.payload)
                state.isLoading = false;
            })
            .addCase(sendData.rejected, (state, action) => {
                console.log(action.payload)
            })
            .addCase(DeleteData.rejected, (state, action) => {
                console.log(action.payload)
            })
            .addCase(ImageUpload.fulfilled, (state, action) => {
                state.fileList.appendChild(action.payload);
                console.log(state.fileList);
            })
    }
});

export const { data, setCategory, category, setPathname } = dataSlice.actions;
export default dataSlice.reducer;

