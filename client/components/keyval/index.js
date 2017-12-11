import React, { Component } from 'react';
import { keyval, key, value, row } from './styles';

export const KeyValRow = (props) => (
  <div className={ row }>
    { props.children }
  </div>
)

export const KeyVal = (props) => (
  <div className={ keyval }>
    <div className={ key }>{ props.label }:</div>
    <div className={ value }>{ props.children }</div>
  </div>
)
