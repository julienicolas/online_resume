import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../containers/profile/actions";
import { connect } from "react-redux";

import GeneralForm from "./forms/GeneralForm";
import ExperienceForm from './forms/ExperienceForm';
import FormationForm from './forms/FormationForm';

const FIELDS = { title: "title", picture: "picture", _id: "_id" };

const imageIsRequired = value => (!value ? "Required" : undefined);

class CVForm extends Component {

  // handleSubmit = credentials => {
  //   console.log('SUBMIT CV FORM', credentials);
  //   this.props.initialValues ? this.props.updateCV(credentials, this.props.history) : this.props.createCV(credentials, this.props.history);
  // };

  constructor(props){
    super(props);
    this.scrollRef = React.createRef();
  }

  state = { imageFile: [] }
  stepNames = ['Général', 'Expériences', 'Formation', 'Compétences', 'Autres']

  handleFormSubmit = formProps => {
    const fd = new FormData();
    console.log('HANDLE FORM SUBMIT', formProps, this.props);
    fd.append("picture", this.props.cvImage.file);
    fd.append("_id", formProps._id);
    console.log('FINAL FORM DATA', fd);
    formProps['picture'] = this.props.cvImage.file
    this.props.initialValues ? this.props.updateCV(fd, this.props.history) : this.props.createCV(formProps, this.props.history);
  }

  handleOnDrop = (newImageFile, onChange, e) => {
    console.log('YOUHOU IMAGE TO UPLOAD', newImageFile, onChange, e)
    const imageFile = {
      file: newImageFile[0],
      name: newImageFile[0].name,
      preview: URL.createObjectURL(newImageFile[0]),
      size: newImageFile[0].size
    }
    this.props.setCvImage(imageFile);
    onChange(imageFile);
    //this.setState({imageFile: [imageFile]}, () => onChange(imageFile))
  }

  onMenuClick = (index) => {
    let scrollref = this.scrollRef.current;
    scrollref.scrollLeft = index * scrollref.clientWidth;
  }

  renderNextStepLabel = () => (<div>{this.stepNames[this.props.currentFormStep]}</div>)

  renderFormMenu = () => (<div className="form-menu"><ul>
    {this.stepNames.map((item, index) => (<li onClick={() => this.onMenuClick(index)} key={`menu-item-${index}`} className={this.props.currentFormStep == index ? 'selected' : ''}>{item}</li>))}
  </ul></div>)

  shouldComponentUpdate(prevProps) {
    if (prevProps.currentFormStep !== this.props.currentFormStep)
      return true;
    return false;
  }

  render() {
    console.log('COUCOU RENDER CVFORM', this.props.initialValues)
    return (
      <div className="cv-form-page row">
        <div className="col-md-10 justify-content-md-center">
          <div className="row justify-content-md-center mb-3">
            <h1>{`${this.props.initialValues ? 'Editer mon' : 'Nouveau'} CV`}</h1>
          </div>
          <div className="form-scroll-container col-md-12" ref={this.scrollRef} >
            <form id="form-scrollable" className="row" onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>

              <GeneralForm className="col-md-4" />
              <ExperienceForm className="col-md-4" />
              <FormationForm className="col-md-4" />
              <div className="row justify-content-md-center">
                <button type="submit" className="btn btn-primary btn-raised m-3">
                  {`${this.props.initialValues ? 'Modifier' : 'Créer'} mon CV`}
                </button>
              </div>
            </form>
          </div>

        </div>
        <div className="col-md-2 justify-content-md-center">{this.renderFormMenu()}</div>
      </div>

    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('COMPONENT DID UPDATE', prevProps.currentFormStep, this.props.currentFormStep)
    // if (prevProps.currentFormStep !== this.props.currentFormStep) {
    //   this.refs.scrollerRef.scrollLeft = `${this.props.currentFormStep * 100}%`
    // }
  }
}

const cvForm = reduxForm({
  form: "cvcreate",
  fields: Object.keys(FIELDS),
  enableReinitialize: true
})(CVForm);


const mapStateToProps = state => {
  console.log('YOUHOU MAP STTAE TO PROPS', state)
  return {
    user: state.user.user,
    initialValues: state.profile.currentCV,
    cvImage: state.profileForm.cvImage,
    currentFormStep: 0
  };
};

export default connect(mapStateToProps, actions)(cvForm);