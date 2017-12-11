import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGame, getMatchups } from '../../actions/games';
import EloChange from '../elo-change';
import Panel from '../../components/panel';
import GamesList from '../games-list';

import css from './styles';

class ViewGame extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getGame(this.props.params.id).then((game) => {
      this.props.getMatchups(game.whitePlayer.ID, game.blackPlayer.ID)
    });
  }

  render() {
    return (
      <div>
        <div className={ css.outcome }>
          { this.props.game.outcome === 'white' &&
              <div className={ css.outcome }>
                { this.props.game.whitePlayer.name } Beats { this.props.game.blackPlayer.name }
              </div>
          }
          { this.props.game.outcome === 'black' &&
              <div className={ css.outcome }>
                { this.props.game.blackPlayer.name } Beats { this.props.game.whitePlayer.name }
              </div>
          }
          { this.props.game.outcome === 'stale' &&
              <div className={ css.outcome }>
                Stalemate
              </div>
          }
        </div>
        <div className={ css.players }>
          <div className={ css.player }>
            <div className={ css.playerColor}>WHITE</div>
            <div className={ css.name }>{ this.props.game.whitePlayer.name }</div>
            <EloChange from={ this.props.game.whiteStartingElo } to={ this.props.game.whiteEndingElo } />
          </div>
          <div className={ css.vs }>VS</div>
          <div className={ css.player }>
            <div className={ css.playerColor}>BLACK</div>
            <div className={ css.name }>{ this.props.game.blackPlayer.name }</div>
            <EloChange from={ this.props.game.whiteEndingElo } to={ this.props.game.blackEndingElo } />
          </div>
        </div>
        <Panel header="Matchups">
          <GamesList games={ this.props.games } onNav={this.componentDidMount.bind(this)}/>
        </Panel>
      </div>
    )
  }
}


const mapProps = (store) => ({
  game: store.games.game,
  games: store.games.all
})

const mapActions = {
  getGame,
  getMatchups
}

export default connect(mapProps, mapActions)(ViewGame)

