import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class Header extends Component {

  render() {
    return (
      <ul className="header nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" to={"/"} >Accueil</Link>
        </li>
        {!this.props.isLoggedIn && <li className="nav-item">
          <Link className="nav-link" to={"/signup"} >Inscription</Link>
        </li>}
        {!this.props.isLoggedIn && <li className="nav-item">
          <Link className="nav-link" to={"/signin"} >Connexion</Link>
        </li>}
        {this.props.isLoggedIn && <li className="nav-item">
          <Link className="nav-link" to={"/profile"} >Profile</Link>
        </li>}
        {this.props.isLoggedIn && this.props.user && <span className="welcome">{`Bienvenue ${this.props.user.email}`}</span>}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.authentification.isLoggedIn,
  user: state.user.user
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);