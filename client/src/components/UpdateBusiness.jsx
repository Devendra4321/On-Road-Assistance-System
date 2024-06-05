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

// name  vendorname mechanicname service available  locality address city mobile

const UpdateBusiness = () => {
  const { id } = useParams(); // Use useParams to get route parameters

  //const id = match.params.id;
  //const [businessData, setBusinessData] = useState({});

  const [editedBusiness, setEditedBusiness] = useState({
    vendoremail: "",
    name: "",
    mechanicname: "",
    service: "",
    available: "",
    locality: "",
    address: "",
    city: "",
    mobile: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/business/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setEditedBusiness({
            vendoremail: data.vendoremail,
            name: data.name,
            mechanicname: data.mechanicname,
            service: data.service,
            available: data.available,
            locality: data.locality,
            address: data.address,
            city: data.city,
            mobile: data.mobile,
          });
        } else {
          console.error("Error fetching business data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching business data:", error.message);
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
      if (!/^\d{10}$/.test(editedBusiness.mobile)) {
        console.error("Mobile number must be a 10-digit number");
        //errors.mobile = 'Phone must be a 10-digit number';
        alert("Mobile number must be a 10-digit number");
        return;
      }

      const response = await fetch(
        `http://localhost:4000/api/v1/business/${id}`,
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
        console.log("Business details updated successfully!");
        // Add any additional logic you need after a successful update
        window.location.href = "/view_my_business";
      } else {
        console.error("Not updating business details:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating business details:", error.message);
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
          <div className="container mt-3" style={{ height: "80vh" }}>
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h4>Add Service</h4>
            </div>
            {/* Form Scrip Start*/}
            <div className="profile-wrapper-area ">
              <div className="card user-data-card">
                <div className="card-body">
                  <form onSubmit={handleUpdateBusiness}>
                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>Vendor Email</span>
                      </div>
                      <input
                        className="form-control"
                        name="vendoremail"
                        id="vendoremail"
                        value={editedBusiness.vendoremail}
                        onChange={handleInputChange}
                        type="text"
                        disabled
                      />
                    </div>
                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>Business Name</span>
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
                        <span>Mechanic Name</span>
                      </div>
                      <input
                        className="form-control"
                        name="mechanicname"
                        id="mechanicname"
                        value={editedBusiness.mechanicname}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>

                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>Services</span>
                      </div>
                      <input
                        className="form-control"
                        name="service"
                        id="service"
                        value={editedBusiness.service}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>Available</span>
                      </div>
                      <input
                        className="form-control"
                        name="available"
                        id="available"
                        value={editedBusiness.available}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>Locality</span>
                      </div>
                      <input
                        className="form-control"
                        name="locality"
                        id="locality"
                        value={editedBusiness.locality}
                        onChange={handleInputChange}
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <div className="title mb-2">
                        <span>Address</span>
                      </div>
                      <input
                        className="form-control"
                        name="address"
                        id="address"
                        value={editedBusiness.address}
                        onChange={handleInputChange}
                        type="text"
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
                        <span>Mobile</span>
                      </div>
                      <input
                        className="form-control"
                        name="mobile"
                        id="mobile"
                        value={editedBusiness.mobile}
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

export default UpdateBusiness;
