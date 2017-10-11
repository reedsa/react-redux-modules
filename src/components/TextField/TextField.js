import PropTypes from 'prop-types';
import React from 'react';
import { Control } from 'react-redux-form';

const TextField = ({ id, label, textFieldComponent, validators }) => {
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
        component={textFieldComponent}
        controlProps={controlProps}
        validators={validators}
      />
    </div>
  );
};

TextField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  textFieldComponent: PropTypes.element,
  validators: PropTypes.object,
};

export default TextField;
