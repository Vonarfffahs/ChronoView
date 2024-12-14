import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/user';

function UserProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
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
        } else {
          setError(
            'Unauthorized. Please log in again. You will be redirected in 3s.',
          );
          setTimeout(() => navigate('/login'), 3000);
        }
      } catch (err) {
        setError('Something went wrong :(');
        console.error(err);
      }
    };

    fethUserData();
  }, [navigate]);

  if (error) {
    return <h1 className="text-center">{error}</h1>;
  }

  if (!user) {
    return <h1 className="text-center">Loading...</h1>;
  }

  return (
    <>
      <h1 className="text-center">
        Welcome to your profile page, {user.username}!
      </h1>
      <p className="text-center">Email: {user.email}</p>
      <p className="text-center">Role: {user.role}</p>
      <p className="text-center">
        Ban Status: {user.banStatus ? 'Banned' : 'Active'}
      </p>
    </>
  );
}
export default UserProfilePage;
