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
import imgBack from "./img/bg-img/wall.png";
import imgMech from "./img/mechanic.png";
import Logout from "./Logout.jsx";
import Title from "./Title.jsx";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Index = () => {
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

      <div style={{ height: "85vh" }}>
        {/*  */}

        <div className="container">
          <div className="pt-3">
            <div className="single-hero-slide">
              <img src={imgBack} className="img-fluid" />
            </div>
          </div>
        </div>

        <div className="product-catagories-wrapper py-3">
          <div className="container">
            <div className="section-heading">
              <h6>Main Menu</h6>
            </div>
            <div className="product-catagory-wrap">
              <div className="row g-3">
                <div className="col-6">
                  <div className="card catagory-card">
                    <Link
                      to="/user_login"
                      className="btn btn-warning btn-lg w-100"
                    >
                      User{" "}
                    </Link>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card catagory-card">
                    <Link
                      to="/admin_login"
                      className="btn btn-warning btn-lg w-100"
                    >
                      Admin{" "}
                    </Link>
                  </div>
                </div>
                <div className="col-6 offset-3 ">
                  <div className="card catagory-card">
                    <Link
                      to="/vendor_login"
                      className="btn btn-warning btn-lg w-100"
                    >
                      Services
                    </Link>
                  </div>
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

export default Index;
