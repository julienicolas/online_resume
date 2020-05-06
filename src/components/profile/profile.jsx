import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../containers/profile/actions";
import { connect } from "react-redux";

import CVForm from './CVForm';

const FIELDS = { email: "email", firstName: "firstName", lastName: 'lastName' };

class Profile extends Component {
  handleSubmit = credentials => {
    this.props.updateUser(credentials, this.props.history);
  };

  deleteCv(cv) {
    this.props.deleteCv(cv);
  }

  formatCvs = () => {
    return this.props.user.cvs.map((cv) => {
      return (<li key={cv._id} className="cv-item justify-content-md-center row" >
        <div className="col-md-9 cv-preview" onClick={(e) => this.setCVFormAction(cv)}><h4 className="text-center">{cv.title}</h4></div>
        <div className="col-md-3" onClick={() => this.deleteCv(cv)}>Supprimer</div>
      </li>)
    })
  }

  setCVFormAction = (cv) => {
    this.props.setCurrentCv(cv);
  }

  constructor(props) {
    super(props);
  }

  render() {
    const cvs = this.props.user && this.props.user.cvs.length > 0 ? this.formatCvs() : "Vous n'avez pas de CV"
    return (
      <div className="page profile-page">
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
              <div className="row justify-content-md-center mb-3">

                <h1>Mes informations</h1>
              </div>
              <div className="row justify-content-md-center">
                <fieldset className="col-md-8 form-group">
                  <label className="bmd-label-floating">Email</label>
                  <Field
                    name={FIELDS.email}
                    component="input"
                    type="text"
                    className="form-control"
                  />
                </fieldset>
              </div>
              <div className="row justify-content-md-center">
                <fieldset className="col-md-8 form-group">
                  <label className="bmd-label-floating">Prénom</label>
                  <Field
                    name={FIELDS.firstName}
                    component="input"
                    type="text"
                    className="form-control"
                  />
                </fieldset>
              </div>
              <div className="row justify-content-md-center">
                <fieldset className="col-md-8 form-group">
                  <label className="bmd-label-floating">Nom</label>
                  <Field
                    name={FIELDS.lastName}
                    component="input"
                    type="text"
                    className="form-control"
                  />
                </fieldset>
              </div>
              <div className="row justify-content-md-center">
                <button type="submit" className="btn btn-primary btn-raised m-3">
                  Mettre à jour
                </button>
              </div>
            </form>

          </div>
          <div className="col-md-6">
            <div className="row justify-content-md-center mb-3">
              <h1>Mes CVs</h1>
            </div>
            <div className="row justify-content-md-center"><ul className="col-md-10">{cvs}</ul></div>
            <div className="row justify-content-md-center">
              <button onClick={() => this.setCVFormAction(null)} className="btn btn-primary btn-raised m-3">Créer un CV</button>

            </div>
          </div>
        </div>

        <div className={`cv-form-cont ${this.props.displayCvForm ? 'display' : ''} row `}>
          <button type="button" className="close" onClick={() => this.props.setCvFormDisplay(false)}>&times;</button>
          <div className="row justify-content-md-center">
            <CVForm />
          </div>
        </div>

      </div>
    );
  }
}

const userForm = reduxForm({
  form: "userupdate",
  fields: Object.keys(FIELDS)
})(Profile);

const mapStateToProps = state => {
  return {
    user: state.user.user,
    initialValues: state.user.user,
    cvInitialValues: state.profile.currentCV,
    displayCvForm: state.profile.displayCvForm
  };
};

export default connect(mapStateToProps, actions)(userForm);