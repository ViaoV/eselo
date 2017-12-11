import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadPlayers } from '../../actions/players';
import ListItem from './list-item';
import NoData from '../no-data';


class PlayersList extends Component {

  componentDidMount() {
    this.props.loadPlayers();
  }

  render() {
    if (this.props.players.length == 0) {
      return (
        <NoData message="No players" />
      )
    }
    return (
      <div>
        { this.props.players.map(p =>
          <ListItem key={ p.ID } player={ p } />
        )}
      </div>
    );
  }

}

const mapStateToProps =  (store) => ({ players: store.players.all });
const mapActionsToProps = {
  loadPlayers
};

export default connect(mapStateToProps, mapActionsToProps)(PlayersList);
