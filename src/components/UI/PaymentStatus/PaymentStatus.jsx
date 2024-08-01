import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import styles from "./PaymentStatus.module.scss";

function PaymentStatus({ status }) {
  const isSuccess = status === "success";
  const navigate = useNavigate();

  return (
    <div className={styles.paymentStatusContainer}>
      <div className={styles.paymentStatusLogo}></div>
      <div className={styles.paymentStatusMessage}>
        <h2 style={{ display: "flex", flexDirection: "column" }}>
          {isSuccess ? "Payment Successful" : "Payment Failed"}{" "}
          <span className={isSuccess ? styles.checkmark : styles.crossmark}>
            {isSuccess ? "✅" : "❌"}
          </span>
          {isSuccess ? (
            <Link
              style={{
                border: "none",
                borderRadius: "2rem",
                padding: "1rem",
                boxShadow: "inset 0px -35px 80px -57px green",
                fontSize: "0.9rem"
              }} 
              to="/"
            >Go Back to Main Page</Link>
          ) : (
            <Link
              style={{
                border: "none",
                borderRadius: "2rem",
                padding: "1rem",
                boxShadow: "inset 0px -35px 80px -57px green",
              }} 
              to="/"
            >Go Back</Link>
          )}
        </h2>
      </div>
    </div>
  );
}

PaymentStatus.propTypes = {
  status: PropTypes.oneOf(["success", "failure"]).isRequired,
};

export default PaymentStatus;
