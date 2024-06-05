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

const UpdateStatus = () => {
  const { id } = useParams(); // Use useParams to get route parameters

  //const id = match.params.id;
  //const [businessData, setBusinessData] = useState({});

  const [editedBusiness, setEditedBusiness] = useState({
    status: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/location/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setEditedBusiness({
            status: data.status,
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
      const response = await fetch(
        `http://localhost:4000/api/v1/location/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            //  'x-auth-token': token,
          },
          body: JSON.stringify(editedBusiness),
        }
      );

      if (response.ok) {
        console.log("Status updated successfully!");
        // Add any additional logic you need after a successful update
        window.location.href = "/view_my_request";
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
        a1href="/post_business"
        a2href="/view_my_request"
      />
      <div>
        <div>
          <div className="page-content-wrapper">
            <div className="top-products-area py-3">
              <div className="container">
                <div className="section-heading d-flex align-items-center justify-content-between">
                  <h4>Update Status</h4>
                </div>
                {/* Form Scrip Start*/}
                <div className="profile-wrapper-area py-3">
                  <div className="card user-data-card">
                    <div className="card-body">
                      <form onSubmit={handleUpdateBusiness}>
                        <div className="mb-3">
                          <div className="title mb-2">
                            <span>Update Status</span>
                          </div>
                          <select
                            name="status"
                            id="status"
                            value={editedBusiness.status}
                            onChange={handleInputChange}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Accept">Accept</option>
                            <option value="Reject">Reject</option>
                          </select>
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
      </div>
    </>
  );
};

export default UpdateStatus;
