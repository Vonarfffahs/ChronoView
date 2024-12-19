import { Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/auth/SignUpPage';
import SingInPage from './pages/auth/SingInPage';
import HomePage from './pages/home/HomePage';
import UserProfilePage from './pages/userProfile/UserProfilePage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import Menubar from './components/navbar/Menubar';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Menubar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<SingInPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
