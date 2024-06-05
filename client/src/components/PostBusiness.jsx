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

// name  vendorname mechanicname service available  locality address city mobile

const PostBusiness = () => {
  const [formData, setFormData] = useState({
    vendoremail: "",
    name: "",
    mechanicname: "",
    service: "",
    available: "",
    locality: "",
    address: "",
    city: "",
    mobile: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const postBusinessData = async () => {
    const token = localStorage.getItem("token");
    const vendorEmail = decodeURIComponent(
      document.cookie.replace(
        /(?:(?:^|.*;\s*)vendoremail\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      )
    );
    //console.log(vendorEmail);  // Output: vendor@gmail.com

    try {
      const response = await fetch("http://localhost:4000/api/v1/business/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          ...formData,
          vendoremail: vendorEmail,
        }),
      });

      if (response.ok) {
        console.log("Business data posted successfully!");
        // Handle success, e.g., redirect to another page
        alert("Created Successful");
        window.location.href = "view_my_business";
      } else {
        console.error("Error posting business data:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting business data:", error.message);
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
        a1href="/post_business"
        a2href="/view_my_request"
      />
      <div>
        <div>
          <div className="container mt-3 container-business">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h4>Add Service</h4>
            </div>
            {/* Form Scrip Start*/}
            <div className="profile-wrapper-area ">
              <div className="card user-data-card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>Service Name</span>
                      </div>
                      <input
                        className="form-control"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>Mechanic Name</span>
                      </div>
                      <input
                        className="form-control"
                        name="mechanicname"
                        id="mechanicname"
                        value={formData.mechanicname}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>Services</span>
                      </div>
                      <input
                        className="form-control"
                        name="service"
                        id="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>Available</span>
                      </div>
                      <input
                        className="form-control"
                        name="available"
                        id="available"
                        value={formData.available}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>Locality</span>
                      </div>
                      <input
                        className="form-control"
                        name="locality"
                        id="locality"
                        value={formData.locality}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>Address</span>
                      </div>
                      <input
                        className="form-control"
                        name="address"
                        id="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>City</span>
                      </div>
                      <input
                        className="form-control"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        type="text"
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
                    <Link to="/vendor_home">
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

export default PostBusiness;
