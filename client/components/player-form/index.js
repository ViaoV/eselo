import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import FormField from '../form-field'
import { FormActions } from '../form-actions'; 

class PlayerForm extends Component {

  render() {
    return (
      <form onSubmit={ this.props.handleSubmit }>
        <FormField>
          <label htmlFor="name">Name</label>
          <Field name="name" component="input" type="text" />
        </FormField>
        <FormActions>
          <button type="submit">Save</button>
        </FormActions>
      </form>
    )
  }
}

PlayerForm = reduxForm({ form: 'player' })(PlayerForm)

export default PlayerForm
