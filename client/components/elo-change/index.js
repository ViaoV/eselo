import React, { Component } from 'react';
import css from './styles';

export default (props) => {
  const outcomeCls = (props.from > props.to) ? css.red : css.green
  const cls = `${css.eloChange} ${outcomeCls}`
  return (
    <div className={ cls }>
      { props.from } <i className="fa fa-arrow-right"></i> { props.to }
    </div>
  )
}
