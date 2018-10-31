import React from "react";
import "./Button.css";

class Button extends React.Component {
	constructor(props){
		super(props);	
	}
	
	render(){
		return (
			<div className="ui-button">
				<button onClick={this.props.onClick}>{this.props.label}</button>
			</div>
		);
	}
}

export default Button;