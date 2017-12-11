import React, { Component } from 'react';

import { Link } from 'react-router';

import { navigation, active, header } from './styles';

export default (props) => (
  <div className={ navigation }>
    <ul>
      <li>
        <Link to="/"> <i className="fa fa-home"></i> Home</Link>
      </li>
      <li className={ header }>
        Players
      </li>
      <li>
        <Link to="/players" activeClassName={ active }> <i className="fa fa-users"></i> Players</Link>
      </li>
      <li className={ header }>
        Games
      </li>
      <li>
        <Link to="/games/new" activeClassName={ active }> <i className="fa fa-edit"></i> Record Game</Link>
      </li>
      <li>
        <Link to="/games" activeClassName={ active }> <i className="fa fa-list"></i> Games</Link>
      </li>
    </ul>
  </div>
)
