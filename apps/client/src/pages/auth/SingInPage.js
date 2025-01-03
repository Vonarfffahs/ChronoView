import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import './auth.css';
function SingInPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };
    const handleSubmit = async (e) => {
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
            }
            else {
                const error = await response.json();
                setError(error.message || 'Login failed');
            }
        }
        catch (err) {
            setError('Something went wrong :(');
            console.error(err);
        }
    };
    const toggleShowPassword = () => {
        setShowPass(!showPass);
    };
    return (_jsx(_Fragment, { children: _jsxs(Container, { className: "container-center mt-4", children: [_jsx("h1", { className: "text-center", children: "Sign In" }), _jsxs(Form, { className: "sign mt-3", onSubmit: handleSubmit, children: [error && _jsx(Alert, { variant: "danger", children: error }), success && _jsx(Alert, { variant: "success", children: success }), _jsxs(Form.Group, { className: "mb-3", controlId: "username", children: [_jsx(Form.Label, { children: "Username" }), _jsx(Form.Control, { type: "text", placeholder: "Enter username", value: formData.username, onChange: handleChange, required: true }), _jsx(Form.Text, { className: "text-muted" })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "password", children: [_jsx(Form.Label, { children: "Password" }), _jsxs(InputGroup, { children: [_jsx(Form.Control, { type: showPass ? 'text' : 'password', placeholder: "Password", value: formData.password, onChange: handleChange, required: true }), _jsx(InputGroup.Text, { children: _jsx("i", { className: `fa ${showPass ? 'fa-eye-slash' : 'fa-eye'} toggle-password`, onClick: toggleShowPassword }) })] })] }), _jsxs(Form.Group, { className: "ms-1 mb-3 d-flex justify-content-between", controlId: "formBasicCheckbox", children: [_jsx(Form.Check, { type: "checkbox", label: "Remember me" }), _jsxs(Form.Label, { children: ["Don't have an account? ", _jsx(Link, { to: "/register", children: "Sign up" })] })] }), _jsx(Form.Group, { className: "text-center", children: _jsx(Button, { variant: "success", type: "submit", className: "w-100", children: "Sign In" }) })] })] }) }));
}
export default SingInPage;
