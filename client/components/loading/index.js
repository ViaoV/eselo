import React from 'react';

import css from './style';

export default (props) => (
	<div className={ css.container }>
		<div className={ `${css.cube1} ${css.cube}` }></div>
		<div className={ `${css.cube2} ${css.cube}` }></div>
		<div className={ `${css.cube4} ${css.cube}` }></div>
		<div className={ `${css.cube3} ${css.cube}` }></div>
	</div>
)
