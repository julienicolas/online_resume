import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export default class Footer extends Component {

  render() {
    return (
      <div className="footer bg-primary text-center justify-content-md-center py-2">
          Made by Julie Nicolas
      </div>
    );
  }
}
