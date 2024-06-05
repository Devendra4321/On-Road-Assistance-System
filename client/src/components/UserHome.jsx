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
import imgMech from "./img/mechanic.png";
import imgRequest from "./img/destination.png";
import imgProfile from "./img/man.png";
import Logout from "./Logout";
import Title from "./Title";
import Navbar from "./Navbar";

const UserHome = () => {
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
        <div className="page-content-wrapper">
          <div className="top-products-area py-3">
            <div className="container">
              <div className="section-heading d-flex align-items-center justify-content-between">
                <h4>User Home</h4>
              </div>

              <div className="row g-3">
                <div className="col-6 col-md-12">
                  <div className="card horizontal-product-card">
                    <div className="card-body d-flex align-items-center">
                      <div className="card-body">
                        <img
                          src={imgMech}
                          className="img-fluid"
                          style={{ width: 64, height: 64, marginRight: "10px" }}
                        />
                        <Link className="text-success" to="/view_business">
                          Find Services{" "}
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
                          src={imgRequest}
                          className="img-fluid"
                          style={{ width: 64, height: 64, marginRight: "10px" }}
                        />
                        <Link className="text-success" to="/view_user_request">
                          My Request{" "}
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
                          src={imgProfile}
                          className="img-fluid"
                          style={{ width: 64, height: 64, marginRight: "10px" }}
                        />
                        <Link className="text-success" to="/user_profile">
                          My Profile{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
    </div>
  );
};

export default UserHome;
