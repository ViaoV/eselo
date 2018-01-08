import query from './query';
export const PLAYERS_LOAD = 'players:load';
export const PLAYERS_CREATE = 'players:create';
export const PLAYERS_GET = 'players:get'

export function loadPlayers() {
  return (dispatch) => {
    fetch('/api/v1/players').then((r) => {
      return r.json();
    }).then((players) => {
      dispatch({ type: PLAYERS_LOAD, data: players });
    });
  };
}

export function createPlayer(data) {
  return (dispatch) => {
    return new Promise((res, rej) => {
      query('players', { method: 'POST', data }).then((player) => {
        dispatch({ type: PLAYERS_CREATE, data: player });
        res(player);
      });
    });
  }
}

export function getPlayer(id) {
  return (dispatch) => {
    query(`players/${id}`).then((player) => {
      dispatch({ type: PLAYERS_GET, data: player })
    });
  }
}

export function topPlayers() {
  return (dispatch) => {
    query('players/top').then((players) => {
      dispatch({ type: PLAYERS_LOAD, data: players });
    });
  }
}
