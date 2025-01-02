import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function UserProfilePage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fethUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const response = await fetch('/api/auth/profile', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                }
                else {
                    setError('Unauthorized. Please log in again. You will be redirected in 3s.');
                    setTimeout(() => navigate('/login'), 3000);
                }
            }
            catch (err) {
                setError('Something went wrong :(');
                console.error(err);
            }
        };
        fethUserData();
    }, [navigate]);
    if (error) {
        return _jsx("h1", { className: "text-center", children: error });
    }
    if (!user) {
        return _jsx("h1", { className: "text-center", children: "Loading..." });
    }
    return (_jsxs(_Fragment, { children: [_jsxs("h1", { className: "text-center", children: ["Welcome to your profile page, ", user.username, "!"] }), _jsxs("p", { className: "text-center", children: ["Email: ", user.email] }), _jsxs("p", { className: "text-center", children: ["Role: ", user.role] }), _jsxs("p", { className: "text-center", children: ["Ban Status: ", user.banStatus ? 'Banned' : 'Active'] })] }));
}
export default UserProfilePage;
