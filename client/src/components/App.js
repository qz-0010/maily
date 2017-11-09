import * as actions from "../actions";
import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {connect} from "react-redux";
import Header from "./Header";
require("materialize-css/dist/css/materialize.min.css");

// const Header = () => <h2>Header</h2>;
const Landing = () => <h2>Landing</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
// {/*const Header = () => <h2>Header</h2>;*/}
// {/*const Header = () => <h2>Header</h2>;*/}



class App extends React.Component {

	componentDidMount() {
		this.props.fetchUser();
	}

	setRoutes(){
		if(!this.props.auth){
			return <Route path="/*" component={Landing} key="1"/>;
		}

            			
		return [
					<Route exact path="/" component={Landing} />,
            		<Route path="/surveys" component={Dashboard} key="1"/>,
            		<Route exact path="/surveys/new" component={SurveyNew} key="2"/>
				]

	}

	render(){
	    return (
            <div>
            	<BrowserRouter>
            		<div>
            			<Header/>
            			{this.setRoutes()}
            		</div>
            	</BrowserRouter>
            </div>
        )
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps,actions)(App);