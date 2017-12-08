import React, { Component } from 'react';
import styles from './styles'
import { Link } from 'react-router';

export const Actions = (props) => (
  <div className={ styles.actions }>
    { props.children }
  </div>
)

export class Action extends Component {
  render() {
    if (this.props.to) {
      return (
        <div className={ styles.action }>
          <Link to={ this.props.to }>
            <i className={`fa fa-${this.props.icon}`}></i>
            { this.props.children }
          </Link>
        </div>
      )
    } else {
      return (
        <div className={ styles.action }>
          <i className={`fa fa-${this.props.icon}`}></i> { this.props.children }
        </div>
      )
    }
  }
}
