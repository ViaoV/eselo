import { 
  PLAYERS_LOAD,
  PLAYERS_GET,
  PLAYERS_CREATE
} from '../actions/players';

const initialState = {
  all: [],
  player: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PLAYERS_LOAD: 
      return {
        ...state,
        all: action.data
      };
    case PLAYERS_GET:
      return {
        ...state,
        player: action.data
      }
    case PLAYERS_CREATE:
      return {
        ...state,
        player: action.data
      }
    default:
      return state;
  }
}
