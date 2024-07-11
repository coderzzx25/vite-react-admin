import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getRoleMenuList } from '@/service/modules/systems/menu';
import { IMenu, IPermission, IUserMenuInfo } from '@/types/systems/menu';

interface ISystemsState {
  userMenu: IMenu[];
  userPermissions: IPermission[];
}

const systemsSlice = createSlice({
  name: 'systems',
  initialState: {
    userMenu: [],
    userPermissions: []
  } as ISystemsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoleMenuListAsyncThunk.fulfilled, (state, { payload }: PayloadAction<IUserMenuInfo>) => {
      state.userMenu = payload.menus;
      state.userPermissions = payload.permissions;
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
    const result = await getRoleMenuList(roleId);
    return result;
  }
);
