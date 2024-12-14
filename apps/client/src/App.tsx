import { Routes, Route, Link } from 'react-router-dom';
import SignUpPage from './pages/auth/SignUpPage';
import SingInPage from './pages/auth/SingInPage';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/home/HomePage';
import UserProfilePage from './pages/userProfile/UserProfilePage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';

function App() {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <br />
        <Link to="/register">Sign up</Link>
        <br />
        <Link to="/login">Sign In</Link>
        <br />
        <Link to="/profile">Profile</Link>
        <br />
      </header>
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
