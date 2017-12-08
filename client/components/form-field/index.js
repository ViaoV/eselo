import React, { Component } from 'react'
import { field } from './styles'

const FormField = props => (
  <div className={ field }>
    { props.children } 
  </div>
)

export default FormField
