import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // GET data from the server and validate token if user login
  const fetchData = () => {
    const data = localStorage.token;

    if (data) {
      const headers = {
        accept: 'application/json',
        Authorization: `Token ${data}`,
        'X-CSRFToken': 'tcTPQJvtb7kAIpqmTZL9hyY22lRkGBU1iysaV3dhi34yidEXmgUujy73NnIlLWJI',
      };
      axios
        .get('https://emphasoft-test-assignment.herokuapp.com/api/v1/users/', {
          headers,
        })
        .then(({ data }) => {
          setData(data);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          logout();
        });
    } else setLoading(false);
  };

  // Login user and write token in localStorage
  const login = useCallback((tkn) => {
    setLoading(true);
    setToken(tkn);
    localStorage.setItem('token', tkn);

    fetchData();
    // eslint-disable-next-line
  }, []);

  // Logout user
  const logout = useCallback((tkn) => {
    setToken(null);
    localStorage.removeItem('token');
  }, []);

  // Called on first load and validates the token
  // if token invalid logout user and redirect on '/login' page
  // if valid redirect on main page '/'
  useEffect(() => {
    const data = localStorage.token;

    if (data) {
      login(data);
    } else {
      setLoading(false);
    }
  }, [login]);

  return { login, token, logout, data, loading };
};

export default useAuth;
