import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, provider } from "../Firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

// Load user from localStorage on page load
const storedUser = JSON.parse(localStorage.getItem("user")) || null;

// Async Thunks
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user,{displayName:name});
      localStorage.setItem("user", JSON.stringify(userCredential.user)); // Save to localStorage
      return { uid: user.uid, email: user.email, displayName: name };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(userCredential.user)); // Save to localStorage
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Google Sign-In
export const googleSignIn = createAsyncThunk("auth/googleSignIn", async (_, { rejectWithValue }) => {
  try {
    const result = await signInWithPopup(auth, provider);
    localStorage.setItem("user", JSON.stringify(result.user)); // Save to localStorage
    return result.user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await signOut(auth);
  localStorage.removeItem("user"); // Remove from localStorage
});

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser, // Load user from localStorage
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(googleSignIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;

