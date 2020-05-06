import React, { Component } from "react";
export default class Loader extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (this.props.isLoading ? <div>Loading...</div> : null);
    
  }
};
