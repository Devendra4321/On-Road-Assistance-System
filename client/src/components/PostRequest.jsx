import React, { useState } from "react";
import { Link, json } from "react-router-dom";
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

  const postBusinessData = async () => {
    const token = localStorage.getItem("token");
    //console.log(userEmail);  // Output: vendor@gmail.com

    let latitude = 0;
    let longitude = 0;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          //const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          updateLocationOnServer(latitude, longitude);
        },
        (error) => {
          console.error(`Error getting user location: ${error.message}`);
          // Continue with latitude and longitude set to zero
          updateLocationOnServer(latitude, longitude);
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

    async function updateLocationOnServer(latitude, longitude) {
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

        if (response.ok) {
          console.log("Business data posted successfully!");
          // Handle success, e.g., redirect to another page
          sendEmail(latitude, longitude, vendorEmail, userEmail, formData);
          alert("Requested Successful");
          window.location.href = "view_user_request";
        } else {
          console.error("Error posting business data:", response.statusText);
        }
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

  // OnForm Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Validation failed, do not proceed with the submission
      return;
    }
    // Else Validation passed
    postBusinessData();
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
