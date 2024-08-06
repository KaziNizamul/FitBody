import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../../Header/Header";
import { useNavigate } from "react-router-dom";
import styles from "./PaymentStatus.module.scss";

function PaymentStatus({ status }) {
  const navigate = useNavigate();
  const isSuccess = status === "success";

  useEffect(() => {
    if (isSuccess) {
      const userData = JSON.parse(localStorage.getItem('userData')) || {};
      const modifiedUserData = { ...userData, paidClient: true };
      localStorage.setItem('userData', JSON.stringify(modifiedUserData));
    }
  }, [isSuccess]);

  const handleButtonClick = () => {
    if (isSuccess) {
      navigate("/");
      window.location.reload();
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.paymentStatusContainer}>
        <div className={styles.paymentStatusLogo}></div>
        <div className={styles.paymentStatusMessage}>
          <h2
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              width: "27rem",
              height: "7rem",
            }}
          >
            {isSuccess ? "Payment Successful" : "Payment Failed"}{" "}
            <button
              style={{
                border: "none",
                borderRadius: "2rem",
                padding: "1rem",
                color: isSuccess ? "green" : "red",
                boxShadow: `inset 0px -35px 80px -57px ${isSuccess ? "green" : "red"}`,
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
              onClick={handleButtonClick}
            >
              {isSuccess ? "Go Back to Main Page" : "Go Back"}
            </button>
          </h2>
        </div>
      </div>
    </>
  );
}

PaymentStatus.propTypes = {
  status: PropTypes.oneOf(["success", "failure"]).isRequired,
};

export default PaymentStatus;
