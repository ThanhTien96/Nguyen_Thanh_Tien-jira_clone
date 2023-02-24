
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
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
          <Route path='' element={<ProjectPage />} />
          <Route path='/project/create-project' element={<CreateProject />} />
          <Route path='/project/edit/:id' element={<EditProject />} />
          <Route path='/project/board/:id' element={<TaskBoardPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
