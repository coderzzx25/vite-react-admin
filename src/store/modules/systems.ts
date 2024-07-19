import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllMenuListService, getRoleMenuListService } from '@/service/modules/systems/menu';
import { getAllRoleListService } from '@/service/modules/systems/role';
import { IMenuInfo } from '@/types/systems/menu';
import { IRoleInfo } from '@/types/systems/role';

interface ISystemsState {
  userMenu: IMenuInfo[];
  allMenu: IMenuInfo[];
  allRole: IRoleInfo[];
}

const systemsSlice = createSlice({
  name: 'systems',
  initialState: {
    userMenu: [],
    allMenu: [],
    allRole: []
  } as ISystemsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoleMenuListAsyncThunk.fulfilled, (state, { payload }: PayloadAction<IMenuInfo[]>) => {
      state.userMenu = payload;
    });
    builder.addCase(getAllMenuListAsyncThunk.fulfilled, (state, { payload }: PayloadAction<IMenuInfo[]>) => {
      state.allMenu = payload;
    });
    builder.addCase(getAllRoleListAsyncThunk.fulfilled, (state, { payload }: PayloadAction<IRoleInfo[]>) => {
      state.allRole = payload;
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

/**
 * 获取所有菜单
 * @returns {Promise<IMenuInfo[]>}
 */
export const getAllMenuListAsyncThunk = createAsyncThunk('systems/getAllMenuListAsyncThunk', async () => {
  const result = await getAllMenuListService();
  return result;
});

export const getAllRoleListAsyncThunk = createAsyncThunk('systems/getAllRoleListAsyncThunk', async () => {
  const result = await getAllRoleListService();
  return result;
});
