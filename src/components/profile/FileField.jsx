import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone'
import Placeholder from './Placeholder';

const FileField = ({
  handleOnDrop,
  input: {onChange},
  imageFile,
  meta: {error, touched}
}) => (
  <div className="file-drop-zone">
          {imageFile && (imageFile.length > 0) ? (<img src={imageFile[0].preview}/>) : ''}

    <Dropzone 
              className="upload-container"
              onDrop={(file, t) => {handleOnDrop(file, onChange)}}
    >
      {({getRootProps, getInputProps}) => (<Placeholder error={error} touched={touched} getInputProps={getInputProps} getRootProps={getRootProps}/>)}
    </Dropzone>
    <p>{error && touched ? error : ''}</p>
  </div>
);

FileField.prototypes = {
  error: PropTypes.string,
  handleOnDrop: PropTypes.func.isRequired,
  imageFile: PropTypes.arrayOf(PropTypes.shape({
    file: PropTypes.file,
    name: PropTypes.string,
    preview: PropTypes.string,
    size: PropTypes.number
  })),
  label: PropTypes.string,
  onChange: PropTypes.func,
  touched: PropTypes.bool
}
 export default FileField;



// import React, { Component } from "react";
// import { Field, reduxForm } from "redux-form";

// export default class FileField extends Component{
//   constructor(props){
//     super(props);
//     this.state = {img: null}
//   }

//   render(){
//     const {input, dataAllowedFileExtensions} = this.props;
//     const onInputChange = (e) => {
//       e.preventDefault();
//       const files = [...e.target.files];
//       input.onChange(files);
//       this.setState({img: URL.createObjectURL(files[0])})
//     }
//     return (
//       <div className="file-upload"> 
//         {this.state.img && <img src={this.state.img} alt=""/>}
//         <input type="file" onChange={onInputChange} data-allowed-file-extensions={dataAllowedFileExtensions}/>
//       </div>
//     )
//   }
// }