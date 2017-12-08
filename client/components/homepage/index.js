import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { title, p, link } from './styles';
import PlayersList from '../players-list';
import CreatePlayerForm from '../create-player';
import Panel from '../panel';

export default class Homepage extends Component {
  /*eslint-disable */
  static onEnter({store, nextState, replaceState, callback}) {
    // Load here any data.
    callback(); // this call is important, don't forget it
  }
  /*eslint-enable */

  render() {
    return <div>
      <Helmet
        title='ELO Rankings'
        meta={[
          {
            property: 'og:title',
            content: 'Golang Isomorphic React/Hot Reloadable/Redux/Css-Modules Starter Kit'
          }
        ]} />
    </div>;
  }

}
