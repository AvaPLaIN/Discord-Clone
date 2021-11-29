//* IMPORTS
import axios from 'axios';

//* CONSTANTS
const PROXY_URL = 'http://localhost:8800/api/server';

//* SERVICES
export const getServersFromUniqueUser = async (accessToken) => {
  try {
    const data = await axios.get(`${PROXY_URL}/getServersFromUniqueUser`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getRoomsFromUniqueServer = async (accessToken, serverId) => {
  try {
    const data = await axios.get(
      `${PROXY_URL}/getRoomsFromUniqueServer/${serverId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return data?.data;
  } catch (error) {
    return error.response.data;
  }
};
