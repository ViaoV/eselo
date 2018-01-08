import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styles from './styles';
import Nav from './navigation';

export default class App extends Component {

  render() {
    return (
      <div className={ styles.appWrapper }>
        <div className={ styles.brand }>ESELO <span>Chess Tracker</span></div>
        <div className={ styles.appContainer }>
          <div className={ styles.appHeader }>
          </div>
          <div className={ styles.navigationWrapper } >
            <Nav />
          </div>
          <div className={ styles.appBody }>
            <Helmet title='Kosmic Koalas ELO Tracker' />
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

}
