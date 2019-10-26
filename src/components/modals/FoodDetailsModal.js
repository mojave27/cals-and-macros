import React from 'react';
import PropTypes from 'prop-types';
import styles from './FoodDetailsModal.module.css';

class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          {this.props.children}
          <div className='footer'>
            <button className={styles.close} onClick={this.props.onClose}>Close</button>
            <button className={styles.close} onClick={this.props.onSelect}>Select</button>
            <button className={styles.close} onClick={this.props.onAddToApp}>Add to App</button>
          </div>
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
