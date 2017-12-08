/**
 * action types
 */

export const SET_CONFIG = 'SET_CONFIG';
export const PLAYERS_LOAD = 'PLAYERS::LOAD';

/**
 * action creators
 */

export function setConfig(config) {
  return { type: SET_CONFIG, config };
}
