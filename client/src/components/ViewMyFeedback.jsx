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

const ViewMyFeedback = () => {
  ////////////////////////////////////////////////
  ////////////// Get Details Location ////////////
  ////////////////////////////////////////////////

  const [businessData, setBusinessData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/feedback/");
        const data = await response.json();

        // Assuming 'vendoremail' is the key in cookies
        const vendoremail = decodeURIComponent(
          document.cookie.replace(
            /(?:(?:^|.*;\s*)vendoremail\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
          )
        );
        // Filter feedback data based on vendoremail
        const filteredBusiness = data.filter(
          (feedback) => feedback.vendoremail === vendoremail
        );
        setBusinessData(filteredBusiness);
        setFilteredData(filteredBusiness);
      } catch (error) {
        console.error("Error fetching feedback data:", error.message);
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

  return (
    <>
      <Navbar
        a1="Service"
        a2="Requests"
        a3="Feedbacks"
        a1href="/post_business"
        a2href="/view_my_request"
        a3href="/view_my_feedback"
      />
      <div>
        <div>
          <div className="container mt-3">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h4>My Request</h4>
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

            <div className="row" style={{ marginTop: 10 }}>
              {filteredData.map((feedback) => (
                <div key={feedback._id} className="col-12 col-md-6">
                  <div
                    className="card product-card"
                    style={{ marginBottom: 10 }}
                  >
                    <div className="card-body">
                      <a className="product-title d-block">
                        Name: <b> {feedback.name} </b>
                      </a>
                      <a
                        className="product-title d-block"
                        style={{ color: "green" }}
                      >
                        Feedback: {feedback.feedback}{" "}
                      </a>
                      <a className="product-title d-block">
                        Date And Time:{" "}
                        {new Date(feedback.dateCreated).toLocaleDateString(
                          "en-GB",
                          timeOptions
                        )}{" "}
                      </a>
                    </div>
                  </div>
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
    </>
  );
};

export default ViewMyFeedback;