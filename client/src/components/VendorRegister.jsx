import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import imgfolder from "./img/core-img/logo-white.png";
import Navbar from "./Navbar";
import Footer from "./Footer";

const VendorRegister = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    passwordHash: "",
    phone: "",
    city: "",
    question1: "",
    question2: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  /////////////Email Validation //////////////
  const [existingEmails, setExistingEmails] = useState([]);

  useEffect(() => {
    const fetchExistingEmails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/vendor/"
        );
        const emails = response.data.map((user) => user.email);
        setExistingEmails(emails);
      } catch (error) {
        console.error("Error fetching existing emails:", error);
      }
    };

    fetchExistingEmails();
  }, []);
  /////////////Email Validation //////////////

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    // Reset validation error htmlFor the current field when it's being modified
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Validate phone number
    if (!/^\d{10}$/.test(userData.phone)) {
      errors.phone = "Phone must be a 10-digit number";
      isValid = false;
    }

    // Validate password
    if (
      !/(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.{8,})/.test(
        userData.passwordHash
      )
    ) {
      errors.password =
        "Password must have at least one digit, one uppercase letter, one special character, and be at least 8 characters long";
      isValid = false;
    }

    // Validate email (you might want to use a more sophisticated email validation)
    //const existingEmails = ['panner224@gmail.com', 'anotherexisting@example.com'];
    if (existingEmails.includes(userData.email.toLowerCase())) {
      errors.email = "Email already exists";
      isValid = false;
    }

    setValidationErrors(errors);

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Validation failed, do not proceed with the submission
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/v1/vendor/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Successfully submitted
        console.log("Form data submitted successfully!");
        //history.push('/'); // Redirect to the home page
        alert("Registered Successfully.");
        window.location.href = "/vendor_login";
      } else {
        // Handle errors
        console.error("Error submitting form data:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form data:", error.message);
    }
  };

  return (
    <>
      <Navbar
        a1="User"
        a2="Services"
        a3="Admin"
        a1href="/user_login"
        a2href="/vendor_login"
        a3href="/admin_login"
      />
      <div>
        <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
          <div className="background-shape"></div>
          <div className="container mb-4 mt-4">
            <div className="row justify-content-center">
              {/* <div className="col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5 user-div shadow-lg"> */}
              <div className="col-10 user-div shadow-lg">
                <h1 className="user-header">Service Register</h1>

                <div className="register-form mt-5 px-4">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group text-start mb-4">
                      <span>Username</span>
                      <label htmlFor="username">
                        <i className="lni lni-user"></i>
                      </label>
                      <input
                        className="form-control"
                        name="name"
                        id="name"
                        value={userData.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter the name"
                        required
                      />
                    </div>
                    {validationErrors.email && (
                      <p style={{ color: "white" }}>{validationErrors.email}</p>
                    )}

                    <div className="form-group text-start mb-4">
                      <span>Email</span>
                      <label htmlFor="email">
                        <i className="lni lni-envelope"></i>
                      </label>
                      <input
                        className="form-control"
                        name="email"
                        id="email"
                        value={userData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Enter email id"
                      />
                    </div>

                    <div className="form-group text-start mb-4">
                      <span>Password</span>
                      <label htmlFor="passwordHash">
                        <i className="lni lni-lock"></i>
                      </label>
                      <input
                        className="input-psswd form-control"
                        name="passwordHash"
                        id="passwordHash"
                        value={userData.passwordHash}
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                    {validationErrors.password && (
                      <p style={{ color: "Red" }}>
                        {validationErrors.password}
                      </p>
                    )}

                    <div className="form-group text-start mb-4 ">
                      <span>Mobile</span>
                      <label htmlFor="mobile">
                        <i className="lni lni-arrow-right"></i>
                      </label>
                      <input
                        className="form-control"
                        name="phone"
                        id="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        type="number"
                        placeholder="Mobile"
                        required
                      />
                    </div>
                    {validationErrors.phone && (
                      <p style={{ color: "Red" }}>{validationErrors.phone}</p>
                    )}

                    <div className="form-group text-start mb-4">
                      <span>City</span>
                      <label htmlFor="field_2">
                        <i className="lni lni-arrow-right"></i>
                      </label>
                      <input
                        className="form-control"
                        name="city"
                        id="city"
                        value={userData.city}
                        onChange={handleChange}
                        type="text"
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className="form-group text-start mb-4">
                      <span>What is your pet animal name?</span>
                      <label htmlFor="field_3">
                        <i className="lni lni-arrow-right"></i>
                      </label>
                      <input
                        className="form-control"
                        name="question1"
                        id="question1"
                        value={userData.question1}
                        onChange={handleChange}
                        type="text"
                        placeholder="enter the answer"
                        required
                      />
                    </div>
                    <div className="form-group text-start mb-4">
                      <span>What is your school best friend name?</span>
                      <label htmlFor="field_4">
                        <i className="lni lni-arrow-right"></i>
                      </label>
                      <input
                        className="form-control"
                        name="question2"
                        id="question2"
                        value={userData.question2}
                        onChange={handleChange}
                        type="text"
                        placeholder="enter the answer"
                        required
                      />
                    </div>
                    <button
                      className="btn btn-warning btn-lg w-100"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </form>
                </div>

                <div className="login-meta-data">
                  <p className="mt-3 mb-0">
                    Already have an account?
                    <Link to="/vendor_login" className="ms-1">
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VendorRegister;
