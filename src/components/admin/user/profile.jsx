import React, { Component } from 'react';

export default class Profile extends Component {
    render() {
      const {user} = this.props;
        return (
            <div className="page profile-page">
                <div>
                    {user.email}
                </div>
            </div>
        );
    }
}