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
import Logout from "./Logout.jsx";
import Title from "./Title.jsx";
import Navbar from "./Navbar";

const AdminHome = () => {
  return (
    <>
      <Navbar
        a1="Services Approval"
        a2="User Details"
        a3="Service Provider"
        a1href="/view_business_admin"
        a2href="/view_user_admin"
        a3href="/view_service_provider"
      />
      <div>
        <div>
          <div className="container mt-5 ">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h3>Admin Home</h3>
            </div>

            <div className="row g-3">
              <div className="col-6 col-md-12">
                <div className="card horizontal-product-card">
                  <div className="card-body d-flex align-items-center">
                    <div className="card-body">
                      <img
                        src={imgMech}
                        className="img-fluid"
                        style={{ width: 64, height: 64 }}
                      />
                      <Link
                        className="text-success"
                        to="/view_business_admin"
                        style={{ marginLeft: "10px" }}
                      >
                        Services Approval{" "}
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
                        src={imgMech}
                        className="img-fluid"
                        style={{ width: 64, height: 64 }}
                      />
                      <Link
                        className="text-success"
                        to="/view_service_provider"
                        style={{ marginLeft: "10px" }}
                      >
                        Services Provider{" "}
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
                        style={{ width: 64, height: 64 }}
                      />
                      <Link
                        className="text-success"
                        to="/view_user_admin"
                        style={{ marginLeft: "13px" }}
                      >
                        User Details{" "}
                      </Link>
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
                    <Link to="/admin_home">
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

export default AdminHome;
