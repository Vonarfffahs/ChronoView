import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/auth/SignUpPage';
import SingInPage from './pages/auth/SingInPage';
import HomePage from './pages/home/HomePage';
import UserProfilePage from './pages/userProfile/UserProfilePage';
import NotFoundPage from './pages/notFound/NotFoundPage';
import MapPage from './pages/map/MapPage';
import Menubar from './components/navbar/Menubar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
    return (_jsxs(_Fragment, { children: [_jsx(Menubar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/register", element: _jsx(SignUpPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(SingInPage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(UserProfilePage, {}) }), _jsx(Route, { path: "/map", element: _jsx(MapPage, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) })] })] }));
}
export default App;
