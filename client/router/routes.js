import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from '#app/components/app';
import Homepage from '#app/components/homepage';
import Usage from '#app/components/usage';
import NotFound from '#app/components/not-found';
import CreatePlayer from '../components/create-player';
import ViewPlayer from '../components/view-player';
import ViewPlayers from '../components/view-players';
import CreateGame from '../components/create-game';
import ViewGames from '../components/view-games';
import ViewGame from '../components/view-game';

/**
 * Returns configured routes for different
 * environments. `w` - wrapper that helps skip
 * data fetching with onEnter hook at first time.
 * @param {Object} - any data for static loaders and first-time-loading marker
 * @returns {Object} - configured routes
 */
export default ({store, first}) => {

  // Make a closure to skip first request
  function w(loader) {
    return (nextState, replaceState, callback) => {
      if (first.time) {
        first.time = false;
        return callback();
      }
      return loader ? loader({store, nextState, replaceState, callback}) : callback();
    };
  }
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Homepage} />
      <Route path="/usage" component={Usage} onEnter={w(Usage.onEnter)}/>
      <Route path="/players/new" component={ CreatePlayer } />
      <Route path="/players/:id" component={ ViewPlayer } />
      <Route path="/players" component={ ViewPlayers } />
      <Route path="/games/new" component={ CreateGame } />
      <Route path="/games/:id" component={ ViewGame } onEnter={w(ViewGame.onEnter)} />
      <Route path="/games" component={ ViewGames } />
      {/* Server redirect in action */}
      <Redirect from="/docs" to="/usage" />
      <Route path="*" component={NotFound} onEnter={w(NotFound.onEnter)}/>
    </Route>
  )
};
