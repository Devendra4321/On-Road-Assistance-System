import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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

const UserProfile = () => {
  const navigate = useNavigate();

  const EditProfile = (id) => {
    navigate("/edit_profile/" + id);
  };

  const [filteredData, setBusinessData] = useState([]);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/users/");
        const data = await response.json();
        // Assuming 'email' is the key in cookies
        const useremail = decodeURIComponent(
          document.cookie.replace(
            /(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
          )
        );
        // Filter location data based on vendoremail
        const filteredBusiness = data.filter(
          (users) => users.email === useremail
        );
        if (response.status === 200) {
          setBusinessData(filteredBusiness);
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchBusinessData();
  }, []);

  // Format time
  const timeOptions = { hour: "2-digit", minute: "2-digit" };

  return (
    <div>
      <Navbar
        a1="Services"
        a2="Requests"
        a3="My profile"
        a1href="/view_business"
        a2href="/view_user_request"
        a3href="/user_profile"
      />
      <div>
        <div className="container mt-4">
          <div className="section-heading d-flex align-items-center justify-content-between">
            <h5>My Profile</h5>
          </div>

          <div className="row" style={{ marginTop: 10 }}>
            {filteredData.map((user) => (
              <div key={user._id} className="col-12 col-md-6">
                <div className="card product-card" style={{ marginBottom: 10 }}>
                  <div className="card-body">
                    <a className="product-title d-block">
                      Name: <b> {user.name} </b>
                    </a>
                    <a className="product-title d-block">
                      Email: <b> {user.email} </b>
                    </a>
                    <a className="product-title d-block">
                      Mobile: {user.phone}{" "}
                    </a>
                    <a className="product-title d-block">City: {user.city} </a>
                  </div>
                </div>

                <a
                  className="btn btn-danger"
                  onClick={() => EditProfile(user.id)}
                >
                  Edit Profile
                </a>
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

export default UserProfile;
