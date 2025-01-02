import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
function NotFoundPage() {
    return (_jsx(_Fragment, { children: _jsxs("h1", { children: ["This page doen't exist. Go to ", _jsx(Link, { to: "/", children: "home page" })] }) }));
}
export default NotFoundPage;
