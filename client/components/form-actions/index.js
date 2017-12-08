import React, { Component } from 'react';

import { formActions } from './styles';

export const FormActions = (props) => (
  <div className={ formActions }>
    { props.children }
  </div>
)
