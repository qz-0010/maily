import React from "react";
import {connect} from "react-redux";
import  * as actions from "../actions";
import {Link} from "react-router-dom";
import Payments from './Payments';

class Header extends React.Component{

	componentDidMount() {

	}

	renderItems(){
		switch(this.props.auth){
			case null:
				return;
			case false:
				return <li><a href="/api/auth/google">Login with google</a></li>
			default:
				return [
					<li key="1">
						<Link to='/surveys'>
							Surveys
						</Link>
					</li>,
					<li key="2" style={{margin: '0 10px'}}>
						<Payments />
					</li>,
					<li key="4">
						Credits: {this.props.auth.credits}
					</li>,
					<li key="3" className="">
						<a href="#" onClick={this.props.logout}>Logout</a>
					</li>
				]
					
		}
	}

	render(){
		return (
			<nav className="nav">
				<ul>
					<li>
						<Link to={this.props.auth ? '/surveys' : '/'}>
							Emaily
						</Link>
					</li>
					
					{this.renderItems()}
				</ul>
			</nav>
		)
	}
}

function mapStateToProps({auth}) {
	return { auth };
}

export default connect(mapStateToProps,actions)(Header);