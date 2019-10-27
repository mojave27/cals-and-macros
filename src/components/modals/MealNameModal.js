import React from 'react';
import PropTypes from 'prop-types';
import { Button, Confirm, Input } from 'semantic-ui-react';
import styles from './Modal.module.css';

class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <Input
            loading={this.props.loading}
            icon='search'
            iconPosition='left'
            placeholder='search...'
            value={this.props.value}
            onChange={this.props.handleInputChange}
            className={styles.searchInput}
            onKeyPress={this.props.handleKeyPress}
          />
          <div className='footer'>
          <Button color='orange' onClick={this.props.onClose} disabled={false}>
            Cancel
          </Button>
          <Button color='green' onClick={this.props.onSave} disabled={false}>
            Cancel
          </Button>
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
