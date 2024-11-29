import { Container, Form, Button } from 'react-bootstrap';

import './auth.css';

function SingInPage() {
  return (
    <>
      <Container className="container-center">
        <h1 className="text-center">Sign In</h1>
        <Form className="sign mt-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-1" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="ms-1 mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          <Form.Group className="text-center">
            <Button variant="primary" type="submit" className="w-100">
              Sign In
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}
export default SingInPage;
