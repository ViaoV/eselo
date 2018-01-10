import { 
  GAMES_CREATE,
  GAMES_LOAD,
  GAMES_GET,
  GAMES_CLEAR
} from '../actions/games';

const initialState = {
  all: false,
  game: {
    whitePlayer: {},
    blackPlayer: {}
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GAMES_LOAD: 
      return {
        ...state,
        all: action.data
      };
    case GAMES_CREATE:
      return {
        ...state,
        game: action.data
      }
    case GAMES_GET:
      return {
        ...state,
        game:action.data
      }
    case GAMES_CLEAR:
      return {
        ...state,
        all: false
      }
    default:
      return state;
  }
}
