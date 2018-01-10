import React, { Component } from 'react';
import moment from 'moment';
import css from './styles';
import { browserHistory } from 'react-router';
import EloChange from '../elo-change';
import NoData from '../no-data';

export default class GamesList extends Component {
  constructor() {
    super();
    this.state = {
      page: 1
    };
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  get pages() {
    return Math.ceil(this.props.games.length / 10);
  }

  get startIndex() {
    return (this.state.page - 1) * 10;
  }

  get endIndex() {
    return (this.startIndex + 10);
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  prevPage() {
    this.setState({ page: this.state.page - 1 })
  }

  get canNext() {
    return this.state.page < this.pages;
  }

  get canPrev() {
    return this.state.page > 1;
  }

  render() {
    if (this.props.games.length === 0) {
      return (
        <NoData message="No games played" />
      );
    }
    return (
      <div>
        <div className={ css.gamesList }>
          { this.props.games.slice(this.startIndex, this.endIndex).map(g => 
            <GameListItem key={ g.ID } game={ g } onNav={ this.props.onNav || function() {}}/>
          )}

          <div className={ css.pagination }>
            <button onClick={ this.prevPage } disabled={ !this.canPrev }>
              <i className="fa fa-chevron-left"/>
            </button>
            <button onClick={ this.nextPage } disabled={ !this.canNext }>
              <i className="fa fa-chevron-right" />
            </button>
          </div>
        </div>
      </div>
    );
  }
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
              <div className={ css.playerName }>
                { game.whitePlayer.name }
              </div>
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
