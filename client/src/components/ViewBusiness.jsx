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

import "./js/jquery.min.js";
import "./js/bootstrap.bundle.min.js";

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import imgMech from "./img/mechanic.png";
import Logout from "./Logout.jsx";
import Title from "./Title.jsx";
import Navbar from "./Navbar";

const ViewBusiness = () => {
  const [businessData, setBusinessData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/business/`
        );
        if (response.status === 200) {
          setBusinessData(response.data);
        } else {
          console.error("Error fetching business data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching business data:", error.message);
      }
    };

    fetchBusinessData();
  }, []);

  // Filter data based on the search term
  const filteredData = businessData.filter((business) => {
    const isMatch = Object.values(business).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Add an additional condition to filter based on "Approved" status
    const isApproved = business.status.toLowerCase() === "approved";

    return isMatch && isApproved;
  });

  const handleCall = () => {
    window.location.href = `tel:${business.mobile}`;
  };

  ////////////////////////////////////////////////
  ///////Get Vendor Email ID and Store////////////
  ////////////////////////////////////////////////
  // Set Vendor email
  const [vendoremail, setShareLocation] = useState(""); // Set the initial value accordingly
  // Trigger getUserLocation when businessId changes
  useEffect(() => {
    if (vendoremail) {
      shareLocation();
    }
  }, [vendoremail]);

  const shareLocation = () => {
    // Assuming business.vendoremail contains the vendor's email
    // Store vendoremail in cookies
    document.cookie = `vendoremail=${vendoremail}`;
    // For example, redirect to another page
    window.location.href = "/post_request";
  };

  ////////////////////////////////////////////////
  ///////Get Vendor Email ID and Store End ///////
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  ///////Get Vendor Email ID and Store////////////
  ////////////////////////////////////////////////
  // Set Vendor email
  const [vendor_email, Feedbackfunction] = useState(""); // Set the initial value accordingly
  // Trigger getUserLocation when businessId changes
  useEffect(() => {
    if (vendor_email) {
      updateFeedback();
    }
  }, [vendor_email]);

  const updateFeedback = () => {
    // Assuming business.vendoremail contains the vendor's email
    // Store vendoremail in cookies
    document.cookie = `vendoremail=${vendor_email}`;
    // For example, redirect to another page
    window.location.href = "/post_feedback";
  };

  ////////////////////////////////////////////////
  ///////Get Vendor Email ID and Store End ///////
  ////////////////////////////////////////////////

  return (
    <div>
      <div>
        <Navbar
          a1="Services"
          a2="Requests"
          a3="My profile"
          a1href="/view_business"
          a2href="/view_user_request"
          a3href="/user_profile"
        />

        <div className="container mt-3">
          <div className="section-heading d-flex align-items-center justify-content-between">
            <h4>Search Road Services</h4>
          </div>
          <div className="row g-3">
            <div className="top-search-form">
              <form>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </div>
          </div>

          <div className="row" style={{ marginTop: 10, marginBottom: "80px" }}>
            {filteredData.map((business) => (
              <div key={business._id} className="col-12 col-md-6">
                <div className="card product-card" style={{ marginBottom: 10 }}>
                  <div className="card-body">
                    <a className="product-title d-block">
                      Service Name: <b> {business.name} </b>
                    </a>
                    <a className="product-title d-block">
                      Mechanic Name: <b> {business.mechanicname} </b>
                    </a>
                    <a className="product-title d-block">
                      Service Description:{business.service}{" "}
                    </a>
                    <a className="product-title d-block">
                      Available: {business.available}{" "}
                    </a>
                    <a className="product-title d-block">
                      Address: {business.address}{" "}
                    </a>
                    <a className="product-title d-block">
                      Locality: {business.locality}{" "}
                    </a>
                    <a className="product-title d-block">
                      City: {business.city}{" "}
                    </a>
                    <a className="product-title d-block">
                      Mobile: {business.mobile}{" "}
                    </a>

                    <a className="product-title d-block">
                      Lat: {business.lat}{" "}
                    </a>
                    <a className="product-title d-block">
                      Long: {business.long}{" "}
                    </a>
                  </div>
                </div>

                <a
                  className="btn btn-danger"
                  style={{ marginLeft: "0" }}
                  onClick={() => setShareLocation(business.vendoremail)}
                >
                  Request
                </a>

                <a
                  className="btn btn-danger"
                  target="_blank"
                  href={`https://maps.google.com/?q=${business.lat},${business.long}`}
                >
                  Show Map{" "}
                </a>
                {/* <a
                  className="btn btn-danger"
                  onClick={() => {
                    Feedbackfunction(business.vendoremail);
                  }}
                >
                  Feedback
                </a> */}
              </div>
            ))}
          </div>
        </div>
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
  );
};

export default ViewBusiness;
