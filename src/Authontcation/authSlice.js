import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from './authActions'

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  authError: null,
  systemLang:'',
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthInfo: (state, action) => {
      state.userToken=action.payload.token;
      state.systemLang=action.payload.sytemlang;

  },
  clearAuthInfo: (state, action) => {
    state.userToken=null;
    state.systemLang=null;

},

  },

})

export const { setAuthInfo,clearAuthInfo } = authSlice.actions;

export default authSlice.reducer