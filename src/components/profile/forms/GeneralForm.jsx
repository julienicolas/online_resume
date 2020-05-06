import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import FileField      from '../FileField';
import Dropzone       from 'react-dropzone';

const FIELDS = { title: "title", picture: "picture", _id: "_id" };

export default class GeneralForm extends Component {

  render() {
    return (
      <div className="col-md-4 justify-content-md-center form-page">
        <fieldset className="col-md-8 form-group">
          <label className="bmd-label-floating">Titre</label>
          <Field
            name={FIELDS.title}
            component="input"
            type="text"
            className="form-control"
          />
        </fieldset>
        <fieldset className="col-md-8 form-group">
          <label className="bmd-label-floating">Photo</label>
          <Field
            name={FIELDS.picture}
            component={FileField}
            type="file"
            imageFile={this.props.cvImage ? [this.props.cvImage] : null}
            handleOnDrop={this.handleOnDrop}
            className="form-control"
          />
        </fieldset>
      </div>
    )
  }
}