import React from 'react';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
  }

  handleClick = isToggleOn => {
    this.setState({ isToggleOn: !isToggleOn });
  }

  render() {
    const { isToggleOn } = this.state;
    return (
      <button type="submit" onClick={() => this.handleClick(isToggleOn)}>
        {isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
export default Toggle;
