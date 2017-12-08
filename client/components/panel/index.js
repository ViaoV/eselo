import React, { Component } from 'react';
import { panel, header, body } from './styles';


export default (props) => (
  <div className={ panel }>
    <div className={ header }>{ props.header }</div>
    <div className={ body }>
      { props.children }
    </div>
  </div>
);
