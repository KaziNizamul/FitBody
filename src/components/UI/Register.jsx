import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { confirmRegistration, register } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import "../../styles/register.css";

const Register = () => {
  const initialFormData = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (formData.name === "" || formData.name === null) {
      toast.error("Please enter your name");
      return false;
    } else if (formData.email === "" || formData.email === null) {
      toast.error("Please enter your email");
      return false;
    } else if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email");
      return false;
    } else if (formData.password === "" || formData.password === null) {
      toast.error("Please enter a password");
      return false;
    } else if (!isValidPassword(formData.password)) {
      toast.error("Please enter a valid password");
      return false;
    } else {
      return true;
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    return passwordPattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await register({ ...formData });
        toast.success("OTP Requested", {
          duration: 3000,
          position: "top-center",
        });
        setIsOtpVisible(true);
      } catch (err) {
        toast.error(err?.message || "Registration failed", {
          duration: 3000,
          position: "top-center",
        });
      }
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      await confirmRegistration(formData.name, otp);
      toast.success("Registered Successfully.", {
        duration: 3000,
        position: "top-center",
      });
      navigate("/login");
    } catch (err) {
      toast.error(err?.message || "OTP verification failed", {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section id="contact-us" className="form">
      <Toaster />
      <div className="w-full form grid justify-center items-center">
        <div className="register-img">
          <img src="./image.png" width={500}></img>
        </div>
        <div className="contact-form-container">
          <h1 className="heading text-centers">Register</h1>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            {!isOtpVisible && (
              <div className="text-end">
                <button className="submit" type="submit">
                  Register
                </button>
              </div>
            )}
          </form>
          {isOtpVisible && (
            <form onSubmit={handleOtpSubmit} className="contact-form">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  name="otp"
                  value={otp}
                  onChange={handleOtpChange}
                />
              </div>
              <div className="text-end">
                <button className="submit" type="submit">
                  Verify OTP
                </button>
              </div>
            </form>
          )}
          <div>
            <a href="/login">
              Already have an account?{" "}
              <span style={{ fontWeight: 900 }}>Login Here.</span>{" "}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
