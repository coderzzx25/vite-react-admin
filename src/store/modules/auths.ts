import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IAccountLoginResponseInfo, IUserInfo } from '@/types/auths/auths';
import { localCache } from '@/utils/cache';
import { refreshTokenService } from '@/service/modules/auths/auths';

interface IAuthsState {
  userInfo: IUserInfo | null;
  accessToken: string;
  refreshToken: string;
}

const authsSlice = createSlice({
  name: 'auths',

  initialState: {
    userInfo: localCache.getCache('userInfo') || null,
    accessToken: localCache.getCache('accessToken') || '',
    refreshToken: localCache.getCache('refreshToken') || ''
  } as IAuthsState,
  reducers: {
    setLoginInfoReducer(state, { payload }: PayloadAction<IAccountLoginResponseInfo>) {
      state.userInfo = payload.userInfo;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      localCache.setCache('userInfo', payload.userInfo);
      localCache.setCache('accessToken', payload.accessToken);
      localCache.setCache('refreshToken', payload.refreshToken);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(refreshTokenAsyncThunk.fulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      localCache.setCache('accessToken', payload.accessToken);
      localCache.setCache('refreshToken', payload.refreshToken);
    });
  }
});

export const { setLoginInfoReducer } = authsSlice.actions;

export default authsSlice.reducer;

export const refreshTokenAsyncThunk = createAsyncThunk('auths/refreshTokenAsyncThunk', async () => {
  const result = await refreshTokenService(localCache.getCache('refreshToken'));
  return result;
});
