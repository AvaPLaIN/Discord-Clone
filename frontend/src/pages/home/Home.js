//* IMPORTS
//     * REACT
import React, { useEffect } from 'react';

//     * COMPONENTS
import { HomeComponent } from './Home.styled';
import ServerList from '../../components/server-list/ServerList';
import ServerUi from '../../components/server-ui/ServerUi';

//     * REDUX
import { useDispatch, useSelector } from 'react-redux';
import { user_logout } from '../../redux/ducks/user';
import { fetch_data } from '../../redux/ducks/data';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    // dispatch(fetch_data(user.accessToken));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(user_logout());
  };

  return (
    <HomeComponent>
      <ServerList />
      <ServerUi />
    </HomeComponent>
  );
};

export default Home;
