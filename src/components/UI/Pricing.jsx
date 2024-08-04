import React, { useState } from 'react';
import '../../styles/pricing.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast, { Toaster } from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const stripe = loadStripe(String(import.meta.env.VITE_STRIPE_PK));

const CheckoutForm = ({ clientSecret, amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error(error);
      toast.error("Payment failed!", {
        duration: 3000,
        position: "top-center",
      });
    } else {
      toast.success("Payment successful!", {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay ${amount}
      </button>
    </form>
  );
};

const Pricing = () => {
  const [clientSecret, setClientSecret] = useState(null);

  const handleStripePayment = async (amount) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_LAMBDA_API}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: [
            {
              title: 'Gym Membership',
              amount,
              sale: 0,
              description: 'Annual membership',
            },
          ],
          frontendURL: `${window.location.origin}`,
        }),
      });

      const data = await response.json();
      const { session = '' } = JSON.parse(data.body);

      setClientSecret(session.client_secret);

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
        toast.error("Payment redirection failed!", {
          duration: 2000,
          position: "top-center",
        });
      }

    } catch (error) {
      console.error('Error fetching client secret:', error);
      toast.error("Error setting up payment", {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <section id="pricing-plan">
        <Toaster />
        <div className="container">
          <div className="pricing_top">
            <h2 className="section_title">
              Gym <span className="highlights">Pricing </span>Plan
            </h2>
            <p>
              Our gym's pricing plans are designed to cater to a range of budgets
              and <br /> fitness aspirations, making it accessible for everyone to
              achieve their health and wellness objectives.
            </p>
          </div>

          <div className="pricing_wrapper">
            {/* Regular Member */}
            <div className="pricing_item" data-aos="fade-up" data-aos-duration="1500">
              <div className="pricing_card-top">
                <h2 className="section_title">Regular Member</h2>
                <h2 className="pricing section_title">$50 <span>/Month</span></h2>
              </div>
              <div className="services">
                <ul>
                  <li><i className="ri-checkbox-blank-circle-fill"></i> Access to the gym during regular hours</li>
                  <li><i className="ri-checkbox-blank-circle-fill"></i> Use of basic gym equipment and facilities.</li>
                  <li><i className="ri-checkbox-blank-circle-fill"></i> Group fitness classes included.</li>
                  <li><i className="ri-checkbox-blank-circle-fill"></i> Locker room access.</li>
                  <li><i className="ri-checkbox-blank-circle-fill"></i> 5 Classes per week</li>
                </ul>
                <button className="register_btn" onClick={() => handleStripePayment(50)}>Join Now</button>
                {clientSecret && <CheckoutForm clientSecret={clientSecret} amount={50} />}
              </div>
            </div>

            {/* Premium Member */}
            <div className="pricing_item pricing_item-02" data-aos="fade-up" data-aos-duration="1800">
              <div className="pricing_card-top">
                <h2 className="section_title">Premium Member</h2>
                <h2 className="pricing section_title">$99 <span>/Month</span></h2>
              </div>
              <div className="services">
                <ul>
                  <li><i className="ri-checkbox-blank-circle-fill"></i> 24/7 access to the gym.</li>
                  <li><i className="ri-checkbox-blank-circle-fill"></i> Full access to all equipment and facilities</li>
                  <li><i className="ri-checkbox-blank-circle-fill"></i> Access to a dedicated personal trainer.</li>
                  <li><i className="ri-checkbox-blank-circle-fill"></i> Unlimited group fitness classes.</li>
                  <li><i className="ri-checkbox-blank-circle-fill"></i> Nutritional guidance and meal planning.</li>
                </ul>
                <button className="register_btn" onClick={() => handleStripePayment(99)}>Join Now</button>
                {clientSecret && <CheckoutForm clientSecret={clientSecret} amount={99} />}
              </div>
            </div>

            {/* Standard Member */}
            <div className="pricing_item pricing_item-03" data-aos="fade-up" data-aos-duration="2000">
              <div className="pricing_card-top">
                <h2 className="section_title">Standard Member</h2>
                <h2 className="pricing section_title">$59 <span>/Month</span></h2>
              </div>
              <div className="services">
                <ul>
                  <li><i className="ri-checkbox-blank-circle-fill"></i> 24/7 access to the gym.</li>
                  <li><i className="ri-checkbox-blank-circle-fill"></i> Personalized workout plans.</li>
                  <li><i className="ri-checkbox-blank-circle-fill"></i> Locker and towel service included</li>
                  <li><i className="ri-checkbox-blank-circle-fill"></i> Unlimited group fitness classes.</li>
                  <li><i className="ri-checkbox-blank-circle-fill"></i> Exclusive access to sauna and spa facilities</li>
                </ul>
                <button className="register_btn" onClick={() => handleStripePayment(59)}>Join Now</button>
                {clientSecret && <CheckoutForm clientSecret={clientSecret} amount={59} />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Elements>
  );
};

export default Pricing;
