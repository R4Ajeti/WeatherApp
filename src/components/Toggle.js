import React from 'react';
import PropTypes from 'prop-types';

const Toggle = props => {
  const { id, toggle, value, toggleFunc } = props;
  return (
    <button
      id={id}
      style={{ display: toggle ? 'inline' : 'none' }}
      type="submit"
      onClick={toggleFunc}
    >
      {value}
    </button>
  );
};
Toggle.propTypes = {
  id: PropTypes.string,
  toggle: PropTypes.bool,
  value: PropTypes.string,
  toggleFunc: PropTypes.func,
};
export default Toggle;
