import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, InputGroup } from 'react-bootstrap';

import './auth.css';

function SingInPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('token', result.access_token);
        setSuccess('Login successful!');
        setTimeout(() => navigate('/profile'), 3000);
      } else {
        const error = await response.json();
        setError(error.message || 'Login failed');
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
      <Container className="container-center">
        <h1 className="text-center">Sign In</h1>
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
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-1" controlId="password">
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
          <Form.Group className="ms-1 mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          <Form.Group className="text-center">
            <Button variant="success" type="submit" className="w-100">
              Sign In
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}
export default SingInPage;
