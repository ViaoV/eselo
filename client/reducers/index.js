import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { SET_CONFIG } from '../actions';
import players from './players';
import games from './games';
import { routerReducer } from 'react-router-redux';


function config(state = {}, action) {
  switch (action.type) {
  case SET_CONFIG:
    return action.config;
  default:
    return state;
  }
}

export default combineReducers({
  config,
  players,
  games,
  form: formReducer,
  routing: routerReducer,
});
