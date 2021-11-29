//* IMPORTS
//     * SERVICES

//* CONSTANTS
//     * DATA
export const CURRENT_SERVER = 'REDUX/DATA/CURRENT_SERVER';
export const CURRENT_ROOM = 'REDUX/DATA/CURRENT_ROOM';

//* INIT
const initialState = {
  currentServer: null,
  currentRoom: null,
};

//* REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_SERVER:
      return { ...state, currentServer: action.payload };

    case CURRENT_ROOM:
      return { ...state, currentRoom: action.payload };

    default:
      return state;
  }
};

//* ACTIONS
export const setCurrentServer = (server) => {
  return {
    type: CURRENT_SERVER,
    payload: server,
  };
};

export const setCurrentRoom = (room) => {
  return {
    type: CURRENT_ROOM,
    payload: room,
  };
};

//* EXPORT
export default reducer;
