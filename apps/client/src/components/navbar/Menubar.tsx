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
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Something went wrong: ', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <header>
      <Navbar expand="lg" className="bg-dark">
        <Container>
          <Navbar.Brand href="/">ChronoView</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </Nav>

            <Nav className="d-flex justify-content-end">
              {isAuthenticated ? (
                <>
                  <NavLink to="/profile" className="nav-link">
                    Profile
                  </NavLink>

                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <NavLink to="/register" className="nav-link">
                    Sign Up
                  </NavLink>

                  <NavLink to="/login" className="nav-link">
                    Sign In
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Menubar;
