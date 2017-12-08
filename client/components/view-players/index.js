import React, { Component } from 'react';

import Panel from '../panel';
import PlayersList from '../players-list';
import { Action, Actions } from '../panel-actions';

export default (props) => (
  <div>
    <Actions>
      <Action icon="plus" to="/players/new">Add Player</Action>
    </Actions>
    <Panel header="Players">
      <PlayersList />
    </Panel>
  </div>
)

