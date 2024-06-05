import React, { useState, useEffect } from "react";
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

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from "./Logout.jsx";
import Title from "./Title.jsx";
import Navbar from "./Navbar";

const ViewUserRequest = () => {
  ////////////////////////////////////////////////
  //////////////Navgation Code Start//////////////
  ////////////////////////////////////////////////

  const [businessId, setGeoLocation] = useState(""); // Set the initial value accordingly
  // Function to get user location and update on the server
  const getUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          console.log(`ID: ${businessId}`);
          updateLocationOnServer(latitude, longitude);
        },
        (error) => {
          console.error(`Error getting user location: ${error.message}`);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  // Update location on the server
  async function updateLocationOnServer(latitude, longitude) {
    //  const businessId = "6576e6dcfa3350243c6af5b3"; // Replace with the actual business ID
    const url = `http://localhost:4000/api/v1/location/map/` + businessId;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers, such as authentication token if needed
        },
        body: JSON.stringify({
          lat: latitude,
          long: longitude,
        }),
      });

      if (response.ok) {
        alert("Location updated successfully!");
        console.log("Location updated successfully!");
        window.location.reload();
      } else {
        console.error(`Error updating location: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error updating location: ${error.message}`);
    }
  }
  // Trigger getUserLocation when businessId changes
  useEffect(() => {
    if (businessId) {
      getUserLocation();
    }
  }, [businessId]);

  ////////////////////////////////////////////////
  //////////////Navgation Code End ///////////////
  ////////////////////////////////////////////////

  ////////////////////////////////////////////////
  ////////////// Get Details Location ////////////
  ////////////////////////////////////////////////

  const [businessData, setBusinessData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/location/");
        const data = await response.json();

        // Assuming 'vendoremail' is the key in cookies
        const useremail = decodeURIComponent(
          document.cookie.replace(
            /(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
          )
        );
        // Filter location data based on vendoremail
        const filteredBusiness = data.filter(
          (location) => location.useremail === useremail
        );
        setBusinessData(filteredBusiness);
        setFilteredData(filteredBusiness);
      } catch (error) {
        console.error("Error fetching location data:", error.message);
      }
    };

    fetchBusinessData();
  }, []);

  // Filter data based on the search term
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = businessData.filter((business) =>
      Object.values(business).some((field) =>
        field.toString().toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const timeOptions = { hour: "2-digit", minute: "2-digit" };

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
          <div className="container mt-3">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h5>My Request</h5>
            </div>
            <div className="row g-3">
              <div className="top-search-form">
                <form>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <button type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </form>
              </div>
            </div>

            <div
              className="row"
              style={{ marginTop: "10px", marginBottom: "90px" }}
            >
              {filteredData.map((location) => (
                <div key={location._id} className="col-12 col-md-6 mb-3">
                  <div
                    className="card product-card"
                    style={{ marginBottom: 10 }}
                  >
                    <div className="card-body">
                      <a className="product-title d-block">
                        Date And Time:{" "}
                        {new Date(location.dateCreated).toLocaleDateString(
                          "en-GB",
                          timeOptions
                        )}{" "}
                      </a>
                      <a
                        className="product-title d-block"
                        style={{ color: "orange" }}
                      >
                        Status: {location.status}{" "}
                      </a>
                      <a className="product-title d-block">
                        Vendor Email: <b> {location.vendoremail} </b>
                      </a>
                      <a className="product-title d-block">
                        Complaint: <b> {location.complaint} </b>
                      </a>
                      <a className="product-title d-block">
                        Mobile: {location.mobile}{" "}
                      </a>

                      <a className="product-title d-block">
                        Lat: {location.lat}{" "}
                      </a>
                      <a className="product-title d-block">
                        Long: {location.long}{" "}
                      </a>
                    </div>
                  </div>

                  <a
                    className="btn btn-danger"
                    onClick={() => setGeoLocation(location.id)}
                  >
                    Geo Map
                  </a>

                  <a
                    className="btn btn-danger"
                    target="_blank"
                    href={`https://maps.google.com/?q=${location.lat},${location.long}`}
                  >
                    Show Map
                  </a>
                  {/* <a
                    className="btn btn-danger"
                    onClick={() => {
                      Feedbackfunction(business.vendoremail);
                    }}
                    // href="/post_feedback"
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
    </>
  );
};

export default ViewUserRequest;
