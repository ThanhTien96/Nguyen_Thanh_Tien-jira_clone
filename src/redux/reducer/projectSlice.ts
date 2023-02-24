import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { projectService } from '../../services/projectServices';
import { getProjectDetailType } from '../../types/projectType';



//Defining our initialState's type
type initialStateType = {
  projectList: [];
  modelController: boolean;
  projectDetail: getProjectDetailType | null
};

const initialState: initialStateType = {
  projectList: [],
  modelController: false,
  projectDetail: null,
};


// get all project action
export const fetchApiProjectList = createAsyncThunk(
  'projectSlice/projectList',
  async (key: any, thunkAPI) => {
    try {

      const res = await projectService.getAllProjectApi(key);
      return res.data.content;
    } catch (err) {
      console.log(err);
    }
  }
)

// get project detail action
export const fetchApiProjectDetailAction = createAsyncThunk(
  'projectSlice/projectDetail',
  async (key: number, thunkAPI) => {
    try {

      const res = await projectService.getProjectDetail(key);
      return res.data.content;
    } catch (err) {
      console.log(err);
    }
  }
)

export const projectSlice = createSlice({
  name: 'projectSlice',
  initialState,
  reducers: {
    changeModelControlAction: (state, action) => {
      state.modelController = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchApiProjectList.fulfilled, (state, action: any) => {
      state.projectList = action.payload
    });

    builder.addCase(fetchApiProjectDetailAction.fulfilled, (state, action:any) => {
      state.projectDetail = action.payload
    })
  }
});

// To able to use reducers we need to export them.
export const { changeModelControlAction } = projectSlice.actions;

export default projectSlice.reducer;

