import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import useAuth from './hook/auth.hook';
import Login from './components/Login/Login';
import AuthContext from './context/AuthContext';
import ListUsers from './components/ListUsers/ListUsers';
import Loading from './components/Loading/Loading';

function App() {
  const { login, token, logout, data, loading } = useAuth();
  const auth = !!token;

  return (
    <>
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          isAuth: auth,
          data,
          loading,
        }}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Route path="/" exact>
              {!auth ? <Redirect to="/login" exact /> : <ListUsers data={data} />}
            </Route>
            <Route path="/login" exact>
              {auth ? <Redirect to="/" exact /> : <Login />}
            </Route>
          </>
        )}
      </AuthContext.Provider>
    </>
  );
}

export default App;
