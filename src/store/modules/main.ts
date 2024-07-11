import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { localCache } from '@/utils/cache';

interface IMainState {
  primaryColor: string;
  isDark: boolean;
  isCollapsed: boolean;
}

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    primaryColor: localCache.getCache('primaryColor') ?? '#1890ff',
    isDark: localCache.getCache('isDark') ?? false,
    isCollapsed: localCache.getCache('isCollapsed') ?? false
  } as IMainState,
  reducers: {
    setPrimaryColorReducer(state, { payload }: PayloadAction<string>) {
      state.primaryColor = payload;
      localCache.setCache('primaryColor', payload);
    },
    setIsDarkReducer(state, { payload }: PayloadAction<boolean>) {
      state.isDark = payload;
      localCache.setCache('isDark', payload);
    },
    setIsCollapsedReducer(state, { payload }: PayloadAction<boolean>) {
      state.isCollapsed = payload;
      localCache.setCache('isCollapsed', payload);
    }
  }
});

export const { setPrimaryColorReducer, setIsDarkReducer, setIsCollapsedReducer } = mainSlice.actions;

export default mainSlice.reducer;
