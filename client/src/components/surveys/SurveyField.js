import React from 'react';

export default ({ input, label }) => { //prop.input....onChage
	return (
		<div>
			<label htmlFor="">{label}</label>
			<input {...input} />
		</div>
	);
}