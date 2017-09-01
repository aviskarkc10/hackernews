import React, { Component } from 'react';

class Navbar extends Component{

	constructor(props){
		super(props);
		this.state= {
			active: "new",
			that: props.that,
			types: ['new', 'top', 'best', 'ask', 'job', 'show']
		}
		

	}

	setActive(type){
		this.setState({
			active: type
		})

		for(let i=0;i<this.state.types.length; i++){
			document.getElementById(this.state.types[i]).classList.remove('active');
		}

		document.getElementById(type).classList.add('active');
		

		this.state.that.changeTopic(type)
	}

	componentDidMount = () => {
    	
    	document.getElementById(this.state.active).classList.add('active');

  	}

	render() {

		return(

			<div className="navbar">
				<ul>
					<li><button id="new" onClick={(e) => this.setActive("new")}>New</button></li>
					<li><button id="top" onClick={(e) => this.setActive("top")}>Top</button></li>
					<li><button id="best" onClick={(e) => this.setActive("best")}>Best</button></li>
					<li><button id="ask" onClick={(e) => this.setActive("ask")}>Ask</button></li>
					<li><button id="show" onClick={(e) => this.setActive("show")}>Show</button></li>
					<li><button id="job" onClick={(e) => this.setActive("job")}>Job</button></li>
				</ul>

			</div>

			);
		
	}


}

export default Navbar;