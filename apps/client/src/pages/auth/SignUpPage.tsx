import { useState } from 'react';
import { Alert, Button, Container, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import './auth.css';

function SignUpPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
    banStatus: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPass, setShowPass] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message || 'Registration successful!');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        const error = await response.json();
        setError(error.message || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong :(');
      console.error(err);
    }
  };

  const toggleShowPassword = () => {
    setShowPass(!showPass);
  };

  return (
    <>
      <Container className="container-center mt-4">
        <h1 className="text-center">Sign Up</h1>
        <Form className="sign mt-3" onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <InputGroup.Text>
                <i
                  className={`fa ${showPass ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
                  onClick={toggleShowPassword}
                ></i>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group
            className="ms-1 mb-3 d-flex justify-content-between"
            controlId="formBasicCheckbox"
          >
            <Form.Check type="checkbox" label="Remember me" />
            <Form.Label>
              Already have an account? <Link to="/login">Sign in</Link>
            </Form.Label>
          </Form.Group>

          <Form.Group className="text-center">
            <Button variant="success" type="submit" className="w-100">
              Sign Up
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}

export default SignUpPage;
