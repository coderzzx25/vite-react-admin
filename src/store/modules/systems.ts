import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getRoleMenuListService } from '@/service/modules/systems/menu';
import { IMenu } from '@/types/systems/menu';

interface ISystemsState {
  userMenu: IMenu[];
}

const systemsSlice = createSlice({
  name: 'systems',
  initialState: {
    userMenu: []
  } as ISystemsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoleMenuListAsyncThunk.fulfilled, (state, { payload }: PayloadAction<IMenu[]>) => {
      state.userMenu = payload;
    });
  }
});

export default systemsSlice.reducer;

/**
 * 获取角色菜单
 * @param {string} roleId - 角色ID
 * @returns {Promise<IMenuInfo[]>}
 */
export const getRoleMenuListAsyncThunk = createAsyncThunk(
  'systems/getRoleMenuListAsyncThunk',
  async (roleId: number) => {
    const result = await getRoleMenuListService(roleId);
    return result;
  }
);
