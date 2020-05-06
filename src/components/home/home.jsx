import React, { Component } from 'react';
import CVGrid from "./cvGrid";

export default class Home extends Component {
    constructor(truc){
        super(truc);
      }
    render() {
        return (
            <div className="page home-page">
                <div>
                    HOME PAGE
                    <CVGrid/>
                </div>
            </div>
        );
    }
}