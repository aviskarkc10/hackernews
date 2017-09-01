import React, { Component } from 'react';

import * as httpUtil from '../utils/httpUtil.js';

import Navbar from './Navbar.js';

class Articles extends Component {

	constructor() {
		
		super();
		this.state = {
			newsId: [],
			slicedId: [],
			stories: [],
			topic: "new",
			top: 0,
			bottom: 15
		}

	}

	changeTopic = (newTopic) => {
		
		this.setState({
			topic: newTopic
		}, this.getNewsId);

		
		
	}	

	getNewsId = () => {

		let url;
    	
    	if(this.state.topic==="new") 
    		url="https://hacker-news.firebaseio.com/v0/newstories.json"

    	else if(this.state.topic==="top") 
    		url="https://hacker-news.firebaseio.com/v0/topstories.json"

    	else if(this.state.topic==="best") 
    		url="https://hacker-news.firebaseio.com/v0/beststories.json"

    	else if(this.state.topic==="ask") 
    		url="https://hacker-news.firebaseio.com/v0/askstories.json"

    	else if(this.state.topic==="show") 
    		url="https://hacker-news.firebaseio.com/v0/showstories.json"

    	else if(this.state.topic==="job") 
    		url="https://hacker-news.firebaseio.com/v0/jobstories.json"

    	//get the newsId 
	    httpUtil.get(url).then(response => {
	    	
	    	this.setState({
	        	newsId: response.data
	      	});

	    	this.sliceNewsId();
	      	
	      	this.getNewsListings();
	      	

	    });

	} 


  	componentDidMount = () => {
    	
    	this.getNewsId();

  	}

  	sliceNewsId = () => {

  		this.setState({
	      		slicedId : this.state.newsId.slice(this.state.top, this.state.bottom)
	      	});

  		// console.log(this.state.slicedId);
  	

  		
  	}

  	assignTemp = (temp) => {
  		this.setState({
  			stories: temp
  		})
  	}

  	getNewsListings = () => {

  		let url="https://hacker-news.firebaseio.com/v0/item/";
  		let temp=[];
  		let i=0;
  		this.state.slicedId.forEach(id => {

  			let tempUrl = `${url}${id}.json`;

  			httpUtil.get(tempUrl).then(response => {
  				// this.setState({

  				// 	stories: response.data
  				// })

  				temp.push(response.data);
  				i+=1;

  				// this.setState(prevState => {
  				// 	stories: prevState.stories.push(response.data)
  				// });

  				if(i===this.state.slicedId.length){
  					this.assignTemp(temp);

  				}
  			});
  		
  		});
  		
  			
  	}

  	getHrs = (time) => {
  		let date = new Date(time*1000);
  		let hrs = date.getHours();
  		return (
  			<span className="time">Posted {hrs} hours ago</span>
  			);

  	}

  	changePage = (goto) => {

  		if(goto==="previous" && this.state.top>0){
  			
  			let tempTop = this.state.top+15
  			let tempBottom=this.state.bottom+15
  			this.setState({
  				top: tempTop,
  				bottom: tempBottom
  			}, this.getNewsId());
  		}
  		else if(goto==="next" && this.state.bottom<500){
  			let tempTop = this.state.top+15
  			let tempBottom=this.state.bottom+15
  			this.setState({
  				top: tempTop,
  				bottom: tempBottom
  			}, this.getNewsId());
  		}

  	}

  	getCurrentPage = () => {
  		let page = Math.floor(this.state.top/15)+1;

  		return(
  			<span>Page: {page}</span>
  		)
  	}

  	render() {
  		
  		console.log(this.state.stories);
  		return(

   			<div>

   	  			<Navbar that={this} />

   	  			
	  			<div className="articleContainer" id="artContainer">	
				  {

		          	
		          		this.state.stories && this.state.stories.map(story => {
		          		
			           		
		          			return (
			           			<div key={story.id} className="singleStory">

			           					<a href={story.url}>
					            			<div className="storyTitle">{story.title}</div>
					              			<span className="author">By: {story.by}</span>
					              			{this.getHrs(story.time)}	

	                                    </a>

				              	</div>
			            	);
			           
		          	})
		        	
		      	}

		      	<div className="paginate">
		      		<button id="previous" onClick={(e) => this.changePage("previous")}>Previous</button>
					<button id="next" onClick={(e) => this.changePage("next")}>Next</button>
					{this.getCurrentPage()}
		      	</div>
		      	</div>

		      	
		    </div>
  			

  		);



  		
  	}
}


export default Articles;