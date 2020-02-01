import React from 'react';

const Toggle = props => (
  <button
    id={props.id}
    style={props.style}
    type="submit"
    onClick={props.toggleFunc}
  >
    {props.value}
  </button>
);
export default Toggle;
