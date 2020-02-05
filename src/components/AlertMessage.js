import React from 'react';
import PropTypes from 'prop-types';

class AlertMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertON: true,
      style: null,
      alertMessage: `You can search weather by country, zip or geo coords ^^   
      Press x to exit this alert`,
      alertType: 3,
      alertTypeKeys: [
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
        'primary',
        'secondary',
      ],
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    const { alertMessage, alertType } = nextProps;
    const { alertON } = this.state;
    if (alertON !== null) {
      this.setState({
        alertON: true,
        alertMessage,
        alertType,
      });
    }
  }

  render() {
    const { alertON, alertMessage, alertType, alertTypeKeys } = this.state;
    const toggleAlert = e => {
      e.preventDefault();
      this.setState({ alertON: !alertON });
    };
    const alertTypeKey = alertTypeKeys[alertType];
    return (
      <div
        style={{
          display: alertON ? 'inline' : 'none',
        }}
        className={`alert alert-${alertTypeKey}`}
      >
        &nbsp;
        <button type="button" onClick={toggleAlert}>
          &times;
        </button>
        <strong>{alertTypeKey}</strong>
        &nbsp;
        {alertMessage}
      </div>
    );
  }
}

AlertMessage.propTypes = {
  alertMessage: PropTypes.string,
  alertType: PropTypes.number,
};

export default AlertMessage;
