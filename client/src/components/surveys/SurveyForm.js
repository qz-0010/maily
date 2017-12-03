import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import SurveyField from './SurveyField'; 

class SurveyForm extends Component {
	render() {
		return (
			<div>
				<form name="surveyForm" onSubmit={this.props.handleSubmit(values => console.log(values))}>
					<Field label="Survey Title" type="text" name="title" component={SurveyField} />
					<Field label="Subject Line" type="text" name="subject" component={SurveyField} />
					<Field label="Email Body" type="text" name="body" component={SurveyField} />
					<Field label="Recipient List" type="text" name="emails" component={SurveyField} />
					<button type="submit">Submit</button>
				</form>
			</div> 
		);
	}
}

export default reduxForm({
 	form: 'surveyForm'
})(SurveyForm);