import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const result = await response.json();
                setSuccess(result.message || 'Registration successful!');
                setTimeout(() => navigate('/login'), 3000);
            }
            else {
                const error = await response.json();
                setError(error.message || 'Registration failed');
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
    return (_jsx(_Fragment, { children: _jsxs(Container, { className: "container-center mt-4", children: [_jsx("h1", { className: "text-center", children: "Sign Up" }), _jsxs(Form, { className: "sign mt-3", onSubmit: handleSubmit, children: [error && _jsx(Alert, { variant: "danger", children: error }), success && _jsx(Alert, { variant: "success", children: success }), _jsxs(Form.Group, { className: "mb-3", controlId: "username", children: [_jsx(Form.Label, { children: "Username" }), _jsx(Form.Control, { type: "text", placeholder: "Enter username", value: formData.username, onChange: handleChange, required: true })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "email", children: [_jsx(Form.Label, { children: "Email address" }), _jsx(Form.Control, { type: "email", placeholder: "Enter email", value: formData.email, onChange: handleChange, required: true })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "password", children: [_jsx(Form.Label, { children: "Password" }), _jsxs(InputGroup, { children: [_jsx(Form.Control, { type: showPass ? 'text' : 'password', placeholder: "Password", value: formData.password, onChange: handleChange, required: true }), _jsx(InputGroup.Text, { children: _jsx("i", { className: `fa ${showPass ? 'fa-eye-slash' : 'fa-eye'} toggle-password`, onClick: toggleShowPassword }) })] })] }), _jsxs(Form.Group, { className: "ms-1 mb-3 d-flex justify-content-between", controlId: "formBasicCheckbox", children: [_jsx(Form.Check, { type: "checkbox", label: "Remember me" }), _jsxs(Form.Label, { children: ["Already have an account? ", _jsx(Link, { to: "/login", children: "Sign in" })] })] }), _jsx(Form.Group, { className: "text-center", children: _jsx(Button, { variant: "success", type: "submit", className: "w-100", children: "Sign Up" }) })] })] }) }));
}
export default SignUpPage;
