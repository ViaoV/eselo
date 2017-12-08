import query from './query';
export const GAMES_CREATE = 'games:create';
export const GAMES_LOAD = 'games:load';

export function createGame(data) {
  return (dispatch) => {
    return new Promise((res, rej) => {
      query('games', { method: 'POST', data }).then((game) => {
        dispatch({ type: GAMES_CREATE, data: game });
        res(game);
      });
    });
  }
}

export function loadGames() {
  return (dispatch) => {
    fetch('/api/v1/games').then((r) => {
      return r.json();
    }).then((games) => {
      dispatch({ type: GAMES_LOAD, data: games });
    });
  };
}
