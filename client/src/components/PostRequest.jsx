import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import "./js/jquery.min.js";
import "./js/bootstrap.bundle.min.js";
{
  /*
import "./js/waypoints.min.js";
import "./js/jquery.easing.min.js";
import "./js/owl.carousel.min.js";
import "./js/jquery.magnific-popup.min.js";
*/
}
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from "./Logout.jsx";
import Title from "./Title.jsx";
import Navbar from "./Navbar";
import axios from "axios";

// vendoremail  useremail  complaint mobile lat long status

const PostRequest = () => {
  const vendorEmail = document.cookie.replace(
    /(?:(?:^|.*;\s*)vendoremail\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  const userEmail = decodeURIComponent(
    document.cookie.replace(/(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/, "$1")
  );

  const [formData, setFormData] = useState({
    vendoremail: "",
    useremail: "",
    complaint: "",
    mobile: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const postBusinessData = async (paymentId) => {
    const token = localStorage.getItem("token");
    //console.log(userEmail);  // Output: vendor@gmail.com
    console.log(paymentId);
    let latitude = 0;
    let longitude = 0;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          //const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          updateLocationOnServer(latitude, longitude, paymentId);
        },
        (error) => {
          console.error(`Error getting user location: ${error.message}`);
          // Continue with latitude and longitude set to zero
          updateLocationOnServer(latitude, longitude, paymentId);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    async function sendEmail(
      latitude,
      longitude,
      vendorEmail,
      userEmail,
      formData
    ) {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/users/sendEmail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              vendorEmail: vendorEmail,
              userEmail: userEmail,
              latitude: latitude,
              longitude: longitude,
              complaint: formData.complaint,
              mobileNo: formData.mobile,
            }),
          }
        );

        console.log(response);

        if (response.status === 200) {
          console.log("Email sent successfully!");
          // Handle success, e.g., redirect to another page
          // alert("Requested Successful");
          // window.location.href = "view_user_request";
        } else {
          console.error("Error sending email");
        }
      } catch (error) {
        console.error("Error sending email:", error.message);
      }
    }

    async function updateLocationOnServer(latitude, longitude, paymentId) {
      console.log(paymentId);

      try {
        const response = await fetch("http://localhost:4000/api/v1/location/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({
            ...formData,
            vendoremail: vendorEmail,
            useremail: userEmail,
            lat: latitude,
            long: longitude,
          }),
        });

        // Check if the response was successful
        if (!response.ok) {
          console.error("Error posting business data:", response.statusText);
          return;
        } else {
          const data = await response.json();
          console.log(data);

          console.log("Business data posted successfully!");
          sendEmail(latitude, longitude, vendorEmail, userEmail, formData);

          if (data) {
            const body = { paymentStatus: true, paymentId: paymentId };
            console.log(body);
            const updatePaymentStatus = await axios.put(
              `http://localhost:4000/api/v1/location/${data._id}/paymentStatus`,
              body
            );

            console.log(updatePaymentStatus);
          }
        }

        alert("Requested Successful");
        // window.location.href = "view_user_request";
      } catch (error) {
        console.error("Error posting business data:", error.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset validation error htmlFor the current field when it's being modified
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };

  // Validation
  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Validate phone number
    if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = "Phone must be a 10-digit number";
      isValid = false;
    }
    setValidationErrors(errors);

    return isValid;
  };

  //payment create order
  const createComplaintOrder = async (amount) => {
    const {
      data: { key },
    } = await axios.get("http://localhost:4000/api/v1/getkey");

    const {
      data: { order },
    } = await axios.post(
      "http://localhost:4000/api/v1/location/paymentReceipt",
      {
        amount,
      }
    );
    console.log("Response:", order);

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "On Road Assistance system",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      callback_url: "http://localhost:4000/api/v1/location/paymentVerify",
      prefill: {
        name: "ORAS",
        email: userEmail,
        contact: formData.mobile,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
      // Add handler for successful payment
      handler: async function (response) {
        console.log("Payment Successful:", response);
        if (response) {
          alert("Payment was successful!");
        }
        setTimeout(async () => {
          await postBusinessData(response.razorpay_payment_id);
        }, 4000);
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  // OnForm Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Validation failed, do not proceed with the submission
      return;
    }
    // Else Validation passed
    createComplaintOrder(1000);
  };

  return (
    <>
      <Navbar
        a1="Services"
        a2="Requests"
        a3="My profile"
        a1href="/view_business"
        a2href="/view_user_request"
        a3href="/user_profile"
      />
      <div>
        <div>
          <div className="container mt-4">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h4>Add Request</h4>
            </div>
            {/* Form Scrip Start*/}
            <div className="profile-wrapper-area py-3">
              <div className="card user-data-card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>Complaint</span>
                      </div>
                      <input
                        className="form-control"
                        name="complaint"
                        id="complaint"
                        value={formData.complaint}
                        onChange={handleInputChange}
                        type="text"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>Mobile</span>
                      </div>
                      <input
                        className="form-control"
                        name="mobile"
                        id="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>
                    {/* Validation for Mobile 10 Digits*/}
                    {validationErrors.mobile && (
                      <p style={{ color: "red" }}>{validationErrors.mobile}</p>
                    )}
                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>Advance paybale amount</span>
                      </div>
                      <input
                        className="form-control"
                        name="payableAmount"
                        id="payableAmount"
                        value={100}
                        disabled
                      />
                    </div>
                    <button className="btn btn-success w-100" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
            {/* Form Scrip End*/}
          </div>

          <div className="footer-nav-area" id="footerNav">
            <div className="container h-100 px-0">
              <div className="suha-footer-nav h-100">
                <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                  <li className="active">
                    {" "}
                    <Link to="/user_home">
                      <i className="lni lni-home"></i>Home{" "}
                    </Link>{" "}
                  </li>
                  <li>
                    <Logout />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostRequest;
