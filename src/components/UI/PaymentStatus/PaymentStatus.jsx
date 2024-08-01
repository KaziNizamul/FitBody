import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './PaymentStatus.module.scss';

function PaymentStatus({ status }) {
  const isSuccess = status === 'success';

  return (
    <div className={styles.paymentStatusContainer}>
      <div className={styles.paymentStatusLogo}>
      </div>
      <div className={styles.paymentStatusMessage}>
        <h2>
          {isSuccess ? 'Payment Successful' : 'Payment Failed'}{' '}
          <span className={isSuccess ? styles.checkmark : styles.crossmark}>
            {isSuccess ? '✅' : '❌'}
          </span>
        </h2>
      </div>
    </div>
  );
}

PaymentStatus.propTypes = {
  status: PropTypes.oneOf(['success', 'failure']).isRequired,
};

export default PaymentStatus;