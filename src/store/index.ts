import { configureStore } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook, useDispatch, shallowEqual } from 'react-redux';

import mainSlice from './modules/main';
import authsSlice from './modules/auths';
import systemsSlice from './modules/systems';

const store = configureStore({
  reducer: {
    main: mainSlice,
    auths: authsSlice,
    systems: systemsSlice
  }
});

// 封装数据类型
type GetStateFnType = typeof store.getState;
type IRootState = ReturnType<GetStateFnType>;
type DispatchType = typeof store.dispatch;
// 导出封装数据类型hook
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
// 导出封装方法hook
export const useAppDispatch: () => DispatchType = useDispatch;
// shallowEqual数据没有修改的情况下不更新
export const useAppShallowEqual = shallowEqual;

export default store;
