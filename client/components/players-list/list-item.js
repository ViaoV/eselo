import React, { Component } from 'react';
import { item, elo, name, line, rank } from './styles';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

export default class ListItem extends Component {

  constructor() {
    super()
    this.click = this.click.bind(this)
  }

  click() {
    browserHistory.push(`/players/${this.props.player.ID}`)
  }

  render() {
    return (
      <div className={ item } onClick={ this.click }>
        <div className={ line }>
          <div className={ rank }>
            { this.props.rank }.
          </div>
          <div className={ name }>
            { this.props.player.name }
          </div>
          <div className={ elo }>
            { this.props.player.elo }
          </div>
        </div>
      </div>
    )
  }
}

