import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <>
      <h1>
        This page doen't exist. Go to <Link to="/">home page</Link>
      </h1>
    </>
  );
}
export default NotFoundPage;
