import PropTypes from 'prop-types';
import React from 'react';

const SubmitButton = ({
  buttonClassName,
  buttonComponent,
  buttonProps,
  children,
  disabled,
}) => {
  const buttonClassNames = `rrm-btn ${buttonClassName}`;
  let button;

  if (buttonComponent) {
    const ButtonComponent = buttonComponent;
    button = (
      <ButtonComponent
        {...buttonProps}
        className={buttonClassNames}
        disabled={disabled}
        type="submit"
      >
        {children}
      </ButtonComponent>
    );
  } else {
    button = (
      <button type="submit" disabled={disabled} className={buttonClassNames}>
        {children}
      </button>
    );
  }

  return <div className="rrm-btn-container">{button}</div>;
};

SubmitButton.propTypes = {
  buttonClassName: PropTypes.string,
  buttonComponent: PropTypes.element,
  buttonProps: PropTypes.object,
  children: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SubmitButton;
