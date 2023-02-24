import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AppRoute from "./HOC/AppRoute";
import CreateProject from './pages/projectPage/createProject/CreateProject';
import EditProject from './pages/projectPage/EditProject/EditProject';
import ProjectPage from './pages/projectPage/ProjectPage';
import TaskBoardPage from './pages/TaskBoard/TaskBoardPage';
import Login from './pages/userPage/Login';
import Register from './pages/userPage/Register';
import { useAppDispatch } from './redux/configStore';
import { fetchApiUserList } from './redux/reducer/userSlice';
import HomeTemplate from './templates/homeTemplate/HomeTemplate';
import UserTemplate from './templates/userTemplate/UserTemplate';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchApiUserList(''));
}, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<UserTemplate />}>
          <Route index path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>

        <Route path='/project' element={<HomeTemplate />}>
          <Route path='' element={<AppRoute component={ProjectPage} isAdmin />} />
          <Route path='/project/create-project' element={<AppRoute component={CreateProject} isAdmin />} />
          <Route path='/project/edit/:id' element={<AppRoute component={EditProject} isAdmin />} />
          <Route path='/project/board/:id' element={<AppRoute component={TaskBoardPage} isAdmin />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
