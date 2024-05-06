import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
import { useState, useEffect } from 'react';

// Check if someone is authorized before they access this route. If they're not authorized, we need to redirect them to login
function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  // As soon as we load a protected route, we try to authorize them by calling the auth() function (which itself calls the refreshToken() function if their access token has expired)
  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  // Refresh the access token for us automatically
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      // Send a request to the backend with the refresh token to get a new access token
      const res = await api.post('/api/token/refresh/', {
        refresh: refreshToken, // Pass payload - the refresh token from local storage
      });
      // If the request for a new access token was successful, set that token in local storage and authorize them. Otherwise, make them login again
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  // Check if we need to refresh the token or if the token is still valid
  const auth = async () => {
    // Check if they have a token
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    // If they do have an access token, find the expiration date to check if it's still valid or if it needs to be refreshed
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000; // Get the date in seconds, not milliseconds

    // If access token is expired, generate a new one. If it's still valid, they're good to go
    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  // Until isAuthorized is something other than null, we're loading. Checking the authorization status/generating tokens
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  // If they're authorized, we return the children that we wrapped
  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
