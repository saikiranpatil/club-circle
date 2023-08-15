import { useEffect } from 'react';
import './App.css'
import 'react-tooltip/dist/react-tooltip.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Login, Profile, ForgotPassword, NotFound, Loader, Club, Register } from './components';
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/actions/userAction";
import { ToastContainer } from 'react-toastify';
import ProtetedRoute from './components/Route/ProtectedRoute';
import Task from './components/Task/Task';
import AddTask from './components/Club/AddTask';
import AddClub from './components/Club/AddClub';
import EditProfile from './components/User/Profile/EditProfile';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className="min-h-full w-full">
        <Navbar />
        <Routes>
          <Route path='/login' exact element={<Login />} />
          <Route path='/register' exact element={<Register />} />
          <Route path='/forgot' exact element={<ForgotPassword />} />
          <Route element={<ProtetedRoute />}>
            <Route path='/' exact element={<Profile />} />
            <Route path='/profile/edit' exact element={<EditProfile />} />
            <Route path='/club/create' exact element={<AddClub />} />
            <Route path='/club/:id' exact element={<Club />} />
            <Route path='/task/create/:id' exact element={<AddTask />} />
            <Route path='/task/:id' exact element={<Task />} />
          </Route>
          <Route path='/loader' element={<Loader />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
