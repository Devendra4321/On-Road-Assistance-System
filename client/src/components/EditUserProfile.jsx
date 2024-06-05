import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

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

// name  vendorname city password phone  locality address city phone

const EditUserProfile = () => {
  const { id } = useParams(); // Use useParams to get route parameters

  //const id = match.params.id;
  //const [businessData, setBusinessData] = useState({});

  const [editedBusiness, setEditedBusiness] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    phone: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/users/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setEditedBusiness({
            name: data.name,
            email: data.email,
            password: data.password,
            city: data.city,
            phone: data.phone,
          });
        } else {
          console.error("Error fetching User data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching User data:", error.message);
      }
    };

    fetchBusinessDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBusiness({
      ...editedBusiness,
      [name]: value,
    });
  };

  const handleUpdateBusiness = async (e) => {
    e.preventDefault();
    try {
      // Mobile number validation
      if (!/^\d{10}$/.test(editedBusiness.phone)) {
        console.error("Mobile number must be a 10-digit number");
        //errors.phone = 'Phone must be a 10-digit number';
        alert("Mobile number must be a 10-digit number");
        return;
      }

      const response = await fetch(`http://localhost:4000/api/v1/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          //  'x-auth-token': token,
        },
        body: JSON.stringify(editedBusiness),
      });

      if (response.ok) {
        console.log("User details updated successfully!");
        // Add any additional logic you need after a successful update
        window.location.href = "/user_profile";
      } else {
        console.error("Not updating User details:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating User details:", error.message);
    }
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
          <div className="container mt-4">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h4>Edit Profile</h4>
            </div>
            {/* Form Scrip Start*/}
            <div className="profile-wrapper-area ">
              <div className="card user-data-card">
                <div className="card-body">
                  <form onSubmit={handleUpdateBusiness}>
                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>Name</span>
                      </div>
                      <input
                        className="form-control"
                        name="name"
                        id="name"
                        value={editedBusiness.name}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>Email</span>
                      </div>
                      <input
                        className="form-control"
                        name="email"
                        id="email"
                        value={editedBusiness.email}
                        onChange={handleInputChange}
                        type="text"
                        disabled
                      />
                    </div>

                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>Password - Leave Blank if no changes</span>
                      </div>
                      <input
                        className="form-control"
                        name="password"
                        id="password"
                        value={editedBusiness.password}
                        onChange={handleInputChange}
                        type="text"
                        placeholder=""
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
                        value={editedBusiness.city}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>

                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>Phone</span>
                      </div>
                      <input
                        className="form-control"
                        name="phone"
                        id="phone"
                        value={editedBusiness.phone}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>

                    <button className="btn btn-success w-100" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
            {/* Form Scrip End
             */}
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
    </>
  );
};

export default EditUserProfile;
