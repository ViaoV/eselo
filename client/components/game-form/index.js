import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import FormField from '../form-field'
import { FormActions } from '../form-actions'; 
import { connect } from 'react-redux';
import { loadPlayers } from '../../actions/players';

class GameForm extends Component {

  componentDidMount() {
    this.props.loadPlayers();    
  }

  render() {
    return (
      <form onSubmit={ this.props.handleSubmit }>
        <FormField>
          <label htmlFor="name">White Player</label>
          <Field name="whitePlayerId" component="select">
            <option />
            { this.props.players.map(p =>
              <option key={ p.ID } value={ p.ID }>{ p.name }</option>
            )}
          </Field>
        </FormField>
        <FormField>
          <label htmlFor="name">Black Player</label>
          <Field name="blackPlayerId" component="select">
            <option />
            { this.props.players.map(p =>
              <option key={ p.ID } value={ p.ID }>{ p.name }</option>
            )}
          </Field>
        </FormField>
        <FormField>
          <label htmlFor="name">Outcome</label>
          <Field name="outcome" component="select">
            <option />
            <option value="white">White Wins</option>
            <option value="black">Black Wins</option>
            <option value="stale">Stalemate</option>
          </Field>
        </FormField>
        <FormActions>
          <button type="submit">Save</button>
        </FormActions>
      </form>
    )
  }
}

GameForm = reduxForm({ form: 'game' })(GameForm)

const mapProps = (store) => ({
  players: store.players.all
})

const mapActions = {
  loadPlayers
}

GameForm = connect(mapProps, mapActions)(GameForm)

export default GameForm
