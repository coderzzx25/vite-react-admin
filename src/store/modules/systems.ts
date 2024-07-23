import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllPermissionListService, getRolePermissionListService } from '@/service/modules/systems/permission';
import { getAllRoleListService } from '@/service/modules/systems/role';
import { IPermissionInfo } from '@/types/systems/permission';
import { IRoleInfo } from '@/types/systems/role';

interface ISystemsState {
  userPermission: IPermissionInfo[];
  allPermission: IPermissionInfo[];
  allRole: IRoleInfo[];
}

const systemsSlice = createSlice({
  name: 'systems',
  initialState: {
    userPermission: [],
    allPermission: [],
    allRole: []
  } as ISystemsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getRolePermissionListAsyncThunk.fulfilled,
      (state, { payload }: PayloadAction<IPermissionInfo[]>) => {
        state.userPermission = payload;
      }
    );
    builder.addCase(
      getAllPermissionListAsyncThunk.fulfilled,
      (state, { payload }: PayloadAction<IPermissionInfo[]>) => {
        state.allPermission = payload;
      }
    );
    builder.addCase(getAllRoleListAsyncThunk.fulfilled, (state, { payload }: PayloadAction<IRoleInfo[]>) => {
      state.allRole = payload;
    });
  }
});

export default systemsSlice.reducer;

/**
 * 获取角色权限
 * @param {string} roleId - 角色ID
 * @returns {Promise<IPermissionInfo[]>}
 */
export const getRolePermissionListAsyncThunk = createAsyncThunk(
  'systems/getRolePermissionListAsyncThunk',
  async (roleId: number) => {
    const result = await getRolePermissionListService(roleId);
    return result;
  }
);

/**
 * 获取所有权限
 * @returns {Promise<IPermissionInfo[]>}
 */
export const getAllPermissionListAsyncThunk = createAsyncThunk('systems/getAllPermissionListAsyncThunk', async () => {
  const result = await getAllPermissionListService();
  return result;
});

export const getAllRoleListAsyncThunk = createAsyncThunk('systems/getAllRoleListAsyncThunk', async () => {
  const result = await getAllRoleListService();
  return result;
});
