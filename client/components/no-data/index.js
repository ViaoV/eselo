import React, { Component } from 'react';
import css from './styles'; 

export default (props) => (
  <div className={ css.noData }>
    <div><i className="fa fa-ban"></i></div>
    { props.message }
  </div>
)
