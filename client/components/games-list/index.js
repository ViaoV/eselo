import React, { Component } from 'react';
import moment from 'moment';
import css from './styles';
import { browserHistory } from 'react-router';
import EloChange from '../elo-change';
import NoData from '../no-data';

export default (props) => {
  if (props.games.length === 0) {
    return (
      <NoData message="No Games" />
    )
  }
  return (
    <div className={ css.gamesList }>
      { props.games.map(g => 
        <GameListItem key={ g.ID } game={ g } onNav={ props.onNav || function() {}}/>
      )}
    </div>
  )
}


const GameListItem = (props) => {
  const { game } = props;

  const click = () => {
    browserHistory.push(`/games/${game.ID}`)
    props.onNav()
  }

  return (
    <div className={ css.gameListItem } onClick={ click }>
      <div className={ css.players }>
        <div className={ css.white }>
          <div className={ css.player }>
            <div className={ css.playerColor }>White</div>
            <div className={ css.playerName }>{ game.whitePlayer.name }</div>
          </div>
          <EloChange from={ game.whiteStartingElo } to={ game.whiteEndingElo } />
        </div>
        <div className={ css.game }>
          { game.outcome === 'white' &&
              <div className={ css.outcome }>
                { game.whitePlayer.name }
                <i className="fa fa-arrow-right"></i>
                { game.blackPlayer.name }
              </div>
          }
          { game.outcome === 'black' &&
              <div className={ css.outcome }>
                { game.blackPlayer.name }
                <i className="fa fa-arrow-right"></i>
                { game.whitePlayer.name }
              </div>
          }
          { game.outcome === 'stale' &&
              <div className={ css.outcome }>
                Stalemate
              </div>
          }
          <div className={css.date}>
            { moment(game.CreatedAt).format('MM/DD/YY h:m:s a') }
          </div>
        </div>
        <div className={ css.black }>
          <div className={ css.player }>
            <div className={ css.playerName }> { game.blackPlayer.name } </div>
            <div className={ css.playerColor }>black</div>
          </div>
          <EloChange from={ game.blackStartingElo } to={ game.blackEndingElo } />
        </div>
      </div>
    </div>
  )
}
