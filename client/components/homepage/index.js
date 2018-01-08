import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import styles, { title, p, link, rankings } from './styles';
import PlayersList from '../players-list';
import CreatePlayerForm from '../create-player';
import Panel from '../panel';
import { topPlayers } from '../../actions/players';

class Homepage extends Component {
  /*eslint-disable */
  static onEnter({store, nextState, replaceState, callback}) {
    // Load here any data.
    callback(); // this call is important, don't forget it
  }
  /*eslint-enable */

  componentDidMount() {
    this.props.topPlayers();
  }

  render() {
    return (
      <div>
        <Helmet
          title='ELO Rankings'
          meta={[
            {
              property: 'og:title',
              content: 'Golang Isomorphic React/Hot Reloadable/Redux/Css-Modules Starter Kit'
            }
          ]} />
        <div className={ rankings }>
          <div className={ styles.rankingContainer }>
            { this.props.players.length > 0 &&
            <div className={ styles.ranking + ' ' + styles.first }>
              <i className="fa fa-trophy"></i>
              <div className={ styles.rank }> 1st </div>
              <div className={ styles.name }>{ this.props.players[0].name }</div>
            </div>
            }
          </div>
          <div className={ styles.rankingContainer }>
            { this.props.players.length > 0 &&
            <div className={ styles.ranking + ' ' + styles.second }>
              <i className="fa fa-trophy"></i>
              <div className={ styles.rank }> 2nd </div>
              <div className={ styles.name }>{ this.props.players[1].name }</div>
            </div>
            }
            { this.props.players.length > 0 &&
            <div className={ styles.ranking + ' ' + styles.third }>
              <i className="fa fa-trophy"></i>
              <div className={ styles.rank }> 3rd </div>
              <div className={ styles.name }>{ this.props.players[2].name }</div>
            </div>
            }
          </div>
        </div>
      </div>
    );
  }

}


const mapProps = (store) => ({
  players: store.players.all
});

const mapActions = {
  topPlayers
};

export default connect(mapProps, mapActions)(Homepage);
