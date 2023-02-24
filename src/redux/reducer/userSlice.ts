import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userService } from '../../services/userServices';
import {  Profile } from '../../types/userType'

interface UserState {
    profile: Profile | null;
    userList: []

}

const initialState: UserState = {
    profile: null,
    userList: []
} 



// get all user action
export const fetchApiUserList = createAsyncThunk(
  'userSlice/UserList',
  async (key: any, thunkAPI) => {
    try {

      const res = await userService.fetApiGetAllUser();
      return res.data.content;
    } catch (err) {
      console.log(err);
    }
  }
)


export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    fetchApiLoginAction: (state, action: any) => {
      state.profile = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchApiUserList.fulfilled, (state, action: any) => {
      state.userList = action.payload
    });

  }
})

export const {
  fetchApiLoginAction,

} = userSlice.actions

export default userSlice.reducer;







