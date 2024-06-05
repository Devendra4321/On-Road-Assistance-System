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
import imgService from "./img/service.png";
import imgReq from "./img/customerjourney.png";
import imgFeed from "./img/feedback.png";
import Logout from "./Logout.jsx";
import Title from "./Title.jsx";
import Navbar from "./Navbar";

const VendorHome = () => {
  return (
    <>
      <Navbar
        a1="Service"
        a2="Requests"
        a1href="/post_business"
        a2href="/view_my_request"
      />
      <div>
        <div>
          <div className="container mt-5">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h5>Services Home</h5>
            </div>

            <div className="row g-3">
              <div className="col-6 col-md-12">
                <div className="card horizontal-product-card">
                  <div className="card-body d-flex align-items-center">
                    <div className="card-body">
                      <img
                        src={imgService}
                        className="img-fluid"
                        style={{ width: 64, height: 64, marginRight: "10px" }}
                      />
                      <Link className="text-success" to="/post_business">
                        Create Services{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-6 col-md-12">
                <div className="card horizontal-product-card">
                  <div className="card-body d-flex align-items-center">
                    <div className="card-body">
                      <img
                        src={imgService}
                        className="img-fluid"
                        style={{ width: 64, height: 64, marginRight: "10px" }}
                      />
                      <Link className="text-success" to="/view_my_business">
                        Update Services{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-6 col-md-12">
                <div className="card horizontal-product-card">
                  <div className="card-body d-flex align-items-center">
                    <div className="card-body">
                      <img
                        src={imgReq}
                        className="img-fluid"
                        style={{ width: 64, height: 64, marginRight: "10px" }}
                      />
                      <Link className="text-success" to="/view_my_request">
                        Service Request{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="row g-3">
              <div className="col-6 col-md-12">
                <div className="card horizontal-product-card">
                  <div className="card-body d-flex align-items-center">
                    <div className="card-body">
                      <img
                        src={imgFeed}
                        className="img-fluid"
                        style={{ width: 64, height: 64, marginRight: "10px" }}
                      />
                      <Link className="text-success" to="/view_my_feedback">
                        View Feedback{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
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

export default VendorHome;
