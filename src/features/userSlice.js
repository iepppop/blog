import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signOut, GoogleAuthProvider , GithubAuthProvider , signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase.js'

export const googleLogin = createAsyncThunk('user/googleLogin', async (_, thunkAPI) => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const { uid, email, displayName, photoURL } = result.user;
        return { uid, email, displayName, photoURL };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const githubLogin = createAsyncThunk('user/githubLogin', async (_, thunkAPI) => {
    try {
        const provider = new GithubAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const { uid, email, displayName, photoURL } = result.user;
        console.log(result.user)
        return { uid, email, displayName, photoURL };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const checkUser = createAsyncThunk('user/checkUser', async (_, thunkAPI) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            thunkAPI.dispatch(loginUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            }))
        }
    });
});

export const login = createAsyncThunk('user/login', async ({ useremail, password }, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const { uid, email, displayName, photoURL } = await signInWithEmailAndPassword(auth, useremail, password);
        return { uid, email, displayName, photoURL };
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const logout = () => {
    return async (dispatch) => {
        try {
            await signOut(auth);
            dispatch(logoutUser());
        } catch (error) {
            console.error(error);
        }
    };
};

export const signUp = createAsyncThunk('user/signUp', async ({ useremail, password, username }, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, useremail, password);
        const user = userCredential.user;

        await updateProfile(user, {
            displayName: username,
            photoURL: "https://blog.kakaocdn.net/dn/yacY3/btrE5gQ0V4f/qikIkKvyENANHyvoeGZTX0/img.png"
        });

        return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


const initialState = {
    user: null,
    isLoading: false,
    error: '',
}

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
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(checkUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(login.pending, (state, action) => {
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                const errMsg = action.payload;
                if (errMsg === 'Firebase: Error (auth/missing-email).') state.error = '가입되어 있지 않은 계정입니다.'
                else if (errMsg === 'Firebase: Error (auth/invalid-email).') state.error = '이메일 형식이 아닙니다.'
                else if (errMsg === 'Firebase: Error (auth/invalid-credential).') state.error = '비밀번호가 다릅니다.'
                else state.error = errMsg;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                console.log(action.payload)
                state.user = action.payload;
            })
            .addCase(googleLogin.rejected, (state, action) => {
               state.error = action.payload;
            })
            .addCase(githubLogin.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(githubLogin.rejected, (state, action) => {
                console.log('action',action.payload)
            })
    }
});

export const { loginUser, logoutUser, setLoading, setErrMsg } = userSlice.actions;
export default userSlice.reducer;

