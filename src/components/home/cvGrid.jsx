import React, { Component } from "react";
import * as actions from "../../containers/home/actions";
import { connect } from "react-redux";

import Loader from '../loader';

export class CVGrid extends Component {

  constructor(props){
    super(props);
    this.props.getLastCvs();
  }

  render() {
    console.log('RENDER CVGRID', this.props.cvs);
    const cvs = this.props.lastCvs ? this.props.lastCvs.map((cv, index) => {
    return (<li key={`cv-${index}`}>{cv.title}</li>)
    }) : []
    return (
      <div className="cv-grid">
        <Loader isLoading={this.props.isLoading}/>
        <ul>
          {cvs}
        </ul>

      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    lastCvs: state.home.lastCvs,
    isLoading: state.home.lastCvsLoading
  };
};

export default connect(mapStateToProps, actions)(CVGrid);