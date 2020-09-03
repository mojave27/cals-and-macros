import React from 'react';
import PropTypes from 'prop-types'
import styles from './StandardModal.module.css'
import { Icon } from 'semantic-ui-react'

class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <Icon className={styles.close} size={'large'} name='close' onClick={this.props.onClose} />
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
