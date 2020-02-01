import React from 'react';

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
        'secondary'
      ]
    };
  }
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    const { alertMessage, alertType, alert } = nextProps;
    const { alertON } = this.state;
    if (alert !== alertON) {
      this.setState({
        alertON: alert,
        alertMessage,
        alertType
      });
    }
  }
  render() {
    const {
      alertON,
      style,
      alertMessage,
      alertType,
      alertTypeKeys
    } = this.state;
    const toggleAlert = e => {
      e.preventDefault();
      this.setState({ alertON: !alertON });
    };
    const alertTypeKey = alertTypeKeys[alertType];
    return (
      <div
        style={{
          display: alertON ? 'inline' : 'none'
        }}
        className={`alert alert-${alertTypeKey}`}
      >
        <button type="button" onClick={toggleAlert}>
          &times;
        </button>
        <strong>{alertTypeKey}</strong> {alertMessage}
      </div>
    );
  }
}

export default AlertMessage;
