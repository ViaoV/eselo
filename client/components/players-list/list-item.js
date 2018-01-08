import React, { Component } from 'react';
import { item, elo, name, line } from './styles';
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
    const { player } = this.props
    return (
      <div className={ item } onClick={ this.click }>
        <div className={ line }>
          <div className={ name }>
            <i className="fa fa-user"></i> { player.name }
          </div>
          <div className={ elo }>
            { player.elo }
          </div>
        </div>
      </div>
    )
  }
}

