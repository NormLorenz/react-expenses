import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Notifications from 'react-notification-system-redux';

class Placeholder extends React.Component {

  render() {
    const { notifications } = this.props;

    return (
      <Notifications notifications={notifications} />
    );
  }
}

Placeholder.contextTypes = {
  store: PropTypes.object
};

Placeholder.propTypes = {
  notifications: PropTypes.array
};

export default connect(state => ({ notifications: state.notifications }))(Placeholder);