import React, { useContext, useState } from 'react';

import AuthContext from '../../context/AuthContext';
import './listUsers.css';

const ListUsers = () => {
  const authContext = useContext(AuthContext);

  const [sort, setSort] = useState(false);
  const [search, setSearch] = useState([]);
  const [prevSearch, setPrevSearch] = useState([]);

  const logoutHandler = () => {
    authContext.logout();
  };

  const users = authContext.data;

  const usersSortedById = [...users].sort((a, b) => (a.id > b.id ? 1 : -1));

  const sortUserHandler = () => {
    setSort(!sort);

    if (!!search) {
      if (!sort === true) {
        setPrevSearch(search);
        setSearch(prevSearch);
      } else {
        const ss = [...search];
        setSearch(prevSearch);
        setPrevSearch(ss);
      }
    }
  };

  const searchUserByUsername = (e) => {
    const value = e.target.value.trim();
    const reg = new RegExp(value, 'i');

    if (value.length > 0) {
      if (!sort) {
        setSearch(users.filter((i) => i.username.match(reg)));
        setPrevSearch(usersSortedById.filter((i) => i.username.match(reg)));
      } else {
        setSearch(usersSortedById.filter((i) => i.username.match(reg)));
        setPrevSearch(users.filter((i) => i.username.match(reg)));
      }
    } else {
      setSearch([]);
      setPrevSearch([]);
    }
  };

  return (
    <>
      <div className="btn-panel">
        <button className="btn btn-logout" onClick={logoutHandler}>
          Выйти
        </button>
        <button className="btn btn-sort" onClick={sortUserHandler}>
          {sort ? 'Вернуть' : 'Отсортировать по ID'}
        </button>
      </div>
      <input
        className="input-search"
        onChange={searchUserByUsername}
        type="text"
        placeholder="Поиск по Username"
      />
      <div className="wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Is Active</th>
              <th>Is Superuser</th>
              <th>Last Login</th>
            </tr>
          </thead>
          <tbody>
            {search.length > 0
              ? search.map((i) => (
                  <tr key={i.id} align="center">
                    <td>{i.id}</td>
                    <td>{i.username}</td>
                    <td>{!!i.last_name ? i.last_name : '...'}</td>
                    <td>{!!i.first_name ? i.first_name : '...'}</td>
                    <td>{i.is_active ? 'Active' : 'Not active'}</td>
                    <td>{i.is_superuser ? 'Super User' : 'Not super user'}</td>
                    <td>{!!i.last_login ? i.last_login : '...'}</td>
                  </tr>
                ))
              : sort
              ? usersSortedById.map((i) => (
                  <tr key={i.id} align="center">
                    <td>{i.id}</td>
                    <td>{i.username}</td>
                    <td>{!!i.last_name ? i.last_name : '...'}</td>
                    <td>{!!i.first_name ? i.first_name : '...'}</td>
                    <td>{i.is_active ? 'Active' : 'Not active'}</td>
                    <td>{i.is_superuser ? 'Super User' : 'Not super user'}</td>
                    <td>{!!i.last_login ? i.last_login : '...'}</td>
                  </tr>
                ))
              : users.map((i) => (
                  <tr key={i.id} align="center">
                    <td>{i.id}</td>
                    <td>{i.username}</td>
                    <td>{!!i.last_name ? i.last_name : '...'}</td>
                    <td>{!!i.first_name ? i.first_name : '...'}</td>
                    <td>{i.is_active ? 'Active' : 'Not active'}</td>
                    <td>{i.is_superuser ? 'Super User' : 'Not super user'}</td>
                    <td>{!!i.last_login ? i.last_login : '...'}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListUsers;
