import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Menubar.css';
function Menubar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000; // time in sec
                if (decodedToken.exp && decodedToken.exp < currentTime) {
                    // localStorage.removeItem('token');
                    setIsAuthenticated(false);
                }
                else {
                    setIsAuthenticated(true);
                }
            }
            catch (error) {
                console.error('Something went wrong: ', error);
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            }
        }
        else {
            setIsAuthenticated(false);
        }
    }, [navigate]);
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    };
    return (_jsx("header", { children: _jsx(Navbar, { expand: "lg", className: "bg-dark", children: _jsxs(Container, { children: [_jsx(Navbar.Brand, { href: "/", children: "ChronoView" }), _jsx(Navbar.Toggle, { "aria-controls": "navbar-nav" }), _jsxs(Navbar.Collapse, { id: "navbar-nav", children: [_jsxs(Nav, { className: "me-auto", children: [_jsx(NavLink, { to: "/", className: "nav-link", children: "Home" }), _jsx(NavLink, { to: "/map", className: "nav-link", children: "Map" })] }), _jsx(Nav, { className: "d-flex justify-content-end", children: isAuthenticated ? (_jsxs(_Fragment, { children: [_jsx(NavLink, { to: "/profile", className: "nav-link", children: "Profile" }), _jsx(Nav.Link, { onClick: handleLogout, children: "Logout" })] })) : (_jsxs(_Fragment, { children: [_jsx(NavLink, { to: "/register", className: "nav-link", children: "Sign Up" }), _jsx(NavLink, { to: "/login", className: "nav-link", children: "Sign In" })] })) })] })] }) }) }));
}
export default Menubar;
