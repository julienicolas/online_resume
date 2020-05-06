import React from 'react';
import PropTypes from 'prop-types';

const Placeholder = ({getInputProps, getRootProps, error, touched}) => (
  <div
    {...getRootProps()}
    className={`placeholder-preview${error && touched ? 'has-error' : ''}`}
  >
    <input {...getInputProps()} />
    <p>Cliquez ou faites glisser votre photo</p>
  </div>
);

Placeholder.propTypes = {
  error: PropTypes.string,
  getInputProps: PropTypes.func.isRequired,
  getRootProps: PropTypes.func.isRequired,
  touched: PropTypes.bool
}

export default Placeholder;