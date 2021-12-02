//* IMPORTS
//     * SERVICES

//* CONSTANTS
//     * DATA
export const CURRENT_SERVER = 'REDUX/SERVER/CURRENT_SERVER';
export const CURRENT_ROOM = 'REDUX/SERVER/CURRENT_ROOM';
export const ADD_MESSAGE = 'REDUX/SERVER/ADD_MESSAGE';
export const SET_MESSAGES = 'REDUX/SERVER/SET_MESSAGES';
export const RESET_MESSAGES = 'REDUX/SERVER/RESET_MESSAGES';

//* INIT
const initialState = {
  currentServer: null,
  currentRoom: null,
  messages: [],
};

//* REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_SERVER:
      return { ...state, currentServer: action.payload, currentRoom: null };

    case CURRENT_ROOM:
      return { ...state, currentRoom: action.payload };

    case SET_MESSAGES:
      return { ...state, messages: action.payload };

    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };

    case RESET_MESSAGES:
      return { ...state, messages: [] };

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

export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    payload: messages,
  };
};

export const addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    payload: message,
  };
};

export const resetMessages = () => {
  return {
    type: RESET_MESSAGES,
  };
};

//* EXPORT
export default reducer;
