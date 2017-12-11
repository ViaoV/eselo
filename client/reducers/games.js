import { 
  GAMES_CREATE,
  GAMES_LOAD,
  GAMES_GET
} from '../actions/games';

const initialState = {
  all: [],
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
    default:
      return state;
  }
}
