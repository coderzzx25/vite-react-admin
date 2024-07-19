import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccountLoginResponseInfo, IUserInfo } from '@/types/auths/auths';
import { localCache } from '@/utils/cache';

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
  }
});

export const { setLoginInfoReducer } = authsSlice.actions;

export default authsSlice.reducer;
