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

export const getMessagesFromUniqueRoom = async (accessToken, roomId) => {
  try {
    const data = await axios.get(
      `${PROXY_URL}/getMessagesFromUniqueRoom/${roomId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return data?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createMessage = async (accessToken, roomId, message) => {
  try {
    const data = await axios.post(
      `${PROXY_URL}/createMessage`,
      { roomId, message },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return data?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createServer = async (accessToken, servername) => {
  try {
    const data = await axios.post(
      `${PROXY_URL}/createServer`,
      { servername },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return data?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createRoom = async (accessToken, serverId, roomName) => {
  try {
    const data = await axios.post(
      `${PROXY_URL}/createRoom`,
      { serverId, roomName },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return data?.data;
  } catch (error) {
    return error.response.data;
  }
};
