import query from './query';
export const GAMES_CREATE = 'games:create';
export const GAMES_LOAD = 'games:load';
export const GAMES_GET = 'games:get';
export const GAMES_CLEAR = 'games:clear';

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
    clearGames();
    fetch('/api/v1/games').then((r) => {
      return r.json();
    }).then((games) => {
      dispatch({ type: GAMES_LOAD, data: games });
    });
  };
}

export function getMatchups(player1, player2) {
  return (dispatch) => {
    fetch(`/api/v1/matchups?player1=${player1}&player2=${player2}`).then((r) => {
      return r.json();
    }).then((games) => {
      dispatch({ type: GAMES_LOAD, data: games });
    });
  };
}

export function getGame(id) {
  return (dispatch) => {
    return new Promise((res, rej) => {
      fetch(`/api/v1/games/${id}`).then((r) => {
        return r.json();
      }).then((game) => {
        dispatch({ type: GAMES_GET, data: game });
        res(game)
      });
    });
  };
}

export function loadPlayerGames(player) {
  return (dispatch) => {
		clearGames();
    fetch(`/api/v1/players/${player.ID}/games`).then((r) => {
      return r.json();
    }).then((games) => {
      dispatch({ type: GAMES_LOAD, data: games });
    });
  };
}

export function clearGames() {
  return (dispatch) => {
    dispatch({ type: GAMES_CLEAR });
  };
}
