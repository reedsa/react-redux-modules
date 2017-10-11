import PropTypes from 'prop-types';
import React from 'react';
import { Control } from 'react-redux-form';

const TextField = ({
  model,
  id,
  label,
  type,
  textFieldComponent,
  validators,
}) => {
  let labelEl;
  let controlProps;
  if (textFieldComponent) {
    controlProps = { id, label };
  } else {
    labelEl = <label>{label}</label>;
  }

  return (
    <div className="field">
      {labelEl}
      <Control.text
        model={model}
        type={type}
        component={textFieldComponent}
        controlProps={controlProps}
        validators={validators}
      />
    </div>
  );
};

TextField.propTypes = {
  model: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  textFieldComponent: PropTypes.func,
  type: PropTypes.string,
  validators: PropTypes.object,
};

export default TextField;
