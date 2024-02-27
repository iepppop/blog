import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signOut, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase.js'
import { useDispatch } from 'react-redux';

const initialState = {
    user: null,
    isLoading: true,
    photoURL: 'https://blog.kakaocdn.net/dn/yacY3/btrE5gQ0V4f/qikIkKvyENANHyvoeGZTX0/img.png'
}

export const login = (email, password) => {
    return async (dispatch) => {
        setPersistence(auth, browserLocalPersistence).then(() => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const { uid, email } = userCredential.user;
                    dispatch(loginUser({ uid, email }));
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        })
    }
};

export const logout = () => {
    return async (dispatch) => {
      try {
        await signOut(auth); 
        dispatch(logoutUser()); 
      } catch (error) {
        console.error('로그아웃 에러:', error);
      }
    };
};

export const signUp = (email, password, username) => {
    return async (dispatch) => {
        const displayName = username;
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            updateProfile(auth.currentUser, {
                displayName: username, photoURL: "https://example.com/jane-q-user/profile.jpg"
              })
              console.log(userCredential.user)
            const { uid, email, displayName, photoURL } = userCredential.user;
            dispatch(loginUser({ uid, email, displayName, photoURL})); 
        })
        .catch((error) => {
        });
    };
};

// export const uploadPhoto = (file, currentUser) => {
//     return async (dispatch) => {
//         const fileRef = ref(storage, currentUser.uid + 'png');

//         dispatch(setLoading(true));

//         try {
//             const snapshot = await uploadBytes(fileRef, file);
//             const photoURL = await getDownloadURL(fileRef);

//             updateProfile(currentUser, { photoURL });

//             dispatch(setPhotoURL(photoURL));
//             dispatch(setLoading(false));
//             alert('Uploaded file!');
//         } catch (error) {
//             console.error('파일 업로드 에러:', error);
//             dispatch(setLoading(false));
         
//         }
//     };
// };

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.user = null;
        },
        setLoading: (state, action) => {
            state.isLoading = action.playload;
        },
        setPhotoURL: (state, action) => {
            state.photoURL = action.payload;
        }
    },
});

export const { loginUser, logoutUser, setLoading } = userSlice.actions;
export default userSlice.reducer;

