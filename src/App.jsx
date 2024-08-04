import { useEffect, useState } from "react";
import Aos from "aos";
import "./App.css";
import About from "./components/UI/About";
import Header from "./components/Header/Header";
import Exercises from "./components/UI/Exercises";
import Footer from "./components/UI/Footer";
import Hero from "./components/UI/Hero";
import Pricing from "./components/UI/Pricing";
import Start from "./components/UI/Start";
import Testimonials from "./components/UI/Testimonials";
import ContactUs from "./components/UI/ContactUs";
import BackToTop from "./components/UI/BackToTop";
import LocomotiveScroll from "locomotive-scroll";
import Classes from "./components/UI/Classes";
import Diet from "./components/UI/Diet";

import Register from "./components/UI/Register";
import Login from "./components/UI/Login";

import PrivacyPolicy from "./components/UI/privacypolicy";
import Licensing from "./components/UI/Licensing";
import TermsAndConditions from "./components/UI/termsandconditions";

import PaymentStatus from "./components/UI/PaymentStatus/PaymentStatus";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "./components/UI/Error";

function App() {
  const locomotiveScroll = new LocomotiveScroll();
  useEffect(() => {
    Aos.init();
  }, []);

  const [isDarkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const userData = JSON.parse(localStorage.getItem("userData")) || {};

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className={isDarkMode ? "dark-mode-app" : "light-mode-app"}>
                <Header isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
                <Hero />
                <Exercises />
                {userData?.paidClient && <Start /> }
                {!userData?.paidClient && <Pricing /> }
                <Testimonials />
                <ContactUs />
                <Footer />
                <BackToTop />
              </div>
            }
          />
          <Route path="/classes" element={<Classes />} />
          <Route path="/about" element={<About />} />
          <Route path="/diet" element={<Diet />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/payment-success"
            element={<PaymentStatus status="success" />}
          />
          <Route
            path="/payment-failure"
            element={<PaymentStatus status="failure" />}
          />

          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/licensing" element={<Licensing />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
